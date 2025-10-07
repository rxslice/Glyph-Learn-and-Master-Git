
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { ConstructedGlyph, GitOption, GitVerb, RebaseCommit, Commit, BlameLine, RepoFile, DiffLine, Hunk, ReflogEntry, GrepResult, BisectStatus, Worktree, Remote, Stash, SageMessage } from './types';
import { GIT_COMMANDS } from './data/gitCommands';
import { COMMIT_HISTORY as INITIAL_COMMIT_HISTORY, BRANCHES as INITIAL_BRANCHES, HEAD as INITIAL_HEAD, TAGS as INITIAL_TAGS, REMOTE_BRANCHES as INITIAL_REMOTE_BRANCHES, REMOTE_COMMIT_HISTORY as INITIAL_REMOTE_COMMITS } from './data/commitHistory';
import { GlyphComponent } from './components/GlyphComponent';
import { InteractiveRebase } from './components/InteractiveRebase';
import { CommitLogGraph } from './components/CommitLogGraph';
import { ConfigView } from './components/ConfigView';
import { StatusView } from './components/StatusView';
import { DiffView } from './components/DiffView';
import { BlameView } from './components/BlameView';
import { BranchView } from './components/BranchView';


const MAX_HISTORY = 10;
let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}


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

const DUMMY_BISECT_STATUS: BisectStatus = {
    state: 'BISECTING',
    start: 'v0.9.0',
    end: 'HEAD',
    current: 'e4f5g6h',
    goodCommits: ['g5h6i7j', 'i7j8k9l'],
    badCommits: ['c2e8a4a'],
    steps: 2,
    remaining: 4,
};

const DUMMY_WORKTREES: Worktree[] = [
    { path: '/path/to/glyph', head: 'c2e8a4a', branch: 'develop', isMain: true },
    { path: '/path/to/glyph-hotfix', head: 'd0e1f2a', branch: 'hotfix/bug-123' },
];

const DUMMY_REMOTES: Remote[] = [
    { name: 'origin', url: 'git@github.com:user/glyph.git' },
    { name: 'upstream', url: 'git@github.com:opensource/glyph.git' },
];

const DUMMY_STASHES: Stash[] = [
    { id: 'stash@{0}', message: 'WIP on feat/new-button: 8f3a2b1 style: Add button styles', createdAt: '2 hours ago', files: [] },
    { id: 'stash@{1}', message: 'WIP on develop: c2e8a4a Merge branch \'feat/new-feature\'', createdAt: '1 day ago', files: [] },
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

const SageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 4-3-4m0 18l3-4 3 4m9-11h-4m2-2v4" />
    </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                    <span className="truncate">{entry.message}</span>
                </div>
            ))}
        </div>
    </div>
);

const GrepView: React.FC<{ results: GrepResult[], pattern: string }> = ({ results, pattern }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Grep Results for "<span className="text-burnt-gold">{pattern}</span>"</h3>
        <div className="font-mono text-xs text-deep-charcoal space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, i) => (
                <div key={i} className="p-2 rounded-md bg-deep-charcoal/5">
                    <div className="flex items-center text-olive-green">
                        <span>{result.path}</span>
                        <span className="mx-2">:</span>
                        <span className="font-bold text-burnt-gold">{result.lineNumber}</span>
                    </div>
                    <pre className="mt-1 whitespace-pre-wrap text-deep-charcoal/80"><code>{result.content}</code></pre>
                </div>
            ))}
        </div>
    </div>
);

const BisectView: React.FC<{ status: BisectStatus }> = ({ status }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Bisect Status</h3>
        <div className="font-mono text-sm grid grid-cols-2 gap-4">
            <div><span className="text-stone-gray">State:</span> <span className="font-bold">{status.state}</span></div>
            <div><span className="text-stone-gray">Current:</span> <span className="font-bold text-burnt-gold">{status.current}</span></div>
            <div><span className="text-stone-gray">Bad commit:</span> <span className="font-bold">{status.end}</span></div>
            <div><span className="text-stone-gray">Good commit:</span> <span className="font-bold">{status.start}</span></div>
            <div className="col-span-2"><span className="text-stone-gray">{status.remaining} revisions left to test after this ({status.steps} steps)</span></div>
        </div>
    </div>
);

const WorktreeView: React.FC<{ worktrees: Worktree[] }> = ({ worktrees }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Worktrees</h3>
        <div className="font-mono text-sm space-y-2">
            {worktrees.map(wt => (
                <div key={wt.path} className="flex items-center p-2 rounded-md bg-deep-charcoal/5">
                    <span className="w-1/3 truncate">{wt.path}{wt.isMain ? ' (main)' : ''}</span>
                    <span className="w-1/4 text-burnt-gold">{wt.head}</span>
                    <span className="w-1/3 text-olive-green">{wt.branch}</span>
                </div>
            ))}
        </div>
    </div>
);

const RemoteView: React.FC<{ remotes: Remote[] }> = ({ remotes }) => (
     <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Remotes</h3>
        <div className="font-mono text-sm space-y-2">
            {remotes.map(remote => (
                <div key={remote.name} className="flex flex-col p-2 rounded-md bg-deep-charcoal/5">
                    <span className="font-bold text-burnt-gold">{remote.name}</span>
                    <span className="text-stone-gray">{remote.url}</span>
                </div>
            ))}
        </div>
    </div>
);

const StashView: React.FC<{ stashes: Stash[] }> = ({ stashes }) => (
    <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-deep-charcoal mb-4">Stashes</h3>
        <div className="font-mono text-sm space-y-2">
            {stashes.map(stash => (
                <div key={stash.id} className="flex items-center p-2 rounded-md bg-deep-charcoal/5">
                    <span className="font-bold text-burnt-gold mr-4">{stash.id}:</span>
                    <span className="truncate">{stash.message}</span>
                </div>
            ))}
        </div>
    </div>
);


const App: React.FC = () => {
    // Command state
    const [constructedGlyphs, setConstructedGlyphs] = useState<ConstructedGlyph[]>([]);
    const [commandHistory, setCommandHistory] = useState<ConstructedGlyph[][]>([]);
    const [selectedVerb, setSelectedVerb] = useState<GitVerb | null>(null);

    // UI State
    const [liveExplanation, setLiveExplanation] = useState('');
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showCommandList, setShowCommandList] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sageChatEndRef = useRef<HTMLDivElement>(null);

    // Simulator State
    const [rebaseCommits, setRebaseCommits] = useState(DUMMY_COMMITS);
    const [commitHistory, setCommitHistory] = useState(INITIAL_COMMIT_HISTORY);
    const [branches, setBranches] = useState(INITIAL_BRANCHES);
    const [head, setHead] = useState(INITIAL_HEAD);
    const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);
    const [localConfig, setLocalConfig] = useState(DUMMY_LOCAL_CONFIG);
    const [globalConfig, setGlobalConfig] = useState(DUMMY_GLOBAL_CONFIG);
    const [repoFiles, setRepoFiles] = useState(INITIAL_REPO_STATE);
    const [diffTarget, setDiffTarget] = useState<{ file: RepoFile; diffData: DiffLine[] } | null>(null);

    // Sage AI Chat State
    const [sageMessages, setSageMessages] = useState<SageMessage[]>([
        { role: 'sage', content: 'Welcome! I am the Git Sage. Ask me anything about your current command or Git in general.' }
    ]);
    const [sageInput, setSageInput] = useState('');
    const [isSageLoading, setIsSageLoading] = useState(false);
    
    // --- Command & Explanation Logic ---

    const commandString = useMemo(() => {
        if (constructedGlyphs.length === 0) return '';
        const commandParts = ['git', constructedGlyphs[0].value];
        constructedGlyphs.slice(1).forEach(glyph => {
            const option = selectedVerb?.options.find(o => o.id === glyph.optionId);
            if (option) {
                commandParts.push(option.flag);
                if (option.requiresValue && glyph.value) {
                    commandParts.push(option.type === 'string' ? `"${glyph.value}"` : glyph.value);
                }
            } else if (glyph.value) { // For positional arguments like commit hash or branch name
                commandParts.push(glyph.value);
            }
        });
        return commandParts.join(' ');
    }, [constructedGlyphs, selectedVerb]);

    const getExplanation = useCallback(async (currentCommand: string, verb: GitVerb | null, changedOption?: GitOption) => {
        if (!ai || !verb) {
            setLiveExplanation(verb?.longDescription || '');
            return;
        }

        setIsLoadingExplanation(true);
        try {
            let prompt = `You are a helpful Git expert. Explain the following git command concisely and clearly, as if teaching a beginner.
            Command: \`${currentCommand}\`

            Focus on the overall purpose of the command first.
            Then, briefly explain what each part does.

            Base command ("${verb.name}") description: "${verb.longDescription}"
            `;

            if (changedOption) {
                prompt += `
                The user just added or changed this specific option:
                - Flag: "${changedOption.flag}"
                - Description: "${changedOption.longDescription}"
                
                Please make sure to emphasize what this specific part does in your explanation.`;
            }

             if (verb.name === 'rebase' && changedOption?.flag === '-i') {
                prompt += `
                Since this is an interactive rebase, explain the common actions a user can take: pick, reword, edit, squash, fixup, drop. Keep the descriptions brief.`;
            }

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setLiveExplanation(response.text);
        } catch (error) {
            console.error("Error fetching explanation:", error);
            setLiveExplanation("Sorry, I couldn't fetch an explanation for this command. Please check your API key and connection.");
        } finally {
            setIsLoadingExplanation(false);
        }
    }, []);

    const handleGlyphChange = useCallback((instanceId: string, value: string) => {
        const updatedGlyphs = constructedGlyphs.map(g => g.instanceId === instanceId ? { ...g, value } : g);
        setConstructedGlyphs(updatedGlyphs);

        const changedGlyph = updatedGlyphs.find(g => g.instanceId === instanceId);
        const changedOption = selectedVerb?.options.find(o => o.id === changedGlyph?.optionId);
        
        // Rebuild command string for explanation to have the most up-to-date value
        const currentCommand = `git ${updatedGlyphs.map(g => {
            const opt = selectedVerb?.options.find(o => o.id === g.optionId);
            if (opt) {
                return `${opt.flag} ${opt.requiresValue ? `"${g.value}"` : ''}`.trim();
            }
            return g.value;
        }).join(' ')}`;
        
        getExplanation(currentCommand, selectedVerb, changedOption);
    }, [constructedGlyphs, selectedVerb, getExplanation]);

    const handleSelectVerb = useCallback((verb: GitVerb) => {
        setConstructedGlyphs([{ verbId: verb.id, value: verb.name, instanceId: `verb-${Date.now()}` }]);
        setSelectedVerb(verb);
        setShowCommandList(false);
        setSidebarOpen(false);
        setDiffTarget(null);
        handleGlyphChange(`verb-${Date.now()}`, verb.name); // Initial explanation
    }, [handleGlyphChange]);

    const handleAddOption = useCallback((option: GitOption) => {
        const newGlyph: ConstructedGlyph = {
            verbId: selectedVerb!.id,
            optionId: option.id,
            value: option.type === 'choice' ? option.choices![0] : '',
            instanceId: `option-${Date.now()}`
        };
        setConstructedGlyphs(prev => [...prev, newGlyph]);
        handleGlyphChange(newGlyph.instanceId, newGlyph.value);
    }, [selectedVerb, handleGlyphChange]);
    
    const handleRemoveGlyph = useCallback((instanceId: string) => {
        const updatedGlyphs = constructedGlyphs.filter(g => g.instanceId !== instanceId);
        setConstructedGlyphs(updatedGlyphs);
         const currentCommand = `git ${updatedGlyphs.map(g => g.value).join(' ')}`;
        getExplanation(currentCommand, selectedVerb);
    }, [constructedGlyphs, selectedVerb, getExplanation]);

    const handleClearCommand = useCallback(() => {
        if (constructedGlyphs.length > 0 && commandHistory[0] !== constructedGlyphs) {
            setCommandHistory(prev => [constructedGlyphs, ...prev].slice(0, MAX_HISTORY));
        }
        setConstructedGlyphs([]);
        setSelectedVerb(null);
        setLiveExplanation('');
        setShowCommandList(true);
        setDiffTarget(null);
    }, [constructedGlyphs, commandHistory]);

    const handleCopyCommand = useCallback(() => {
        navigator.clipboard.writeText(commandString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [commandString]);

    const handleReuseCommand = useCallback((glyphs: ConstructedGlyph[]) => {
        const verb = GIT_COMMANDS.find(v => v.id === glyphs[0].verbId);
        if (verb) {
            setSelectedVerb(verb);
            setConstructedGlyphs(glyphs);
            setShowCommandList(false);
        }
    }, []);

     // --- Sage AI Chat Logic ---
    const handleSageSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sageInput.trim() || !ai) return;

        const userMessage: SageMessage = { role: 'user', content: sageInput.trim() };
        setSageMessages(prev => [...prev, userMessage]);
        setSageInput('');
        setIsSageLoading(true);

        try {
            const prompt = `You are a helpful and concise Git expert called "Sage". A user is building a Git command and has a question.
            
            Current command being built:
            \`${commandString || 'Nothing yet.'}\`
            
            User's question:
            "${userMessage.content}"
            
            Provide a clear, helpful, and brief answer. Use markdown for formatting if needed.`;
            
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const sageResponse: SageMessage = {
                role: 'sage',
                content: response.text,
            };
            setSageMessages(prev => [...prev, sageResponse]);

        } catch (error) {
            console.error("Sage AI error:", error);
            const errorMessage: SageMessage = {
                role: 'sage',
                content: "Sorry, I couldn't process that right now. Please try again.",
            };
            setSageMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsSageLoading(false);
        }
    }, [sageInput, commandString]);

    useEffect(() => {
        sageChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sageMessages]);

    // --- Interactive View Handlers ---
    const handleCreateBranch = useCallback((commit: Commit) => {
        const newBranchName = prompt(`Enter new branch name, starting from commit "${commit.hash.slice(0, 7)}":`);
        if (newBranchName && !branches[newBranchName]) {
            setBranches(prev => ({ ...prev, [newBranchName]: commit.id }));
        } else if (newBranchName) {
            alert('A branch with that name already exists.');
        }
    }, [branches]);

    const handleSwitchBranch = useCallback((branchName: string) => {
        if (branches[branchName]) {
            setHead(branches[branchName]);
        }
    }, [branches]);

    const handleDeleteBranch = useCallback((branchName: string) => {
        if (window.confirm(`Are you sure you want to delete the branch "${branchName}"?`)) {
            setBranches(prev => {
                const newBranches = { ...prev };
                delete newBranches[branchName];
                return newBranches;
            });
        }
    }, []);

    const handleRenameBranch = useCallback((oldName: string, newName: string) => {
        setBranches(prev => {
            const newBranches = { ...prev };
            if (newBranches[oldName] && !newBranches[newName]) {
                newBranches[newName] = newBranches[oldName];
                delete newBranches[oldName];
            }
            return newBranches;
        });
    }, []);

    const handleConfigChange = useCallback((key: string, value: string, scope: 'local' | 'global') => {
        const setter = scope === 'local' ? setLocalConfig : setGlobalConfig;
        setter(prev => ({...prev, [key]: value }));
        // Also update the glyphs to reflect the change
        const keyGlyph = constructedGlyphs.find(g => g.optionId === 'key');
        const valueGlyph = constructedGlyphs.find(g => g.optionId === 'value');
        const scopeGlyph = constructedGlyphs.find(g => g.optionId === 'global');
        
        let updatedGlyphs = [...constructedGlyphs];
        if(keyGlyph) updatedGlyphs = updatedGlyphs.map(g => g.instanceId === keyGlyph.instanceId ? {...g, value: key} : g);
        if(valueGlyph) updatedGlyphs = updatedGlyphs.map(g => g.instanceId === valueGlyph.instanceId ? {...g, value: value} : g);

        const hasGlobalFlag = updatedGlyphs.some(g => g.optionId === 'global');
        if (scope === 'global' && !hasGlobalFlag) {
             const globalOption = selectedVerb?.options.find(o => o.id === 'global');
             if(globalOption) updatedGlyphs.push({ verbId: selectedVerb!.id, optionId: 'global', value: '', instanceId: `option-${Date.now()}` });
        } else if (scope === 'local' && hasGlobalFlag && scopeGlyph) {
            updatedGlyphs = updatedGlyphs.filter(g => g.instanceId !== scopeGlyph.instanceId);
        }
        
        setConstructedGlyphs(updatedGlyphs);
    }, [constructedGlyphs, selectedVerb]);

    const handleStage = useCallback((filePath: string) => {
        setRepoFiles(prev => prev.map(f => {
            if (f.path === filePath) {
                const newHunks = f.hunks?.map(h => ({ ...h, isStaged: true }));
                return { ...f, status: f.type === 'new' ? 'staged' : 'staged', hunks: newHunks };
            }
            return f;
        }));
    }, []);
    
    const handleUnstage = useCallback((filePath: string) => {
        setRepoFiles(prev => prev.map(f => {
            if (f.path === filePath) {
                const newHunks = f.hunks?.map(h => ({ ...h, isStaged: false }));
                return { ...f, status: 'modified', hunks: newHunks };
            }
            return f;
        }));
    }, []);

    const handleViewDiff = useCallback((file: RepoFile) => {
        setDiffTarget({ file, diffData: getDummyDiffForCommit(head) });
    }, [head]);

    const handleToggleHunkStaging = useCallback((filePath: string, hunkId: string) => {
        setRepoFiles(prev => prev.map(f => {
            if (f.path === filePath && f.hunks) {
                const newHunks = f.hunks.map(h => h.id === hunkId ? { ...h, isStaged: !h.isStaged } : h);
                const allStaged = newHunks.every(h => h.isStaged);
                const noneStaged = newHunks.every(h => !h.isStaged);
                const newStatus = allStaged ? 'staged' : (noneStaged ? 'modified' : 'partially-staged');
                return { ...f, status: newStatus, hunks: newHunks };
            }
            return f;
        }));
    }, []);

    const handleDiscardChanges = useCallback((filePath: string) => {
        if (window.confirm(`Are you sure you want to discard all changes for ${filePath}? This cannot be undone.`)) {
            setRepoFiles(prev => prev.filter(f => f.path !== filePath));
        }
    }, []);

    const handleCloseDiff = useCallback(() => setDiffTarget(null), []);

    // --- Rendering Logic ---

    const renderInteractiveView = () => {
        if (diffTarget) {
            return <DiffView file={diffTarget.file} diffData={diffTarget.diffData} onClose={handleCloseDiff} />;
        }

        switch (selectedVerb?.id) {
            case 'rebase':
                return <InteractiveRebase commits={rebaseCommits} setCommits={setRebaseCommits} />;
            case 'log':
            case 'merge':
            case 'pull':
            case 'push':
            case 'revert':
            case 'cherry-pick':
                return <CommitLogGraph
                    commits={commitHistory}
                    branches={branches}
                    remoteBranches={INITIAL_REMOTE_BRANCHES}
                    head={head}
                    showGraph={true}
                    selectedCommitId={selectedCommitId}
                    onCommitSelect={(commit) => setSelectedCommitId(commit ? commit.id : null)}
                    onCreateBranch={handleCreateBranch}
                    onSwitchBranch={handleSwitchBranch}
                    onDeleteBranch={handleDeleteBranch}
                />;
             case 'config':
                const scope = constructedGlyphs.some(g => g.optionId === 'global') ? 'global' : 'local';
                const configKey = constructedGlyphs.find(g => g.optionId === 'key')?.value || '';
                const configValue = constructedGlyphs.find(g => g.optionId === 'value')?.value || '';
                const showList = constructedGlyphs.some(g => g.optionId === 'list');
                return <ConfigView localConfig={localConfig} globalConfig={globalConfig} scope={scope} configKey={configKey} configValue={configValue} showList={showList} onConfigChange={handleConfigChange} />;
            case 'status':
                return <StatusView files={repoFiles} onStage={handleStage} onUnstage={handleUnstage} onViewDiff={handleViewDiff} onToggleHunk={handleToggleHunkStaging} onDiscard={handleDiscardChanges} />;
            case 'diff':
                const diffFile = repoFiles.find(f => f.status === 'modified');
                if (diffFile) {
                    return <DiffView file={diffFile} diffData={getDummyDiffForCommit(head)} onClose={handleCloseDiff} />;
                }
                return <p className="mt-4 text-stone-gray">No changes to diff.</p>;
            case 'blame':
                const fileName = constructedGlyphs.find(g => g.optionId === 'file')?.value || 'src/App.tsx';
                const showEmail = constructedGlyphs.some(g => g.optionId === 'e');
                return <BlameView lines={DUMMY_BLAME_DATA} showEmail={showEmail} fileName={fileName} />;
            case 'branch':
                return <BranchView branches={branches} headCommitId={head} onCreate={handleCreateBranch} onSwitch={handleSwitchBranch} onRename={handleRenameBranch} onDelete={handleDeleteBranch} />;
            case 'reflog':
                return <ReflogView entries={DUMMY_REFLOG_DATA} />;
            case 'grep':
                const pattern = constructedGlyphs.find(g => !g.optionId)?.value || 'commit';
                return <GrepView results={DUMMY_GREP_DATA} pattern={pattern} />;
            case 'bisect':
                return <BisectView status={DUMMY_BISECT_STATUS} />;
            case 'worktree':
                return <WorktreeView worktrees={DUMMY_WORKTREES} />;
            case 'remote':
                return <RemoteView remotes={DUMMY_REMOTES} />;
            case 'stash':
                 return <StashView stashes={DUMMY_STASHES} />;
            default:
                return null;
        }
    };
    
    const CommandBuilder = () => (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
            <header className="flex justify-between items-center mb-6">
                <GlyphLogo />
                <button onClick={() => setSidebarOpen(true)} className="md:hidden">
                    <MenuIcon />
                </button>
            </header>

            <div id="glyph-constructor" className="bg-paper-off-white/80 border border-deep-charcoal/10 p-4 rounded-panel shadow-panel min-h-[120px]">
                <div className="flex flex-wrap items-start">
                    {constructedGlyphs.length > 0 && constructedGlyphs.map((glyph, index) => {
                        const option = selectedVerb?.options.find(o => o.id === glyph.optionId);
                        return (
                            <GlyphComponent
                                key={glyph.instanceId}
                                prefix={index === 0 ? 'git' : (option?.flag || '')}
                                value={glyph.value}
                                placeholder={option?.placeholder || '...'}
                                option={option}
                                onValueChange={(newValue) => handleGlyphChange(glyph.instanceId, newValue)}
                                onRemove={() => handleRemoveGlyph(glyph.instanceId)}
                                isVerb={index === 0}
                            />
                        );
                    })}
                </div>
            </div>

            {selectedVerb && (
                <div className="mt-4 flex flex-wrap items-center">
                    {selectedVerb.options.map(option => (
                        <button key={option.id} onClick={() => handleAddOption(option)} className="mr-2 mb-2 text-sm font-mono bg-paper-white border border-deep-charcoal/20 px-3 py-1.5 rounded-md hover:border-burnt-gold/50 hover:text-burnt-gold transition-colors">
                            + {option.flag || option.description.split('.')[0]}
                        </button>
                    ))}
                </div>
            )}
            
            {commandString && (
                <div className="mt-6 font-mono text-sm bg-deep-charcoal text-paper-white p-4 rounded-md flex items-center justify-between">
                    <pre className="overflow-x-auto"><code>{commandString}</code></pre>
                    <div className="flex items-center space-x-4 pl-4">
                        <button onClick={handleCopyCommand}><CopyIcon copied={copied} /></button>
                        <button onClick={handleClearCommand}><TrashIcon /></button>
                    </div>
                </div>
            )}
            
            <div className="mt-8 flex-grow">
                {liveExplanation && (
                    <div className="border-l-4 border-burnt-gold/50 pl-6 py-2">
                        <h2 className="text-lg font-bold text-deep-charcoal flex items-center mb-2"><LearningIcon /> <span className="ml-2">Live Scribe</span></h2>
                        <div className="prose prose-sm text-stone-gray max-w-none">
                            {isLoadingExplanation ? <p>Thinking...</p> : <p dangerouslySetInnerHTML={{ __html: liveExplanation.replace(/\n/g, '<br />') }} />}
                        </div>
                    </div>
                )}
                 {renderInteractiveView()}
            </div>
        </div>
    );
    
    const CommandSidebar = () => (
        <aside className={`fixed md:relative inset-0 z-50 md:z-auto bg-paper-white md:bg-transparent transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-full md:w-80 border-r border-deep-charcoal/10 flex-shrink-0 flex flex-col`}>
             <div className="p-4 border-b border-deep-charcoal/10 flex justify-between items-center md:hidden">
                <h2 className="font-bold text-lg">Commands</h2>
                <button onClick={() => setSidebarOpen(false)}><CloseIcon /></button>
            </div>
            <div className="overflow-y-auto p-4 flex-grow">
                <h2 className="font-bold text-lg text-deep-charcoal mb-4 hidden md:block">Commands</h2>
                <ul>
                    {GIT_COMMANDS.map(verb => (
                        <li key={verb.id}>
                            <button
                                onClick={() => handleSelectVerb(verb)}
                                className={`w-full text-left p-3 rounded-md flex items-center space-x-4 transition-colors ${selectedVerb?.id === verb.id ? 'bg-burnt-gold/10' : 'hover:bg-deep-charcoal/5'}`}
                            >
                                <verb.icon className={`w-6 h-6 flex-shrink-0 ${selectedVerb?.id === verb.id ? 'text-burnt-gold' : 'text-deep-charcoal/80'}`} />
                                <div>
                                    <p className={`font-bold ${selectedVerb?.id === verb.id ? 'text-burnt-gold' : 'text-deep-charcoal'}`}>{verb.name}</p>
                                    <p className="text-xs text-stone-gray">{verb.description}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );

    const CommandHistory = () => (
        <aside className="w-96 bg-paper-off-white/80 border-l border-deep-charcoal/10 p-6 flex-shrink-0 flex-col hidden lg:flex">
            <div className="flex-grow">
                <h2 className="font-bold text-lg text-deep-charcoal mb-4">History</h2>
                {commandHistory.length > 0 ? (
                    <ul className="space-y-3">
                        {commandHistory.map((glyphs, i) => (
                            <li key={i} className="group font-mono text-xs bg-paper-white p-2 rounded-md border border-deep-charcoal/10 hover:border-burnt-gold/50 transition-colors">
                                <p className="truncate">{`git ${glyphs.map(g => g.value).join(' ')}`}</p>
                                <button onClick={() => handleReuseCommand(glyphs)} className="mt-1 text-burnt-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                                    <ReuseIcon /> <span>Reuse</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-stone-gray">Your past commands will appear here.</p>
                )}
            </div>

            <SagePanel />
        </aside>
    );

    const SagePanel = () => (
         <div id="sage-panel" className="border-t border-deep-charcoal/10 pt-6 mt-6">
            <h2 className="font-bold text-lg text-deep-charcoal flex items-center mb-4"><SageIcon /> <span className="ml-2">Git Sage</span></h2>
            <div className="bg-paper-white p-2 border border-deep-charcoal/10 rounded-lg h-64 flex flex-col">
                <div className="flex-grow overflow-y-auto text-sm space-y-3 p-2">
                    {sageMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <p className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-burnt-gold/20 text-deep-charcoal' : 'bg-deep-charcoal/5 text-stone-gray'}`}>
                                {msg.content}
                            </p>
                        </div>
                    ))}
                    {isSageLoading && <p className="text-stone-gray text-center animate-pulse">Sage is thinking...</p>}
                    <div ref={sageChatEndRef} />
                </div>
                <form onSubmit={handleSageSubmit} className="flex items-center p-1 border-t border-deep-charcoal/10">
                    <input
                        type="text"
                        value={sageInput}
                        onChange={(e) => setSageInput(e.target.value)}
                        placeholder="Ask about your command..."
                        className="flex-grow bg-transparent focus:outline-none text-sm p-2"
                        disabled={!ai || isSageLoading}
                    />
                    <button type="submit" disabled={!ai || isSageLoading || !sageInput.trim()} className="text-burnt-gold font-bold disabled:text-stone-gray/50 transition-colors">Send</button>
                </form>
            </div>
            {!ai && <p className="text-xs text-stone-gray mt-2 text-center">API_KEY not configured. Sage is disabled.</p>}
        </div>
    );
    
    return (
        <div className="flex h-screen bg-paper-white">
            <CommandSidebar />
            <main className="flex-1 flex min-w-0">
                <CommandBuilder />
                <CommandHistory />
            </main>
        </div>
    );
};

export default App;
