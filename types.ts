import type { ReactElement } from 'react';

export interface GitOption {
  id: string;
  flag: string;
  description: string;
  longDescription: string;
  type: 'boolean' | 'string' | 'choice';
  choices?: string[];
  placeholder?: string;
  requiresValue: boolean;
}

export interface GitVerb {
  id:string;
  name: string;
  icon: (props: { className?: string }) => ReactElement;
  description: string;
  longDescription: string;
  options: GitOption[];
}

export interface ConstructedGlyph {
  instanceId: string;
  verbId: string;
  optionId?: string; 
  value: string;
}

// New types for interactive rebase
export type RebaseAction = 'pick' | 'reword' | 'edit' | 'squash' | 'fixup' | 'drop';

export interface RebaseCommit {
    id: string;
    hash: string;
    message: string;
    action: RebaseAction;
}

// New type for the visual commit log
export interface Commit {
  id: string;
  hash: string;
  parents: string[];
  message: string;
  author: string;
  date: string;
  // Pre-calculated layout properties for visualization
  row: number;
  col: number;
}

// New type for git blame view
export interface BlameLine {
    hash: string;
    author: string;
    email: string;
    date: string;
    line: number;
    content: string;
}

// New types for repository file status
export type FileStatus = 'staged' | 'modified' | 'untracked' | 'partially-staged';

export interface RepoFile {
    path: string;
    status: FileStatus;
    type: 'new' | 'modified' | 'deleted'; // To distinguish between new files and modified files in staged/unstaged areas
    hunks?: Hunk[];
}

// New type for visual diff view
export interface DiffLine {
  type: 'added' | 'removed' | 'context';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

// New type for diff hunks
export interface Hunk {
    id: string;
    header: string;
    lines: DiffLine[];
    isStaged: boolean;
}

// New type for reflog
export interface ReflogEntry {
  id: string;
  ref: string;
  action: string;
  message: string;
}

// New type for git grep view
export interface GrepResult {
    path: string;
    lineNumber: number;
    content: string;
}

// New types for git bisect
export type BisectState = 'INACTIVE' | 'BISECTING' | 'DONE';
export interface BisectStatus {
    state: BisectState;
    start?: string;
    end?: string;
    current?: string;
    goodCommits: string[];
    badCommits: string[];
    steps?: number;
    remaining?: number;
    firstBadCommit?: string;
}

// New type for git worktree
export interface Worktree {
    path: string;
    head: string;
    branch?: string;
    isMain?: boolean;
}

// New type for git remote
export interface Remote {
    name: string;
    url: string;
}

// New type for git stash
export interface Stash {
    id: string;
    message: string;
    files: RepoFile[];
    createdAt: string;
}