# Glyph: the Git command constructor

Build Git commands visually, one glyph at a time, and see what each flag does as you add it. Includes visual walkthroughs of diffs, blame, branches, rebase and the commit graph.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Optional AI explanations ("Sage")

Glyph works without any API key: each command shows its built-in description. To get AI explanations and the Sage chat, paste a Gemini API key into the field in the Sage panel.

The key is kept only in that browser tab (memory and `sessionStorage`) and sent only to Google's Gemini API. It is never built into the bundle, so a deployed copy of Glyph carries no secret. Use **Forget key** to remove it.

## Checks

```bash
npm run lint       # TypeScript type check
npm run build
node dev/check-app.cjs   # browser check, needs Playwright; run after build
```
