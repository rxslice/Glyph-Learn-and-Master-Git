// Browser checks for the audit fixes. Usage: npm run build && node dev/check-app.cjs
// 1. The built page mounts the app (index.html loads the module entry).
// 2. AI explanation text is rendered as text, not HTML (no script injection).
// 3. A key typed into the page is used for the request and no key ships in the bundle.
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..", "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const PAYLOAD = '<img src=x onerror="window.__xss=1">Explained';
const server = http.createServer((req, res) => {
  let f = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(root, "index.html");
  res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  let sentKey = null;
  page.on("pageerror", e => errors.push(String(e)));
  // Keep the check hermetic: stub the Tailwind CDN and Google Fonts.
  await page.route(/cdn\.tailwindcss\.com/, r => r.fulfill({ contentType: "text/javascript", body: "window.tailwind = {};" }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ contentType: "text/css", body: "" }));
  await page.route(/generativelanguage\.googleapis\.com/, route => {
    sentKey = route.request().headers()["x-goog-api-key"] || new URL(route.request().url()).searchParams.get("key");
    route.fulfill({ contentType: "application/json",
      body: JSON.stringify({ candidates: [{ content: { role: "model", parts: [{ text: PAYLOAD }] } }] }) });
  });
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const mounted = (await page.locator("#root").innerHTML()).length > 100;
  await page.getByLabel("Gemini API key").fill("test-key-abc");
  await page.getByRole("button", { name: "Use key" }).click();
  await page.locator("ul li button").first().click();
  await page.getByText("Explained", { exact: false }).first().waitFor({ timeout: 10000 });
  const literal = await page.getByText(PAYLOAD, { exact: false }).count();
  const xss = await page.evaluate(() => window.__xss === 1);
  await browser.close(); server.close();
  const result = { mounted, literalPayloadShown: literal > 0, xss, sentKey, errors };
  console.log(JSON.stringify(result));
  if (!mounted || !result.literalPayloadShown || xss || sentKey !== "test-key-abc" || errors.length) process.exit(1);
});
