import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ConstructedGlyph, GitOption, GitVerb, RebaseCommit, Commit, BlameLine, RepoFile, DiffLine, Hunk, ReflogEntry, GrepResult, BisectStatus, Worktree, Remote, Stash } from './types';
import { GIT_COMMANDS } from './data/gitCommands';
import { COMMIT_HISTORY as INITIAL_COMMIT_HISTORY, BRANCHES as INITIAL_BRANCHES, HEAD as INITIAL_HEAD, TAGS as INITIAL_TAGS } from './data/commitHistory';
import { GlyphComponent } from './components/GlyphComponent';
import { InteractiveRebase } from './components/InteractiveRebase';
import { CommitLogGraph } from './components/CommitLogGraph';
import { ConfigView } from './components/ConfigView';
import { StatusView } from './components/StatusView';
import { DiffView } from './components/DiffView';
import { BlameView } from './components/BlameView';
import { BranchView } from './components/BranchView';


const MAX_HISTORY = 10;

// --- Dummy Data ---
const DUMMY_COMMITS: RebaseCommit[] = [
    { id: 'c1', hash: 'a1b2c3d', message: 'feat: Implement user authentication', action: 'pick' },
    { id: 'c2', hash: 'e4f5g6h', message: 'fix: Correct login button alignment', action: 'pick' },
    { id: 'c3', hash: 'i7j8k9l', message: 'refactor: Simplify session handling', action: 'pick' },
    { id: 'c4', hash: 'm0n1o2p', message: 'docs: Update authentication guide', action: 'pick' },
];

const DUMMY_BLAME_DATA: BlameLine[] = [
    { hash: 'a1b2c3d', author: 'Alice', email: 'alice@example.com', date: '2023-10-27', line: 1, content: 'import React from "react";' },
    { hash: 'a1b2c3d', author: 'Alice', email: 'alice@example.com', date: '2023-10-27', line: 2, content: '' },
    { hash: 'e4f5g6h', author: 'Bob', email: 'bob@example.com', date: '2023-10-28', line: 3, content: 'const App = () => {' },
    { hash: 'e4f5g6h', author: 'Bob', email: 'bob@example.com', date: '2023-10-28', line: 4, content: '  return (' },
    { hash: 'i7j8k9l', author: 'Charlie', email: 'charlie@example.com', date: '2023-10-29', line: 5, content: '    <div>' },
    { hash: 'a9f8e7d', author: 'Alice', email: 'alice@example.com', date: '2023-10-30', line: 6, content: '      <h1>Glyph</h1>' },
    { hash: 'i7j8k9l', author: 'Charlie', email: 'charlie@example.com', date: '2023-10-29', line: 7, content: '    </div>' },
    { hash: 'e4f5g6h', author: 'Bob', email: 'bob@example.com', date: '2023-10-28', line: 8, content: '  );' },
    { hash: 'e4f5g6h', author: 'Bob', email: 'bob@example.com', date: '2023-10-28', line: 9, content: '};' },
    { hash: 'a1b2c3d', author: 'Alice', email: 'alice@example.com', date: '2023-10-27', line: 10, content: '' },
    { hash: 'a1b2c3d', author: 'Alice', email: 'alice@example.com', date: '2023-10-27', line: 11, content: 'export default App;' },
    { hash: 'f6d8b3c', author: 'David', email: 'david@example.com', date: '2023-11-01', line: 12, content: '// Add new component import' },
    { hash: 'f6d8b3c', author: 'David', email: 'david@example.com', date: '2023-11-01', line: 13, content: 'import { OtherComponent } from "./Other";' },
    { hash: 'c2e8a4a', author: 'Bob', email: 'bob@example.com', date: '2023-11-02', line: 14, content: '// TODO: Refactor this logic' },
    { hash: 'b3c4d5e', author: 'Alice', email: 'alice@example.com', date: '2023-11-03', line: 15, content: 'const unusedVariable = "hello";' },
];

const DUMMY_LOCAL_CONFIG: Record<string, string> = {
    'core.repositoryformatversion': '0',
    'core.filemode': 'true',
    'remote.origin.url': 'git@github.com:user/glyph.git',
    'user.name': 'Alice Local',
    'alias.lg': 'log --graph --oneline',
};

const DUMMY_GLOBAL_CONFIG: Record<string, string> = {
    'user.name': 'Alice',
    'user.email': 'alice@example.com',
    'init.defaultBranch': 'main',
    'alias.st': 'status',
    'alias.co': 'checkout',
    'alias.br': 'branch',
    'alias.cm': 'commit',
};

const DUMMY_APP_TSX_HUNKS: Hunk[] = [
    {
        id: 'hunk-1',
        header: '@@ -10,2 +10,3 @@',
        lines: [
            { type: 'context', oldLineNumber: 10, newLineNumber: 10, content: 'import { InteractiveRebase } from \'./components/InteractiveRebase\';' },
            { type: 'removed', oldLineNumber: 11, content: 'import { CommitLogGraph } from \'./components/CommitLogGraph\';' },
            { type: 'added', newLineNumber: 11, content: 'import { VisualCommitLog } from \'./components/VisualCommitLog\';' },
            { type: 'added', newLineNumber: 12, content: 'import { DiffView } from \'./components/DiffView\';' },
        ],
        isStaged: false
    },
    {
        id: 'hunk-2',
        header: '@@ -14,2 +15,2 @@',
        lines: [
            { type: 'context', oldLineNumber: 13, newLineNumber: 14, content: 'const MAX_HISTORY = 10;' },
            { type: 'removed', oldLineNumber: 14, content: '  const [copied, setCopied] = useState(false);' },
            { type: 'added', newLineNumber: 15, content: '  const [copied, setCopied] = useState<boolean>(false);' },
        ],
        isStaged: false
    }
];

const INITIAL_REPO_STATE: RepoFile[] = [
    { path: 'src/App.tsx', status: 'modified', type: 'modified', hunks: DUMMY_APP_TSX_HUNKS },
    { path: 'src/components/Header.tsx', status: 'staged', type: 'modified' },
    { path: 'README.md', status: 'staged', type: 'new' },
    { path: 'package.json', status: 'modified', type: 'modified' },
    { path: 'src/new-feature.js', status: 'untracked', type: 'new' },
    { path: 'config/webpack.config.js', status: 'untracked', type: 'new' },
];

const getDummyDiffForCommit = (commitId: string): DiffLine[] => {
    const diffs: Record<string, DiffLine[]> = {
        'a1b2c3d': [ // fix: Correct user logout flow
            { type: 'context', content: 'function handleLogout() {' },
            { type: 'removed', content: '  clearSession();' },
            { type: 'added', content: '  clearSession();' },
            { type: 'added', content: '  redirectTo(\'/login\');' },
            { type: 'context', content: '}' },
        ],
        'f6d8b3c': [ // feat: Add dark mode toggle
            { type: 'context', content: 'const App = () => {' },
            { type: 'added', content: '  const [isDarkMode, setDarkMode] = useState(false);' },
            { type: 'context', content: '  return (' },
            { type: 'added', content: '    <ThemeContext.Provider value={{isDarkMode, setDarkMode}}>' },
            { type: 'context', content: '      <div>...</div>' },
            { type: 'added', content: '    </ThemeContext.Provider>' },
            { type: 'context', content: '  );' },
        ],
    };

    const commit = INITIAL_COMMIT_HISTORY.find(c => c.id === commitId);
    return commit ? (diffs[commit.hash] || [{type: 'context', content: `// No diff available for ${commit.hash}`}]) : [];
};

const DUMMY_REFLOG_DATA: ReflogEntry[] = [
    { id: 'rl1', ref: 'HEAD@{0}', action: 'commit:', message: 'feat: Add amazing new button' },
    { id: 'rl2', ref: 'HEAD@{1}', action: 'checkout:', message: 'moving from main to feature/new-button' },
    { id: 'rl3', ref: 'HEAD@{2}', action: 'commit:', message: 'fix: Style adjustments for header' },
    { id: 'rl4', ref: 'HEAD@{3}', action: 'reset:', message: 'moving to HEAD~1' },
    { id: 'rl5', ref: 'HEAD@{4}', action: 'checkout:', message: 'moving from feature/new-button to main' },
    { id: 'rl6', ref: 'HEAD@{5}', action: 'merge develop:', message: 'Fast-forward' },
];

const DUMMY_GREP_DATA: GrepResult[] = [
    { path: 'data/gitCommands.tsx', lineNumber: 478, content: `longDescription: "The 'commit' command saves your staged changes. It's like creating a snapshot of your repository at a specific point in time. Each commit has a unique ID and a message describing the changes.",`},
    { path: 'data/gitCommands.tsx', lineNumber: 481, content: `      { id: 'm', flag: '-m', description: "Set the commit message.", longDescription: "The '-m' flag allows you to provide the commit message directly on the command line, avoiding the need for a text editor.", type: 'string' as const, placeholder: "Your commit message", requiresValue: true },`},
    { path: 'data/gitCommands.tsx', lineNumber: 482, content: `      { id: 'amend', flag: '--amend', description: "Amend the previous commit.", longDescription: "The '--amend' flag modifies the most recent commit. You can change its message or add/remove files from it. Use with caution on shared branches.", type: 'boolean' as const, requiresValue: false },`},
    { path: 'App.tsx', lineNumber: 177, content: `{ command: 'git diff --staged', description: 'Review the changes you are about to commit.' },` },
    { path: 'App.tsx', lineNumber: 945, content: `const isMergeCommit = commit.parents.length > 1;`},
];


const SUGGESTED_COMMANDS: Record<string, { command: string, description: string }[]> = {
    add: [
        { command: 'git status', description: 'See which files are staged, unstaged, and untracked.' },
        { command: 'git diff <file>', description: 'Preview changes before adding.' },
    ],
    commit: [
        { command: 'git status', description: 'Check which files are staged or modified.' },
        { command: 'git diff --staged', description: 'Review the changes you are about to commit.' },
    ],
    rebase: [
        { command: 'git log --oneline --graph', description: 'View the commit history to choose a base.' },
        { command: 'git branch', description: 'See your current branch and other available branches.' },
    ],
    restore: [
        { command: 'git status', description: 'See which files have been modified or staged.' },
        { command: 'git diff <file>', description: 'Preview changes before discarding them.' },
        { command: 'git restore --staged <file>', description: 'Unstage a file, keeping changes in the working directory.'}
    ],
    branch: [
        { command: 'git switch <branch>', description: 'Switch to an existing branch.' },
        { command: 'git log --oneline --graph --all', description: 'Visualize the history of all branches.' },
    ],
    fetch: [
        { command: 'git remote -v', description: 'List all configured remote repositories.' },
        { command: 'git branch -r', description: 'List all remote-tracking branches.' },
    ],
    blame: [
        { command: 'git log -- <file>', description: 'View the commit history for a specific file.' },
        { command: 'git show <commit>:<file>', description: 'See the contents of a file at a specific commit.' },
    ],
    switch: [
        { command: 'git branch', description: 'List all available branches to switch to.' },
        { command: 'git log --oneline --graph', description: 'View history to find a commit to switch to (detached HEAD).'},
    ],
    checkout: [
        { command: 'git branch', description: 'List all available branches to switch to.' },
        { command: 'git status', description: 'See which files need to be restored.' },
    ],
    rm: [
        { command: 'git status', description: 'Check which files are tracked before removing.'},
        { command: 'echo "path/to/file" >> .gitignore', description: 'Add file to .gitignore after using --cached.'}
    ],
    archive: [
        { command: 'git tag', description: 'List available tags to archive.' },
        { command: 'git branch', description: 'List branches to archive.' },
    ],
    config: [
        { command: 'git config --global user.name "Your Name"', description: 'Set your global username.' },
        { command: 'git config --global user.email "you@example.com"', description: 'Set your global email.' },
    ],
    status: [
        { command: 'git add <file>', description: 'Stage a file to be included in the next commit.'},
        { command: 'git diff <file>', description: 'View the changes in a file before staging.' },
        { command: 'git commit', description: 'Commit the currently staged files.'}
    ],
    diff: [
        { command: 'git status', description: 'See which files have changed.' },
        { command: 'git diff --staged', description: 'Show changes that are staged for the next commit.' },
    ],
    clone: [
        { command: 'git remote -v', description: 'Verify which remotes are configured after cloning.' },
        { command: 'ls -a', description: 'List directory contents to see the new project and its hidden .git folder.' },
    ],
    merge: [
        { command: 'git log --oneline --graph --all', description: 'Visualize branches before deciding to merge.' },
        { command: 'git diff <branch_A>..<branch_B>', description: 'Preview the differences between two branches.' },
    ],
    pull: [
        { command: 'git fetch --dry-run', description: 'See what would be fetched without actually fetching it.' },
        { command: 'git status', description: 'Check the status of your local branch before pulling.' },
    ],
    push: [
        { command: 'git status', description: 'Ensure your local branch is up-to-date and ready to push.' },
        { command: 'git log origin/main..main', description: 'See a log of commits that you are about to push.' },
    ],
    tag: [
        { command: 'git log --oneline', description: 'Find a commit hash to tag.' },
        { command: 'git push --tags', description: 'Push all your new tags to the remote.' },
    ],
    remote: [
        { command: 'git remote -v', description: 'List your current remotes with their URLs.' },
        { command: 'git fetch <remote-name>', description: 'Fetch changes from a newly added remote.' },
    ],
    revert: [
        { command: 'git log', description: 'Find the commit you want to revert.' },
        { command: 'git diff HEAD^ HEAD', description: 'Inspect the changes made by the reverted commit.' },
    ],
    'cherry-pick': [
        { command: 'git log <branch>', description: 'Find a commit on another branch to apply to yours.' },
        { command: 'git status', description: 'Check for conflicts after cherry-picking.' },
    ],
    clean: [
        { command: 'git clean -n', description: 'Preview which files will be removed before deleting.' },
        { command: 'git status', description: 'See all untracked files before cleaning.' },
    ],
    show: [
        { command: 'git log --oneline', description: 'Find a commit or tag to inspect.' },
        { command: 'git tag', description: 'List all available tags to show.' },
    ],
    mv: [
        { command: 'ls -F', description: 'List files to confirm the move/rename.' },
        { command: 'git status', description: 'See the staged rename operation.' },
    ],
    reflog: [
        { command: 'git reset HEAD@{2}', description: 'Recover a previous state using a reflog entry.' },
        { command: 'git log -g', description: 'A different way to view reflog-like information.' },
    ],
    shortlog: [
        { command: 'git log', description: 'View the full commit history.' },
        { command: 'git shortlog -s -n', description: 'See a count of commits per author.' },
    ],
    grep: [
        { command: 'git grep -n "pattern"', description: 'Search for a pattern and include line numbers.' },
        { command: 'git log -S "pattern"', description: 'Search for commits that introduced/removed a pattern.' },
    ],
    bisect: [
        { command: 'git bisect start <bad> <good>', description: 'Start the search for a bad commit.' },
        { command: 'git status', description: 'Check the bisect status and current commit.' },
        { command: 'git bisect reset', description: 'End the bisect session and return to normal.' },
    ],
    describe: [
        { command: 'git tag', description: 'List available tags that describe might use.' },
        { command: 'git log', description: 'Find a commit hash to describe.' },
    ],
    worktree: [
        { command: 'git branch', description: 'List branches to check out in a new worktree.' },
        { command: 'ls -F', description: 'See the new directory created for the worktree.' },
    ],
    stash: [
        { command: 'git status', description: 'See what changes will be stashed.'},
        { command: 'git stash list', description: 'View all your current stashes.'},
        { command: 'git stash apply', description: 'Re-apply the latest stash to your working directory.'},
    ]
};

// --- Helper Icons ---
const GlyphLogo = () => (
    <div className="flex items-center space-x-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10L30 10" stroke="#B58900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 10L12 10" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36 10L42 10" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 24L30 24" stroke="#B58900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 24L12 24" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36 24L42 24" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 38L30 38" stroke="#B58900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 38L12 38" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36 38L42 38" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col">
            <span className="text-2xl font-bold text-deep-charcoal tracking-tight leading-none">Glyph</span>
            <p className="text-xs text-stone-gray font-serif tracking-wide">The Interactive Git Simulator</p>
        </div>
    </div>
);

const CopyIcon = ({ copied }: { copied: boolean }) => (
    <div className="relative w-5 h-5">
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 transition-all duration-200 ${copied ? 'text-olive-green' : 'text-stone-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {copied && <span className="absolute -top-6 -left-1.5 text-xs bg-olive-green text-white px-2 py-0.5 rounded-md animate-pop-in">Copied!</span>}
    </div>
);

const TrashIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ReuseIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9a9 9 0 0114.13-6.36M20 15a9 9 0 01-14.13 6.36" />
    </svg>
);

const LearningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

// --- View Components (defined here to avoid new files) ---
const ReflogView: React.FC<{ entries: ReflogEntry[] }> = ({ entries }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Reference Log (reflog)</h3>
        <div className="font-mono text-xs text-deep-charcoal space-y-2">
            {entries.map(entry => (
                <div key={entry.id} className="flex items-center p-2 rounded-md bg-deep-charcoal/5">
                    <span className="font-bold text-burnt-gold w-20 flex-shrink-0">{entry.ref}</span>
                    <span className="text-olive-green w-24 flex-shrink-0">{entry.action}</span>
                    <span className="text-deep-charcoal truncate">{entry.message}</span>
                </div>
            ))}
        </div>
    </div>
);

const ShortlogView: React.FC<{ commits: Commit[] }> = ({ commits }) => {
    const commitsByAuthor = useMemo(() => {
        return commits.reduce<Record<string, Commit[]>>((acc, commit) => {
            (acc[commit.author] = acc[commit.author] || []).push(commit);
            return acc;
        }, {});
    }, [commits]);

    return (
         <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
            <h3 className="font-bold text-lg text-deep-charcoal mb-4">Author Summary (shortlog)</h3>
            <div className="space-y-4">
                {Object.entries(commitsByAuthor).map(([author, authorCommits]) => (
                    <div key={author}>
                        <h4 className="font-bold font-sans text-deep-charcoal mb-2">{author} ({authorCommits.length}):</h4>
                        <ul className="font-mono text-xs text-deep-charcoal space-y-1 pl-4">
                            {authorCommits.map(commit => (
                                <li key={commit.id} className="list-disc list-inside truncate">
                                    {commit.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GrepView: React.FC<{ results: GrepResult[]; pattern: string; ignoreCase: boolean }> = ({ results, pattern, ignoreCase }) => {
    const groupedResults = useMemo(() => {
        return results.reduce<Record<string, GrepResult[]>>((acc, result) => {
            (acc[result.path] = acc[result.path] || []).push(result);
            return acc;
        }, {});
    }, [results]);

    const highlight = (text: string) => {
        if (!pattern) return <>{text}</>;
        try {
            const regex = new RegExp(`(${pattern})`, ignoreCase ? 'gi' : 'g');
            const parts = text.split(regex);
            return (
                <>
                    {parts.map((part, i) =>
                        regex.test(part) ? <span key={i} className="bg-burnt-gold/40 rounded-sm px-0.5 py-0.5">{part}</span> : <span key={i}>{part}</span>
                    )}
                </>
            );
        } catch (e) {
            // Invalid regex, return plain text
            return <>{text}</>;
        }
    };

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg animate-fade-in-slide-up">
            <div className="p-4">
                <h3 className="font-bold text-lg text-deep-charcoal mb-4">Grep Results for "<span className="text-burnt-gold">{pattern}</span>"</h3>
                <div className="space-y-4 font-mono text-xs">
                    {Object.entries(groupedResults).map(([path, pathResults]) => (
                        <div key={path}>
                            <h4 className="font-bold text-olive-green mb-2">{path}</h4>
                            <div className="space-y-1 pl-4">
                                {pathResults.map((result, i) => (
                                    <div key={`${path}-${result.lineNumber}-${i}`} className="flex">
                                        <span className="w-10 flex-shrink-0 text-right pr-4 text-stone-gray">{result.lineNumber}</span>
                                        <pre className="truncate text-deep-charcoal"><code>{highlight(result.content)}</code></pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DescribeView: React.FC<{ result: string | null }> = ({ result }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up bg-paper-white">
        <h3 className="font-bold text-lg text-deep-charcoal mb-2">Describe Result</h3>
        {result ? (
            <p className="font-mono text-burnt-gold bg-deep-charcoal/5 p-3 rounded-md">{result}</p>
        ) : (
            <p className="text-stone-gray">No description available. Try describing a commit closer to a tag.</p>
        )}
    </div>
);

const BisectView: React.FC<{ status: BisectStatus; onGood: () => void; onBad: () => void; onReset: () => void; currentCommit: Commit | undefined }> = ({ status, onGood, onBad, onReset, currentCommit }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up bg-paper-white">
        <h3 className="font-bold text-lg text-deep-charcoal mb-2">Bisect Status</h3>
        {status.state === 'INACTIVE' && <p className="text-stone-gray">Bisect session is not active. Use `bisect start` to begin.</p>}
        {status.state === 'BISECTING' && currentCommit && (
             <div className="space-y-4">
                <div className="text-center bg-deep-charcoal/5 p-4 rounded-lg">
                    <p className="text-sm text-stone-gray">Revisions left to test (roughly):</p>
                    <p className="text-3xl font-bold text-burnt-gold">{status.remaining}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold mb-1">Currently testing commit:</p>
                    <div className="font-mono text-sm bg-paper-off-white p-3 rounded-md border border-deep-charcoal/10">
                        <p><span className="text-stone-gray">{currentCommit.hash}</span> - {currentCommit.message}</p>
                        <p className="text-xs text-stone-gray">by {currentCommit.author} on {new Date(currentCommit.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <button onClick={onGood} className="px-6 py-2 font-bold bg-olive-green/20 text-olive-green rounded-md hover:bg-olive-green/30 transition-colors">Good</button>
                    <button onClick={onBad} className="px-6 py-2 font-bold bg-red-500/10 text-red-600 rounded-md hover:bg-red-500/20 transition-colors">Bad</button>
                </div>
             </div>
        )}
        {status.state === 'DONE' && (
            <div className="text-center p-4 bg-olive-green/10 rounded-lg">
                <p className="font-semibold text-deep-charcoal">Bisect complete!</p>
                <p className="text-sm mt-1">The first bad commit is:</p>
                <p className="font-mono text-burnt-gold mt-2">{status.firstBadCommit}</p>
            </div>
        )}
         {(status.state === 'BISECTING' || status.state === 'DONE') && (
            <button onClick={onReset} className="w-full mt-4 text-sm text-stone-gray hover:text-deep-charcoal underline">Reset Bisect Session</button>
         )}
    </div>
);

const WorktreeView: React.FC<{ worktrees: Worktree[], onAdd: (path: string, branch: string) => void, onRemove: (path: string) => void }> = ({ worktrees, onAdd, onRemove }) => {
    const [path, setPath] = useState('');
    const [branch, setBranch] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (path.trim() && branch.trim()) {
            onAdd(path, branch);
            setPath('');
            setBranch('');
        }
    };

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-6">
            <div>
                <h3 className="font-bold text-lg text-deep-charcoal mb-4">Worktrees</h3>
                <div className="space-y-2">
                    {worktrees.map(wt => (
                        <div key={wt.path} className="flex items-center justify-between p-2 rounded-md bg-deep-charcoal/5 font-mono text-sm">
                            <div>
                                <span className="font-bold text-deep-charcoal">{wt.path}</span>
                                <span className="text-stone-gray ml-4">{wt.head}</span>
                                {wt.branch && <span className="ml-4 text-xs font-bold text-white bg-olive-green px-2 py-0.5 rounded-full">{wt.branch}</span>}
                            </div>
                            {!wt.isMain && <button onClick={() => onRemove(wt.path)} className="text-xs text-red-600 hover:underline">Remove</button>}
                        </div>
                    ))}
                </div>
            </div>
             <form onSubmit={handleAdd} className="border-t border-deep-charcoal/10 pt-6">
                <h4 className="font-bold text-md text-deep-charcoal mb-3">Add New Worktree</h4>
                <div className="flex items-end space-x-3">
                    <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">Path</label>
                        <input
                            type="text" value={path} onChange={e => setPath(e.target.value)}
                            placeholder="../glyph-hotfix" required
                            className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                        />
                    </div>
                     <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">Branch</label>
                        <input
                            type="text" value={branch} onChange={e => setBranch(e.target.value)}
                            placeholder="hotfix-branch" required
                            className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                        />
                    </div>
                    <button type="submit" className="bg-deep-charcoal text-paper-white px-4 py-2 rounded-md hover:bg-deep-charcoal/90 transition-colors font-bold text-sm h-[42px]">Add</button>
                </div>
            </form>
        </div>
    );
};

const ShowView: React.FC<{ commit: Commit | null }> = ({ commit }) => {
    if (!commit) {
        return (
            <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up bg-paper-white">
                <p className="text-stone-gray">No commit selected or found.</p>
            </div>
        );
    }

    const diffData = getDummyDiffForCommit(commit.id);

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg animate-fade-in-slide-up bg-paper-white overflow-hidden">
            <div className="p-4 border-b border-deep-charcoal/10">
                <p className="font-mono text-sm text-burnt-gold">commit {commit.hash}</p>
                <p className="text-sm mt-2">Author: <span className="font-semibold">{commit.author}</span></p>
                <p className="text-sm">Date: <span className="font-semibold">{new Date(commit.date).toUTCString()}</span></p>
                <p className="mt-4 font-sans text-base text-deep-charcoal">{commit.message}</p>
            </div>
            <div className="font-mono text-xs text-deep-charcoal overflow-x-auto">
                <table className="w-full">
                    <tbody>
                        {diffData.map((line, index) => (
                            <tr key={index} className={line.type === 'added' ? 'bg-olive-green/10' : line.type === 'removed' ? 'bg-red-500/10' : ''}>
                                <td className="p-1 w-5 text-center text-stone-gray/80 select-none">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</td>
                                <td className="p-1 w-full"><pre className="whitespace-pre-wrap"><code>{line.content}</code></pre></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TagView: React.FC<{ tags: Record<string, string>; commits: Commit[], onCreate: (name: string, commitHash: string) => void; onDelete: (name: string) => void }> = ({ tags, commits, onCreate, onDelete }) => {
    const [tagName, setTagName] = useState('');
    const [commitHash, setCommitHash] = useState('');
    
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if(tagName.trim() && commitHash.trim()) {
            onCreate(tagName, commitHash);
            setTagName('');
            setCommitHash('');
        }
    }
    
    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-6">
            <div>
                <h3 className="font-bold text-lg text-deep-charcoal mb-4">Tags</h3>
                 <div className="space-y-2">
                    {Object.entries(tags).map(([name, commitId]) => (
                        <div key={name} className="group flex items-center justify-between p-2 rounded-md bg-deep-charcoal/5 font-mono text-sm">
                             <div>
                                <span className="font-bold text-burnt-gold">{name}</span>
                                <span className="text-stone-gray ml-4">points to {commits.find(c=>c.id === commitId)?.hash.substring(0,7) || 'N/A'}</span>
                            </div>
                            <button onClick={() => onDelete(name)} className="text-xs text-red-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
             <form onSubmit={handleCreate} className="border-t border-deep-charcoal/10 pt-6">
                <h4 className="font-bold text-md text-deep-charcoal mb-3">Create New Tag</h4>
                 <div className="flex items-end space-x-3">
                     <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">Tag Name</label>
                        <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} placeholder="v1.1.0" required className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50" />
                    </div>
                     <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">Commit Hash or Ref</label>
                        <input type="text" value={commitHash} onChange={e => setCommitHash(e.target.value)} placeholder="a1b2c3d or main" required className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50" />
                    </div>
                    <button type="submit" className="bg-deep-charcoal text-paper-white px-4 py-2 rounded-md hover:bg-deep-charcoal/90 transition-colors font-bold text-sm h-[42px]">Create Tag</button>
                </div>
            </form>
        </div>
    );
};

const RemoteView: React.FC<{ remotes: Remote[], onAdd: (name: string, url: string) => void; onRemove: (name: string) => void; }> = ({ remotes, onAdd, onRemove }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim() && url.trim()) {
            onAdd(name, url);
            setName('');
            setUrl('');
        }
    }
    
    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-6">
            <div>
                <h3 className="font-bold text-lg text-deep-charcoal mb-4">Remotes</h3>
                 <div className="space-y-2">
                    {remotes.map(remote => (
                        <div key={remote.name} className="group flex items-center justify-between p-2 rounded-md bg-deep-charcoal/5 font-mono text-sm">
                             <div>
                                <span className="font-bold text-deep-charcoal">{remote.name}</span>
                                <span className="text-stone-gray ml-4">{remote.url}</span>
                            </div>
                            <button onClick={() => onRemove(remote.name)} className="text-xs text-red-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
             <form onSubmit={handleAdd} className="border-t border-deep-charcoal/10 pt-6">
                <h4 className="font-bold text-md text-deep-charcoal mb-3">Add New Remote</h4>
                 <div className="flex items-end space-x-3">
                     <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="upstream" required className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50" />
                    </div>
                     <div className="flex-grow">
                        <label className="block text-xs font-medium text-stone-gray mb-1">URL</label>
                        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://github.com/..." required className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50" />
                    </div>
                    <button type="submit" className="bg-deep-charcoal text-paper-white px-4 py-2 rounded-md hover:bg-deep-charcoal/90 transition-colors font-bold text-sm h-[42px]">Add Remote</button>
                </div>
            </form>
        </div>
    );
};

const StashView: React.FC<{ stashes: Stash[], onApply: (id: string) => void, onPop: (id: string) => void, onDrop: (id: string) => void }> = ({ stashes, onApply, onPop, onDrop }) => {
    if (stashes.length === 0) {
        return (
            <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up bg-paper-white">
                <p className="text-stone-gray text-center">No stashed changes.</p>
            </div>
        );
    }
    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-3">
            <h3 className="font-bold text-lg text-deep-charcoal mb-2">Stashed Changes</h3>
            {stashes.map((stash, index) => (
                <div key={stash.id} className="group flex items-center justify-between p-2 rounded-md bg-deep-charcoal/5 font-mono text-sm">
                    <div>
                        <span className="font-bold text-deep-charcoal">stash@&#123;{stashes.length - 1 - index}&#125;:</span>
                        <span className="text-stone-gray ml-3">{stash.message}</span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onApply(stash.id)} className="text-xs font-bold hover:underline">Apply</button>
                        <button onClick={() => onPop(stash.id)} className="text-xs font-bold hover:underline">Pop</button>
                        <button onClick={() => onDrop(stash.id)} className="text-xs text-red-600 hover:underline">Drop</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Main App Component ---
export default function App() {
  const [command, setCommand] = useState<ConstructedGlyph[]>([]);
  const [isLearningMode, setIsLearningMode] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [rebaseCommits, setRebaseCommits] = useState<RebaseCommit[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [localConfig, setLocalConfig] = useState(DUMMY_LOCAL_CONFIG);
  const [globalConfig, setGlobalConfig] = useState(DUMMY_GLOBAL_CONFIG);
  const [repoState, setRepoState] = useState(() => {
    try {
        const savedState = localStorage.getItem('glyph-repo-state');
        if (savedState) return JSON.parse(savedState);
    } catch (e) { console.error("Failed to load repo state", e); }
    return {
        commits: INITIAL_COMMIT_HISTORY,
        branches: INITIAL_BRANCHES,
        tags: INITIAL_TAGS,
        head: INITIAL_HEAD,
        repoFiles: INITIAL_REPO_STATE,
        stashes: [],
        remotes: [{name: 'origin', url: 'git@github.com:user/glyph.git'}],
    }
  });
  const { commits, branches, tags, head, repoFiles, stashes, remotes } = repoState;
  
  const setRepoStatePartial = (updater: (prevState: typeof repoState) => Partial<typeof repoState>) => {
    setRepoState(prev => ({ ...prev, ...updater(prev) }));
  };

  const [diffingFile, setDiffingFile] = useState<RepoFile | null>(null);
  const [authorFilter, setAuthorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [logBranches, setLogBranches] = useState<string[]>([]);
  const [commandSearch, setCommandSearch] = useState('');
  const [hoveredHistoryIndex, setHoveredHistoryIndex] = useState<number | null>(null);
  const [hoveredOption, setHoveredOption] = useState<GitOption | null>(null);
  const [describeResult, setDescribeResult] = useState<string | null>(null);
  const [bisectStatus, setBisectStatus] = useState<BisectStatus>({ state: 'INACTIVE', goodCommits: [], badCommits: [] });
  const [worktrees, setWorktrees] = useState<Worktree[]>([
    { path: './', head: 'c2e8a4a', branch: 'develop', isMain: true },
    { path: '../glyph-docs', head: 'f6d8b3c', branch: 'feat/new-feature' }
  ]);
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const [activeView, setActiveView] = useState<GitVerb['id'] | 'dashboard'>('dashboard');

  // --- State Persistence ---
  useEffect(() => {
    try {
        localStorage.setItem('glyph-repo-state', JSON.stringify(repoState));
    } catch (e) { console.error("Failed to save repo state", e); }
  }, [repoState]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('glyph-history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (error) { console.error("Failed to load history from localStorage", error); }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('glyph-history', JSON.stringify(history));
    } catch (error) { console.error("Failed to save history to localStorage", error); }
  }, [history]);
  
  // --- UI State & Views ---
  const currentVerb = command.length > 0 ? GIT_COMMANDS.find(v => v.id === command[0].verbId) : GIT_COMMANDS.find(v => v.id === activeView);
  const isInteractiveRebase = activeView === 'rebase' && command.some(g => g.optionId === 'i');
  const isLogView = activeView === 'log';
  const isBlameView = activeView === 'blame' && command.some(g => g.optionId === 'file' && g.value);
  const isConfigView = activeView === 'config';
  const isStatusView = activeView === 'status';
  const isBranchView = activeView === 'branch';
  const isReflogView = activeView === 'reflog';
  const isShortlogView = activeView === 'shortlog';
  const isGrepView = activeView === 'grep' && command.some(g => g.optionId === 'pattern' && g.value);
  const isDescribeView = activeView === 'describe';
  const isBisectView = activeView === 'bisect';
  const isWorktreeView = activeView === 'worktree';
  const isShowView = activeView === 'show';
  const isTagView = activeView === 'tag';
  const isRemoteView = activeView === 'remote';
  const isStashView = activeView === 'stash';

  const addNotification = useCallback((message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    if (isInteractiveRebase) {
        setRebaseCommits(DUMMY_COMMITS);
    } else {
        setRebaseCommits([]);
    }
  }, [isInteractiveRebase]);
  
  useEffect(() => {
    if (activeView !== 'log') {
        setSelectedCommit(null);
        setAuthorFilter('');
        setSortOrder('desc');
        setLogBranches([]);
    }
    if (activeView !== 'status') setDiffingFile(null);
  }, [activeView]);


  const addToHistory = useCallback((cmd: string) => {
    if (!cmd.trim() || cmd === 'git') return;
    setHistory(prev => {
      const newHistory = [cmd, ...prev.filter(c => c !== cmd)];
      return newHistory.slice(0, MAX_HISTORY);
    });
  }, []);

  const handleVerbSelect = (verb: GitVerb) => {
    setActiveView(verb.id);
    const newCommand: ConstructedGlyph[] = [{
      instanceId: `verb-${Date.now()}`,
      verbId: verb.id,
      value: ''
    }];
    if (verb.id === 'log') {
        newCommand.push({ instanceId: `option-${Date.now()}`, verbId: 'log', optionId: 'graph', value: '' });
    }
    if(verb.id === 'commit'){
      // Don't set command for commit, the UI panel handles it
    } else {
       setCommand(newCommand);
    }
  };

  const handleAddOption = (option: GitOption) => {
    if (!command.length) return;
    if(option.type === 'boolean' && command.some(g => g.optionId === option.id)) return;
    setCommand(prev => [...prev, {
      instanceId: `option-${Date.now()}`,
      verbId: prev[0].verbId,
      optionId: option.id,
      value: option.choices?.[0] || (option.type === 'string' && !option.requiresValue ? option.placeholder || '' : '')
    }]);
  };

  const handleGlyphValueChange = (instanceId: string, newValue: string) => {
    setCommand(prev => prev.map(g => g.instanceId === instanceId ? { ...g, value: newValue } : g));
  };

  const handleRemoveGlyph = (instanceId: string) => {
    setCommand(prev => prev.filter(g => g.instanceId !== instanceId));
  };
  
  const handleClearCommand = () => setCommand([]);

  const generatedCommand = useMemo(() => {
    if (command.length === 0) return '';
    const verb = GIT_COMMANDS.find(v => v.id === command[0].verbId);
    if (!verb) return '';

    let parts = [`git ${verb.name}`];
    
    command.slice(1).forEach(glyph => {
      const option = verb.options.find(o => o.id === glyph.optionId);
      if (!option) return;
      if (option.flag) parts.push(option.flag);
      if (option.requiresValue && glyph.value) {
          const value = glyph.value.includes(' ') ? `"${glyph.value}"` : glyph.value;
          parts.push(value);
      }
    });
    return parts.join(' ');
  }, [command]);

  const gitAliases = useMemo(() => {
      const aliases: Record<string, string> = {};
      const effectiveConfig = { ...DUMMY_GLOBAL_CONFIG, ...localConfig };
      for (const key in effectiveConfig) {
          if (key.startsWith('alias.')) aliases[key.substring(6)] = effectiveConfig[key];
      }
      return aliases;
  }, [localConfig, DUMMY_GLOBAL_CONFIG]);
  
  const parseCommandToGlyphs = useCallback((cmd: string): ConstructedGlyph[] => {
    let parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    if (parts.length < 2 || parts[0] !== 'git') return [];

    const potentialAlias = parts[1];
    if (gitAliases[potentialAlias]) {
        const expansion = gitAliases[potentialAlias].split(' ');
        parts.splice(1, 1, ...expansion);
    }

    const verbName = parts[1];
    const verb = GIT_COMMANDS.find(v => v.name === verbName);
    if (!verb) return [];

    const glyphs: ConstructedGlyph[] = [{ instanceId: `verb-${Date.now()}`, verbId: verb.id, value: '' }];
    
    let i = 2;
    while (i < parts.length) {
        const part = parts[i];
        const option = verb.options.find(o => o.flag === part || o.choices?.includes(part));

        if (option) {
            let value = '';
            if (option.requiresValue) {
                if (i + 1 < parts.length && !parts[i+1].startsWith('-')) {
                    i++;
                    value = parts[i].replace(/"/g, '');
                }
            }
             if (option.type === 'choice') value = part;
            glyphs.push({ instanceId: `option-${Date.now()}-${i}`, verbId: verb.id, optionId: option.id, value });
        }
        i++;
    }
    return glyphs;
  }, [gitAliases]);

  const handleHistorySelect = (cmd: string) => {
      const glyphs = parseCommandToGlyphs(cmd);
      if (glyphs.length > 0) {
          const verbId = glyphs[0].verbId;
          const verb = GIT_COMMANDS.find(v => v.id === verbId);
          if (verb) {
              setActiveView(verb.id);
              setCommand(glyphs);
          }
      }
  };
  const handleDeleteHistoryItem = (index: number) => setHistory(prev => prev.filter((_, i) => i !== index));
  
  const handleCopy = () => {
    if (generatedCommand) {
      navigator.clipboard.writeText(generatedCommand);
      addToHistory(generatedCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
    const currentBranchName = useMemo(() => Object.entries(branches).find(([, commitId]) => commitId === head)?.[0] || 'detached HEAD', [branches, head]);

    const handleCreateBranch = useCallback((name: string, startPoint?: string) => {
        const startCommit = startPoint ? (commits.find(c => c.hash.startsWith(startPoint))?.id || (branches[startPoint] || head)) : head;
        setRepoStatePartial(prev => ({ branches: { ...prev.branches, [name]: startCommit } }));
        addNotification(`Branch '${name}' created.`);
    }, [branches, head, commits, addNotification]);
  
    const handleCreateBranchFromCommit = useCallback((commit: Commit) => {
        const newBranchName = `feature/from-${commit.hash.substring(0,4)}`;
        handleCreateBranch(newBranchName, commit.hash);
        setActiveView('branch');
    }, [handleCreateBranch]);

    const handleSwitchBranch = useCallback((branchName: string) => {
        if (branches[branchName]) {
            setRepoStatePartial(() => ({ head: branches[branchName] }));
            addNotification(`Switched to branch '${branchName}'.`);
        }
    }, [branches, addNotification]);

    const handleDeleteBranch = useCallback((branchName: string) => {
        setRepoStatePartial(prev => {
            const newBranches = {...prev.branches};
            delete newBranches[branchName];
            return { branches: newBranches };
        });
        addNotification(`Branch '${branchName}' deleted.`);
    }, [addNotification]);

    const handleRenameBranch = useCallback((oldName: string, newName: string) => {
        setRepoStatePartial(prev => {
            const newBranches = {...prev.branches};
            if (newBranches[oldName]) {
                newBranches[newName] = newBranches[oldName];
                delete newBranches[oldName];
            }
            return { branches: newBranches };
        });
        addNotification(`Branch '${oldName}' renamed to '${newName}'.`);
    }, [addNotification]);

    const handleConfigChange = useCallback((key: string, value: string, scope: 'local' | 'global') => {
        if (scope === 'local') setLocalConfig(prev => ({...prev, [key]: value}));
        else setGlobalConfig(prev => ({...prev, [key]: value}));
        addNotification(`Config '${key}' set in ${scope} scope.`);
    }, [addNotification]);

    const handleStageFile = useCallback((path: string) => {
        setRepoStatePartial(prev => ({ repoFiles: prev.repoFiles.map(f => f.path === path ? { ...f, status: 'staged', hunks: f.hunks?.map(h => ({ ...h, isStaged: true })) } : f) }));
        addNotification(`Staged '${path}'.`);
    }, [addNotification]);
    
    const handleStageAll = useCallback(() => {
        setRepoStatePartial(prev => ({ repoFiles: prev.repoFiles.map(f => {
            if (f.status === 'modified' || f.status === 'partially-staged' || f.status === 'untracked') {
                return { ...f, status: 'staged', hunks: f.hunks?.map(h => ({ ...h, isStaged: true })) };
            }
            return f;
        })}));
        addNotification(`Staged all changes.`);
    }, [addNotification]);

    const handleUnstageFile = useCallback((path: string) => {
        setRepoStatePartial(prev => ({ repoFiles: prev.repoFiles.map(f => {
            if (f.path === path) {
                const newStatus = f.type === 'new' ? 'untracked' : 'modified';
                return { ...f, status: newStatus, hunks: f.hunks?.map(h => ({ ...h, isStaged: false })) };
            }
            return f;
        })}));
        addNotification(`Unstaged '${path}'.`);
    }, [addNotification]);

    const handleToggleHunk = useCallback((filePath: string, hunkId: string) => {
        setRepoStatePartial(prev => ({ repoFiles: prev.repoFiles.map(file => {
            if (file.path === filePath && file.hunks) {
                const newHunks = file.hunks.map(hunk => hunk.id === hunkId ? { ...hunk, isStaged: !hunk.isStaged } : hunk);
                const stagedCount = newHunks.filter(h => h.isStaged).length;
                let newStatus: RepoFile['status'] = 'modified';
                if (stagedCount === newHunks.length) newStatus = 'staged';
                else if (stagedCount > 0) newStatus = 'partially-staged';
                return { ...file, hunks: newHunks, status: newStatus };
            }
            return file;
        })}));
    }, []);

    const handleDiscardChanges = useCallback((path: string) => {
        setRepoStatePartial(prev => ({ repoFiles: prev.repoFiles.filter(f => f.path !== path || f.status === 'staged') }));
        addNotification(`Discarded changes in '${path}'.`);
    }, [addNotification]);
    
    // --- NEW: Dynamic command simulations ---
    const handleCommit = useCallback((message: string) => {
        if (currentBranchName === 'detached HEAD') {
            addNotification("Cannot commit in detached HEAD state.");
            return;
        }
        const newCommit: Commit = {
            id: `c${commits.length + 1}`,
            hash: Math.random().toString(16).substring(2, 9),
            parents: [head],
            message,
            author: 'Alice',
            date: new Date().toISOString(),
            row: -1, col: commits.find(c => c.id === head)?.col || 0,
        };
        const updatedCommits = [newCommit, ...commits].map((c, index) => ({...c, row: index}));
        setRepoState(s => ({
            ...s,
            commits: updatedCommits,
            branches: { ...s.branches, [currentBranchName]: newCommit.id },
            head: newCommit.id,
            repoFiles: s.repoFiles.filter(f => f.status !== 'staged')
        }));
        addNotification(`Commit ${newCommit.hash} created.`);
        setActiveView('log');
    }, [commits, head, currentBranchName, addNotification]);

    useEffect(() => {
        const verbId = command[0]?.verbId;
        if (verbId === 'merge') {
            const branchToMerge = command.find(g => g.optionId === 'branch')?.value;
            if (branchToMerge && branches[branchToMerge] && currentBranchName !== 'detached HEAD') {
                const sourceCommitId = branches[branchToMerge];
                if (sourceCommitId === head) return;

                const newCommit = {
                    id: `c${commits.length + 1}`,
                    hash: Math.random().toString(16).substring(2, 9),
                    parents: [head, sourceCommitId].sort(),
                    message: `Merge branch '${branchToMerge}' into ${currentBranchName}`,
                    author: 'Alice', date: new Date().toISOString(), row: -1,
                    col: commits.find(c => c.id === head)?.col || 0,
                };
                const updatedCommits = [newCommit, ...commits].map((c, i) => ({...c, row: i}));
                setRepoState(s => ({
                    ...s,
                    commits: updatedCommits,
                    branches: { ...s.branches, [currentBranchName]: newCommit.id },
                    head: newCommit.id
                }));
                addNotification(`Merged branch '${branchToMerge}'.`);
                handleClearCommand();
                setActiveView('log');
            }
        } else if (verbId === 'cherry-pick') {
            const commitToPickHash = command.find(g => g.optionId === 'commit')?.value;
            const commitToPick = commits.find(c => c.hash.startsWith(commitToPickHash || ''));
            if (commitToPick && currentBranchName !== 'detached HEAD') {
                const newCommit = {
                    id: `c${commits.length + 1}`,
                    hash: Math.random().toString(16).substring(2, 9),
                    parents: [head],
                    message: commitToPick.message,
                    author: 'Alice', date: new Date().toISOString(), row: -1,
                    col: commits.find(c => c.id === head)?.col || 0,
                };
                const updatedCommits = [newCommit, ...commits].map((c, i) => ({...c, row: i}));
                setRepoState(s => ({
                    ...s,
                    commits: updatedCommits,
                    branches: { ...s.branches, [currentBranchName]: newCommit.id },
                    head: newCommit.id
                }));
                addNotification(`Cherry-picked ${commitToPick.hash}.`);
                handleClearCommand();
            }
        } else if (verbId === 'reset') {
            const commitRef = command.find(g => g.optionId === 'commit-ref')?.value;
            const targetCommit = commits.find(c => c.hash.startsWith(commitRef?.replace('HEAD~', '') || '')); // Simplified logic
            if (targetCommit && currentBranchName !== 'detached HEAD') {
                 setRepoState(s => ({
                    ...s,
                    branches: { ...s.branches, [currentBranchName]: targetCommit.id },
                    head: targetCommit.id
                }));
                 addNotification(`Reset to ${targetCommit.hash}.`);
                 handleClearCommand();
            }
        } else if (verbId === 'revert') {
            const commitToRevertHash = command.find(g => g.optionId === 'commit')?.value;
            const commitToRevert = commits.find(c => c.hash.startsWith(commitToRevertHash || ''));
            if (commitToRevert && currentBranchName !== 'detached HEAD') {
                const newCommit = {
                     id: `c${commits.length + 1}`,
                    hash: Math.random().toString(16).substring(2, 9),
                    parents: [head],
                    message: `Revert "${commitToRevert.message}"`,
                    author: 'Alice', date: new Date().toISOString(), row: -1,
                    col: commits.find(c => c.id === head)?.col || 0,
                };
                const updatedCommits = [newCommit, ...commits].map((c, i) => ({...c, row: i}));
                setRepoState(s => ({
                    ...s,
                    commits: updatedCommits,
                    branches: { ...s.branches, [currentBranchName]: newCommit.id },
                    head: newCommit.id
                }));
                addNotification(`Reverted commit ${commitToRevert.hash}.`);
                handleClearCommand();
            }
        }
    }, [command, branches, commits, head, currentBranchName, addNotification]);
    
    const handleStashPush = useCallback(() => {
        const filesToStash = repoFiles.filter(f => f.status === 'modified' || f.status === 'partially-staged' || f.status === 'untracked');
        if (filesToStash.length === 0) {
            addNotification("No local changes to save.");
            return;
        }
        const newStash: Stash = {
            id: `stash-${Date.now()}`,
            message: `On ${currentBranchName}: WIP`,
            files: filesToStash,
            createdAt: new Date().toISOString(),
        };
        setRepoStatePartial(prev => ({
            stashes: [newStash, ...prev.stashes],
            repoFiles: prev.repoFiles.filter(f => f.status === 'staged')
        }));
        addNotification("Saved working directory and index state.");
    }, [repoFiles, currentBranchName, addNotification]);

    const handleStashApply = useCallback((id: string) => {
        const stash = stashes.find(s => s.id === id);
        if (!stash) return;
        // simplistic apply: just add files back. a real implementation would handle conflicts.
        setRepoStatePartial(prev => ({ repoFiles: [...prev.repoFiles, ...stash.files] }));
        addNotification(`Applied stash '${stash.message}'.`);
    }, [stashes, addNotification]);

    const handleStashPop = useCallback((id: string) => {
        handleStashApply(id);
        setRepoStatePartial(prev => ({ stashes: prev.stashes.filter(s => s.id !== id) }));
    }, [handleStashApply]);

    const handleStashDrop = useCallback((id: string) => {
        setRepoStatePartial(prev => ({ stashes: prev.stashes.filter(s => s.id !== id) }));
        addNotification("Stash dropped.");
    }, [addNotification]);

    const handleCreateTag = useCallback((name: string, commitRef: string) => {
        const targetCommit = commits.find(c => c.hash.startsWith(commitRef)) || commits.find(c => c.id === branches[commitRef]) || commits.find(c => c.id === head);
        if (targetCommit) {
            setRepoStatePartial(prev => ({ tags: { ...prev.tags, [name]: targetCommit.id } }));
            addNotification(`Tag '${name}' created at ${targetCommit.hash.substring(0,7)}.`);
        } else {
            addNotification(`Error: Could not find commit for '${commitRef}'.`);
        }
    }, [commits, branches, head, addNotification]);
    
    const handleDeleteTag = useCallback((name: string) => {
        setRepoStatePartial(prev => {
            const newTags = { ...prev.tags };
            delete newTags[name];
            return { tags: newTags };
        });
        addNotification(`Tag '${name}' deleted.`);
    }, [addNotification]);

    const handleAddRemote = useCallback((name: string, url: string) => {
        setRepoStatePartial(prev => ({ remotes: [...prev.remotes, { name, url }] }));
        addNotification(`Remote '${name}' added.`);
    }, [addNotification]);

    const handleRemoveRemote = useCallback((name: string) => {
        setRepoStatePartial(prev => ({ remotes: prev.remotes.filter(r => r.name !== name) }));
        addNotification(`Remote '${name}' removed.`);
    }, [addNotification]);

    // --- Memoized Derived State ---
    const filteredCommits = useMemo(() => {
        let currentCommits: Commit[] = [...commits];
        if (authorFilter.trim()) currentCommits = currentCommits.filter(c => c.author.toLowerCase().includes(authorFilter.trim().toLowerCase()));
        if (sortOrder === 'asc') currentCommits.reverse();
        return currentCommits;
    }, [commits, authorFilter, sortOrder]);
    
    const filteredCommands = useMemo(() => {
        if (!commandSearch.trim()) return GIT_COMMANDS;
        return GIT_COMMANDS.filter(verb => verb.name.toLowerCase().includes(commandSearch.toLowerCase()) || verb.description.toLowerCase().includes(commandSearch.toLowerCase()));
    }, [commandSearch]);
    
    const lastCommit = useMemo(() => commits.find(c => c.id === head) || commits[0], [head, commits]);
    const commitForShowView = useMemo(() => {
        if (!isShowView) return null;
        const object = command.find(g => g.optionId === 'object')?.value || 'HEAD';
        if (object === 'HEAD') return commits.find(c => c.id === head);
        const branchCommitId = branches[object];
        if (branchCommitId) return commits.find(c => c.id === branchCommitId);
        const tagCommitId = tags[object];
        if (tagCommitId) return commits.find(c => c.id === tagCommitId);
        return commits.find(c => c.hash.startsWith(object));
    }, [isShowView, command, commits, head, branches, tags]);
    
    const stagedFileCount = useMemo(() => repoFiles.filter(f => f.status === 'staged' || f.status === 'partially-staged').length, [repoFiles]);
    const modifiedFileCount = useMemo(() => repoFiles.filter(f => f.status === 'modified' || f.status === 'partially-staged' || f.status === 'untracked').length, [repoFiles]);

    const renderMainPanel = () => {
        if (isLogView) return <CommitLogGraph commits={filteredCommits} branches={branches} head={head} showGraph={command.some(g => g.optionId === 'graph')} onCommitSelect={setSelectedCommit} selectedCommitId={selectedCommit?.id || null} onCreateBranch={handleCreateBranchFromCommit} onSwitchBranch={handleSwitchBranch} onDeleteBranch={handleDeleteBranch} />;
        if (isBranchView) return <BranchView branches={branches} headCommitId={head} onCreate={handleCreateBranch} onSwitch={handleSwitchBranch} onRename={handleRenameBranch} onDelete={handleDeleteBranch}/>;
        if (isBlameView) return <BlameView lines={DUMMY_BLAME_DATA} showEmail={command.some(g => g.optionId === 'e')} fileName={command.find(g => g.optionId === 'file')?.value || ''} />;
        if (isConfigView) return <ConfigView localConfig={localConfig} globalConfig={globalConfig} scope={command.some(g => g.optionId === 'global') ? 'global' : 'local'} configKey={command.find(g => g.optionId === 'key')?.value || ''} configValue={command.find(g => g.optionId === 'value')?.value || ''} showList={command.some(g => g.optionId === 'list')} onConfigChange={handleConfigChange} />;
        if (isStatusView) return <StatusView files={repoFiles} onStage={handleStageFile} onUnstage={handleUnstageFile} onViewDiff={setDiffingFile} onToggleHunk={handleToggleHunk} onDiscard={handleDiscardChanges} />;
        if (isReflogView) return <ReflogView entries={DUMMY_REFLOG_DATA} />;
        if (isShortlogView) return <ShortlogView commits={commits} />;
        if (isGrepView) return <GrepView results={DUMMY_GREP_DATA} pattern={command.find(c => c.optionId === 'pattern')?.value || ''} ignoreCase={command.some(c => c.optionId === 'i')} />;
        if (isDescribeView) return <DescribeView result={describeResult} />;
        if (isBisectView) return <BisectView status={bisectStatus} onGood={() => {}} onBad={() => {}} onReset={() => {}} currentCommit={commits.find(c => c.hash === bisectStatus.current)} />;
        if (isWorktreeView) return <WorktreeView worktrees={worktrees} onAdd={() => {}} onRemove={() => {}} />;
        if (isShowView) return <ShowView commit={commitForShowView} />;
        if (isTagView) return <TagView tags={tags} commits={commits} onCreate={handleCreateTag} onDelete={handleDeleteTag} />;
        if (isRemoteView) return <RemoteView remotes={remotes} onAdd={handleAddRemote} onRemove={handleRemoveRemote} />;
        if (isStashView) return <StashView stashes={stashes} onApply={handleStashApply} onPop={handleStashPop} onDrop={handleStashDrop} />;

        // Fallback for commands without a dedicated view or the dashboard
        return (
            <div className="space-y-6">
                <RepositoryDashboard
                    branchName={currentBranchName}
                    lastCommit={lastCommit}
                    stagedCount={stagedFileCount}
                    modifiedCount={modifiedFileCount}
                    onCommit={handleCommit}
                    onStageAll={handleStageAll}
                    onSwitchToStatus={() => setActiveView('status')}
                />
                 { currentVerb && (
                     <div className="bg-paper-white p-6 rounded-panel shadow-panel border border-deep-charcoal/5">
                        <div className="flex flex-wrap items-start">
                        {command.map((glyph, index) => (
                            <GlyphComponent key={glyph.instanceId} prefix={index === 0 ? 'git' : (currentVerb.options.find(o => o.id === glyph.optionId)?.flag || '')} value={index === 0 ? currentVerb.name : glyph.value} placeholder={currentVerb.options.find(o => o.id === glyph.optionId)?.placeholder} option={currentVerb.options.find(o => o.id === glyph.optionId)} onValueChange={(newValue) => handleGlyphValueChange(glyph.instanceId, newValue)} onRemove={() => handleRemoveGlyph(glyph.instanceId)} isVerb={index === 0}/>
                        ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-deep-charcoal/10">
                        <h3 className="text-md font-semibold mb-2">Add options for <span className="font-mono text-burnt-gold">{currentVerb.name}</span>:</h3>
                        <div className="flex flex-wrap gap-2">
                            {currentVerb.options.map(option => (<button key={option.id} onClick={() => handleAddOption(option)} className="px-3 py-1.5 text-sm rounded-md bg-deep-charcoal/5 hover:bg-burnt-gold/20 transition-colors font-mono" onMouseEnter={() => setHoveredOption(option)} onMouseLeave={() => setHoveredOption(null)}>
                                {option.flag ? `${option.flag} (${option.description})` : option.description}
                            </button>))}
                        </div>
                        </div>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="bg-paper-off-white min-h-screen h-screen overflow-hidden font-sans text-deep-charcoal p-4 sm:p-6 lg:p-8 flex flex-col relative">
          {/* Notifications */}
          <div className="absolute top-4 right-4 z-50 space-y-2">
            {notifications.map(n => (
              <div key={n.id} className="bg-deep-charcoal text-white text-sm px-4 py-2 rounded-md shadow-lg animate-fade-in-slide-up">
                {n.message}
              </div>
            ))}
          </div>
          
          <header 
            className="flex-shrink-0 flex justify-between items-center mb-6 p-4 border-b border-deep-charcoal/10 bg-paper-white relative overflow-hidden"
            style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRjI5MzciIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTAgMzguNTlsMi44My0yLjgzIDEuNDEgMS40MUwxLjQxIDQwSDB2LTEuNDF6TTAgMS40bDIuODMgMi44MyAxLjQxLTEuNDFMMi40MSAwSDB2MS40MXpNMzguNTkgNDBsLTIuODMtMi44MyAxLjQxLTEuNDFMMzAgMzguNTlWNDBoLTEuNDF6TTQwIDEuNDFsLTIuODMgMi44My0xLjQxLTEuNDFMMzguNTkgMEg0MHYxLjQxek0yMCAxOC42bDIuODMtMi44MyAxLjQxIDEuNDFMMjEuNDEgMjBsMi44MyAyLjgzLTEuNDEgMS40MUwyMCAyMS40MWwtMi44MyAyLjgzLTEuNDEtMS40MUwxOC41OSAyMGwtMi44My0yLjgzIDEuNDEtMS40MUwyMCAxOC41OXoiLz48L2c+PC9nPjwvc3ZnPg==')`}}
          >
            <GlyphLogo />
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Learning Mode</span>
              <button onClick={() => setIsLearningMode(!isLearningMode)} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burnt-gold ${isLearningMode ? 'bg-burnt-gold' : 'bg-deep-charcoal/20'}`}>
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isLearningMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </header>

          <main className="flex-grow grid grid-cols-12 gap-8 min-h-0">
            {/* Column 1: Verbs (Vertical Carousel) */}
            <div className="col-span-2 flex flex-col min-h-0">
                <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-left transition-colors mb-4 ${activeView === 'dashboard' ? 'bg-burnt-gold/10 font-semibold' : 'hover:bg-deep-charcoal/5'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    <span className="font-mono text-sm">Dashboard</span>
                </button>
              <div className="relative mb-4">
                <input type="text" placeholder="Search commands..." value={commandSearch} onChange={(e) => setCommandSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm bg-paper-white border border-deep-charcoal/10 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50" />
                <svg className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-stone-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <nav className="flex-grow overflow-y-auto space-y-1 pr-2">
                {filteredCommands.map(verb => (
                  <button key={verb.id} onClick={() => handleVerbSelect(verb)} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-left transition-colors relative ${activeView === verb.id ? 'bg-burnt-gold/10 text-deep-charcoal font-semibold' : 'hover:bg-deep-charcoal/5'}`}>
                    {activeView === verb.id && <div className="absolute left-0 top-2 bottom-2 w-1 bg-burnt-gold rounded-r-full"></div>}
                    <verb.icon className={`w-5 h-5 flex-shrink-0 ${activeView === verb.id ? 'text-burnt-gold' : 'text-stone-gray'}`} />
                    <span className="font-mono text-sm">{verb.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Column 2: Main Canvas */}
            <div className="col-span-6 overflow-y-auto p-2">
              {renderMainPanel()}
              {generatedCommand && (
                <div className="mt-4 p-4 bg-deep-charcoal/95 rounded-lg flex items-center justify-between font-mono text-paper-off-white text-sm sticky bottom-0 z-10 shadow-lg">
                  <code className="break-all">{generatedCommand}</code>
                  <div className="flex items-center space-x-3 ml-4">
                      <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-white/20 transition-colors"><CopyIcon copied={copied} /></button>
                      <button onClick={handleClearCommand} className="p-1.5 rounded-md hover:bg-white/20 transition-colors"><TrashIcon /></button>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Scribe & History */}
            <div className="col-span-4 overflow-y-auto p-2">
              <div className="space-y-6">
                {isLearningMode && (
                    <div className="p-6 bg-burnt-gold/5 border border-burnt-gold/10 rounded-panel animate-fade-in-slide-up">
                        <div className="flex items-center space-x-3 mb-4"><LearningIcon /><h2 className="text-xl font-bold text-deep-charcoal">Live Scribe</h2></div>
                        {hoveredOption ? (<>
                                <p className="font-semibold text-lg mb-2 font-mono">{hoveredOption.flag ? `${hoveredOption.flag} (${hoveredOption.description})` : hoveredOption.description}</p>
                                <p className="text-deep-charcoal/80 mb-4">{hoveredOption.longDescription}</p>
                             </>) : currentVerb ? (<>
                                <p className="font-semibold text-lg mb-2">{currentVerb.name}</p>
                                <p className="text-deep-charcoal/80 mb-4">{currentVerb.longDescription}</p>
                                {SUGGESTED_COMMANDS[currentVerb.id] && (<div>
                                    <h4 className="font-bold mb-2">Related Commands:</h4>
                                    <ul className="space-y-2">{SUGGESTED_COMMANDS[currentVerb.id].map(s => (<li key={s.command} className="flex items-center text-sm"><code className="font-mono bg-deep-charcoal/10 px-2 py-0.5 rounded mr-2">{s.command}</code><span>- {s.description}</span></li>))}</ul>
                                </div>)}
                            </>) : (<p className="text-stone-gray">Select a command from the list on the left to learn about its purpose, usage, and options.</p>)}
                    </div>
                )}
                {repoFiles.some(f => f.status === 'modified' || f.status === 'untracked') && <button onClick={handleStashPush} className="w-full bg-deep-charcoal text-white font-bold py-2 rounded-lg shadow-sm hover:bg-deep-charcoal/90 transition-colors">Stash Changes</button>}

                <div>
                  <h3 className="text-lg font-semibold mb-2">History</h3>
                  {history.length > 0 ? (
                    <div className="bg-paper-white py-3 px-2 rounded-panel shadow-panel border border-deep-charcoal/5 space-y-1">
                      {history.map((cmd, i) => (
                        <div key={`${cmd}-${i}`} onMouseEnter={() => setHoveredHistoryIndex(i)} onMouseLeave={() => setHoveredHistoryIndex(null)} className="w-full flex justify-between items-center text-left font-mono text-sm p-2 rounded-md hover:bg-deep-charcoal/5 transition-colors">
                          <span className="truncate pr-4 cursor-pointer" onClick={() => handleHistorySelect(cmd)}>{cmd}</span>
                           {hoveredHistoryIndex === i && (<div className="flex items-center space-x-1 flex-shrink-0 animate-pop-in">
                               <button onClick={() => handleHistorySelect(cmd)} className="p-1.5 rounded-md hover:bg-burnt-gold/20 text-stone-gray hover:text-burnt-gold" title="Re-use command"><ReuseIcon /></button>
                               <button onClick={() => handleDeleteHistoryItem(i)} className="p-1.5 rounded-md hover:bg-red-500/10 text-stone-gray hover:text-red-600" title="Delete from history"><TrashIcon className="w-4 h-4" /></button>
                           </div>)}
                        </div>
                      ))}
                    </div>
                  ) : (<div className="bg-paper-white py-5 px-4 rounded-panel shadow-panel border border-deep-charcoal/5 text-center"><p className="text-sm text-stone-gray">Commands you copy will appear here for easy reuse.</p></div>)}
                </div>
              </div>
            </div>
          </main>
        </div>
      );
}


const RepositoryDashboard: React.FC<{
    branchName: string;
    lastCommit: Commit;
    stagedCount: number;
    modifiedCount: number;
    onCommit: (message: string) => void;
    onStageAll: () => void;
    onSwitchToStatus: () => void;
}> = ({ branchName, lastCommit, stagedCount, modifiedCount, onCommit, onStageAll, onSwitchToStatus }) => {
    
    return (
        <div className="bg-paper-white p-6 rounded-panel shadow-panel border border-deep-charcoal/5 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-deep-charcoal">Repository Dashboard</h2>
                <div className="mt-2 text-sm">
                    <p>Current Branch: <span className="font-mono text-burnt-gold">{branchName}</span></p>
                    <p>Last Commit: <span className="font-mono text-deep-charcoal truncate">{lastCommit.message}</span> by <span className="font-semibold">{lastCommit.author}</span></p>
                </div>
            </div>

            {stagedCount > 0 && <CommitPanel stagedFiles={stagedCount} onCommit={onCommit} branchName={branchName} />}

            {(modifiedCount > 0 || stagedCount > 0) ? (
                 <div className="border-t border-deep-charcoal/10 pt-4 space-y-3">
                    <h3 className="font-semibold">Working Directory Status</h3>
                    <div className="flex items-center justify-between p-3 bg-deep-charcoal/5 rounded-md">
                        <div>
                             <p className="font-bold">{stagedCount} staged file(s)</p>
                             <p className="font-bold">{modifiedCount} unstaged & untracked file(s)</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             {modifiedCount > 0 && <button onClick={onStageAll} className="px-4 py-2 text-sm font-bold bg-olive-green/20 text-olive-green rounded-md hover:bg-olive-green/30 transition-colors">Stage All</button>}
                             <button onClick={onSwitchToStatus} className="px-4 py-2 text-sm font-bold bg-deep-charcoal/10 text-deep-charcoal rounded-md hover:bg-deep-charcoal/20 transition-colors">View Details</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 border-t border-deep-charcoal/10">
                    <p className="text-olive-green font-semibold">Your working directory is clean.</p>
                    <p className="text-sm text-stone-gray mt-1">Nothing to commit.</p>
                </div>
            )}
        </div>
    )
}

const CommitPanel: React.FC<{stagedFiles: number, onCommit: (message: string) => void, branchName: string}> = ({stagedFiles, onCommit, branchName}) => {
    const [message, setMessage] = useState('');
    const canCommit = stagedFiles > 0 && message.trim() !== '';

    const handleSubmit = () => {
        if(canCommit) {
            onCommit(message);
            setMessage('');
        }
    }
    
    return (
        <div className="bg-burnt-gold/5 p-4 rounded-lg border border-burnt-gold/20 animate-fade-in-slide-up">
            <h3 className="font-bold text-deep-charcoal mb-2">Commit Staged Changes</h3>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your commit message..."
                className="w-full h-24 p-2 text-sm font-mono bg-paper-white border border-deep-charcoal/10 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
            />
            <button
                onClick={handleSubmit}
                disabled={!canCommit}
                className="w-full mt-2 bg-deep-charcoal text-paper-white font-bold py-2 rounded-md transition-colors disabled:bg-deep-charcoal/40 disabled:cursor-not-allowed hover:bg-deep-charcoal/90"
            >
                Commit to {branchName}
            </button>
        </div>
    )
}