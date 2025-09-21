import React from 'react';
import type { GitVerb } from '../types';

// Fix: Update component signature to accept a props object for compatibility with JSX.
const CommitIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Fix: Update component signature to accept a props object for compatibility with JSX.
const BranchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20v-6m0 0V4m0 6h4m-4 0H6" />
  </svg>
);

// Fix: Update component signature to accept a props object for compatibility with JSX.
const RebaseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Fix: Update component signature to accept a props object for compatibility with JSX.
const ResetIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.13-6.36M20 15a9 9 0 01-14.13 6.36" />
  </svg>
);

// Fix: Update component signature to accept a props object for compatibility with JSX.
const LogIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

// Fix: Update component signature to accept a props object for compatibility with JSX.
const StashIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const FetchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
);

const BlameIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h11" />
    </svg>
);

const SwitchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const CheckoutIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const RmIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ArchiveIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4v-4m-8 4h16" />
    </svg>
);

const ConfigIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AddIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const StatusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DiffIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12H3m18 0h-6" />
    </svg>
);

const CloneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const MergeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="6" cy="18" r="3" strokeWidth="2" />
        <circle cx="6" cy="6" r="3" strokeWidth="2" />
        <circle cx="18" cy="12" r="3" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18c3.5-1 6-4 6-6s-2.5-5-6-6" />
    </svg>
);

const PullIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        <circle cx="6" cy="5" r="2" strokeWidth="2" />
        <circle cx="18" cy="5" r="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7v4a2 2 0 002 2h8a2 2 0 002-2V7" />
    </svg>
);

const PushIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const RestoreIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10H3M3 10l4-4M3 10l4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 21h2a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v1" />
    </svg>
);

// --- NEW ICONS ---

const CherryPickIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12c0-2.39.86-4.68 2-6.5M4.5 6.5A5.5 5.5 0 1112 12M12 12v7a2 2 0 002 2h2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 3.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
      <circle cx="12" cy="12" r="2" strokeWidth="2" />
    </svg>
);

const CleanIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
);

const RemoteIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a4 4 0 010-5.656m5.656 0a4 4 0 010 5.656" />
      <circle cx="12" cy="12" r="2" strokeWidth="2"/>
    </svg>
);

const RevertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15l-3-3m0 0l3-3m-3 3h12a6 6 0 010 12h-3" />
    </svg>
);

const ShowIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const TagIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657l-5.657-5.657-5.657 5.657A4.978 4.978 0 012 14.535V5a2 2 0 012-2h9.536a4.978 4.978 0 013.518 1.464l5.657 5.657-5.657 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 10h.01" />
    </svg>
);

const MvIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 12h5m0 0l-2-2m2 2l-2 2" />
    </svg>
);

const ReflogIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5" />
    </svg>
);

const ShortlogIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h11M4 10h11" />
    </svg>
);

const GrepIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15h6" />
    </svg>
);

const BisectIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-4-4m0 0l4-4m-4 4h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l4 4m0 0l-4 4m4-4H4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16" />
    </svg>
);

const DescribeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 20h2" />
    </svg>
);

const WorktreeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
    </svg>
);


export const GIT_COMMANDS: GitVerb[] = [
  {
    id: 'add',
    name: 'add',
    icon: AddIcon,
    description: "Add file contents to the index.",
    longDescription: "This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit. The 'index' holds a snapshot of the content of the working tree, and it is this snapshot that is taken as the contents of the next commit.",
    options: [
        { id: 'pathspec', flag: '', description: "File(s) to add.", longDescription: "The path to the file or directory to add. Using '.' will add all changes in the current directory and subdirectories.", type: 'string' as const, placeholder: ".", requiresValue: true },
        { id: 'p', flag: '-p', description: "Interactively stage hunks.", longDescription: "Interactively choose hunks of patch between the index and the work tree and add them to the index. This gives the user a chance to review the difference before adding modified contents to the index.", type: 'boolean' as const, requiresValue: false },
        { id: 'u', flag: '-u', description: "Update tracked files.", longDescription: "Update the index just where it already has an entry. This removes as well as modifies index entries to match the working tree, but adds no new files.", type: 'boolean' as const, requiresValue: false },
        { id: 'A', flag: '-A', description: "Add all changes.", longDescription: "Stages all changes, including new, modified, and deleted files. This is equivalent to running `git add .` and `git add -u`.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'archive',
    name: 'archive',
    icon: ArchiveIcon,
    description: 'Create an archive of files from a named tree.',
    longDescription: 'Creates an archive file of the specified format containing the tree structure for the named tree, and writes it to the standard output. This is useful for creating distributable packages of a specific version of your project.',
    options: [
        { id: 'format', flag: '--format', description: 'Format of the archive.', longDescription: 'Specify the format of the archive, such as `zip` or `tar`.', type: 'choice' as const, choices: ['zip', 'tar'], requiresValue: true },
        { id: 'output', flag: '-o', description: 'Output file.', longDescription: 'Write the archive to the specified file instead of standard output.', type: 'string' as const, placeholder: 'file.zip', requiresValue: true },
        { id: 'prefix', flag: '--prefix', description: 'Prepend a path.', longDescription: 'Prepend a path to every file in the archive.', type: 'string' as const, placeholder: 'project/', requiresValue: true },
        { id: 'tree-ish', flag: '', description: 'The tree or commit to archive.', longDescription: 'The commit hash, branch name, or tag to create an archive from. Defaults to HEAD.', type: 'string' as const, placeholder: 'HEAD', requiresValue: true },
    ],
  },
  {
    id: 'bisect',
    name: 'bisect',
    icon: BisectIcon,
    description: 'Use binary search to find a commit that introduced a bug.',
    longDescription: '`git bisect` is a powerful debugging tool that finds which commit in your project’s history introduced a bug. You use it by first telling it a "bad" commit that is known to contain the bug, and a "good" commit that is known to be before the bug was introduced. Then `git bisect` picks a commit between those two endpoints and asks you whether the selected commit is "good" or "bad". It continues narrowing down the range until it finds the exact commit that introduced the change.',
    options: [
        { id: 'start', flag: 'start', description: 'Start a bisect session.', longDescription: 'Starts the bisecting process. You need to provide a bad and a good commit.', type: 'boolean' as const, requiresValue: false },
        { id: 'bad', flag: 'bad', description: 'Mark a commit as bad.', longDescription: 'Marks the current or a specified commit as containing the bug.', type: 'string' as const, placeholder: '<commit>', requiresValue: true },
        { id: 'good', flag: 'good', description: 'Mark a commit as good.', longDescription: 'Marks the current or a specified commit as not containing the bug.', type: 'string' as const, placeholder: '<commit>', requiresValue: true },
        { id: 'reset', flag: 'reset', description: 'End the bisect session.', longDescription: 'Cleans up the bisect state and returns you to the original HEAD.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'blame',
    name: 'blame',
    icon: BlameIcon,
    description: 'Show what revision and author last modified each line of a file.',
    longDescription: 'Annotates each line in the given file with information from the revision which last modified the line. This is useful for tracking down when a particular change was introduced and by whom.',
    options: [
      { id: 'file', flag: '', description: "File to blame.", longDescription: "The path to the file you want to inspect.", type: 'string' as const, placeholder: "path/to/file", requiresValue: true },
      { id: 'L', flag: '-L', description: "Line range.", longDescription: "Restrict the output to the given line range. For example, '-L 10,20' shows blame for lines 10 through 20.", type: 'string' as const, placeholder: "start,end", requiresValue: true },
      { id: 'e', flag: '-e', description: "Show email.", longDescription: "Show the author's email address instead of the name.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'branch',
    name: 'branch',
    icon: BranchIcon,
    description: 'List, create, or delete branches.',
    longDescription: 'Branches are lightweight movable pointers to commits. `git branch` lets you manage these pointers. Without arguments, it lists your local branches. You can create a new branch, delete a branch, and list all branches (including remote).',
    options: [
      { id: 'd', flag: '-d', description: 'Delete a branch.', longDescription: 'Deletes the specified branch. The branch must be fully merged in its upstream branch.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
      { id: 'D', flag: '-D', description: 'Force delete a branch.', longDescription: 'Forcibly deletes the specified branch, even if it has unmerged changes.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
      { id: 'm', flag: '-m', description: 'Move/rename a branch.', longDescription: 'Rename a branch. If a branch with the new name already exists, -M must be used to force the rename.', type: 'string' as const, placeholder: '<new-branch-name>', requiresValue: true },
      { id: 'a', flag: '-a', description: 'List all branches.', longDescription: 'List both remote-tracking branches and local branches.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'checkout',
    name: 'checkout',
    icon: CheckoutIcon,
    description: 'Switch branches or restore working tree files.',
    longDescription: 'This command has two main functions. It can switch the current HEAD to a different branch, updating the working directory to match. It can also be used to restore files in the working directory from the index or another commit.',
    options: [
      { id: 'branch', flag: '', description: 'Branch to switch to.', longDescription: 'The name of the branch to check out.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
      { id: 'b', flag: '-b', description: 'Create and switch.', longDescription: 'Create a new branch and immediately switch to it.', type: 'string' as const, placeholder: '<new-branch-name>', requiresValue: true },
      { id: 'path', flag: '--', description: 'Restore file(s).', longDescription: 'Restore the specified file or directory in the working tree to its state from the index.', type: 'string' as const, placeholder: '<file-path>', requiresValue: true },
    ],
  },
  {
    id: 'cherry-pick',
    name: 'cherry-pick',
    icon: CherryPickIcon,
    description: 'Apply the changes introduced by some existing commits.',
    longDescription: 'Given one or more existing commits, apply the change that each one introduces, recording a new commit for each. This is useful for undoing changes on a branch or applying a specific bug fix from another branch without merging the entire branch.',
    options: [
        { id: 'commit', flag: '', description: 'Commit to apply.', longDescription: 'The commit hash to apply to the current branch.', type: 'string' as const, placeholder: '<commit-hash>', requiresValue: true },
        { id: 'n', flag: '-n', description: 'No commit.', longDescription: 'Apply the changes but do not create a new commit. The changes will be staged.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'clean',
    name: 'clean',
    icon: CleanIcon,
    description: 'Remove untracked files from the working tree.',
    longDescription: 'Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.',
    options: [
        { id: 'd', flag: '-d', description: 'Remove directories.', longDescription: 'In addition to untracked files, remove untracked directories.', type: 'boolean' as const, requiresValue: false },
        { id: 'f', flag: '-f', description: 'Force deletion.', longDescription: 'Required to proceed with the deletion if the git configuration `clean.requireForce` is not set to false.', type: 'boolean' as const, requiresValue: false },
        { id: 'n', flag: '-n', description: 'Dry run.', longDescription: "Don't actually remove anything, just show what would be done.", type: 'boolean' as const, requiresValue: false },
        { id: 'x', flag: '-x', description: 'Remove ignored files.', longDescription: "Don't use the standard ignore rules. This will also remove files that are usually ignored by git.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'clone',
    name: 'clone',
    icon: CloneIcon,
    description: 'Clone a repository into a new directory.',
    longDescription: 'Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned repository, and checks out an initial branch that is forked from the cloned repository\'s currently active branch.',
    options: [
        { id: 'repo', flag: '', description: 'Repository URL.', longDescription: 'The URL of the repository to clone (e.g., https://github.com/user/repo.git).', type: 'string' as const, placeholder: '<repository-url>', requiresValue: true },
        { id: 'directory', flag: '', description: 'Directory name.', longDescription: 'The name of the new directory to clone into. Defaults to the repository name.', type: 'string' as const, placeholder: '<directory>', requiresValue: true },
        { id: 'b', flag: '-b', description: 'Specific branch.', longDescription: 'Instead of pointing the newly created HEAD to the branch pointed to by the cloned repository\'s HEAD, point to this branch instead.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
        { id: 'depth', flag: '--depth', description: 'Shallow clone.', longDescription: 'Create a shallow clone with a history truncated to the specified number of commits.', type: 'string' as const, placeholder: '<depth>', requiresValue: true },
    ],
  },
  {
    id: 'commit',
    name: 'commit',
    icon: CommitIcon,
    description: 'Record changes to the repository.',
    longDescription: "The 'commit' command saves your staged changes. It's like creating a snapshot of your repository at a specific point in time. Each commit has a unique ID and a message describing the changes.",
    options: [
      { id: 'amend', flag: '--amend', description: "Amend the previous commit.", longDescription: "The '--amend' flag modifies the most recent commit. You can change its message or add/remove files from it. Use with caution on shared branches.", type: 'boolean' as const, requiresValue: false },
      { id: 'a', flag: '-a', description: "Stage and commit all.", longDescription: "Automatically stage all modified and deleted files (but not new files) before committing.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'config',
    name: 'config',
    icon: ConfigIcon,
    description: 'Get and set repository or global options.',
    longDescription: 'You can query/set/replace/unset configuration options with this command. The name is a dot-separated key (e.g., `user.name`). The configuration can be applied locally to the current repository or globally to the user account.',
    options: [
      { id: 'global', flag: '--global', description: "Use global config file.", longDescription: "For writing options: write to global ~/.gitconfig file rather than the repository .git/config.", type: 'boolean' as const, requiresValue: false },
      { id: 'list', flag: '--list', description: "List all variables.", longDescription: "List all variables set in the configuration file, along with their values.", type: 'boolean' as const, requiresValue: false },
      { id: 'key', flag: '', description: "Config key.", longDescription: "The configuration key to get, set, or unset (e.g. user.name).", type: 'string' as const, placeholder: "section.key", requiresValue: true },
      { id: 'value', flag: '', description: "Config value.", longDescription: "The value to set for the given key.", type: 'string' as const, placeholder: "value", requiresValue: true },
    ],
  },
  {
    id: 'describe',
    name: 'describe',
    icon: DescribeIcon,
    description: 'Give an object a human-readable name based on an available ref.',
    longDescription: 'The command finds the most recent tag that is reachable from a commit. If the tag points to the commit, then only the tag is shown. Otherwise, it suffixes the tag name with the number of additional commits on top of the tagged object and the abbreviated object name of the most recent commit.',
    options: [
        { id: 'tags', flag: '--tags', description: 'Use any tag.', longDescription: 'Instead of only using annotated tags, use any tag found in refs/tags.', type: 'boolean' as const, requiresValue: false },
        { id: 'all', flag: '--all', description: 'Use any ref.', longDescription: 'Instead of only using tags, use any ref found in refs/.', type: 'boolean' as const, requiresValue: false },
        { id: 'commit-ish', flag: '', description: 'Commit to describe.', longDescription: 'The commit-ish object to describe. Defaults to HEAD.', type: 'string' as const, placeholder: 'HEAD', requiresValue: true },
    ],
  },
  {
    id: 'diff',
    name: 'diff',
    icon: DiffIcon,
    description: 'Show changes between commits, commit and working tree, etc.',
    longDescription: 'This command shows the differences between various states in your Git repository. It can compare the working directory to the staging area (index), the staging area to the last commit, two different commits, and more.',
    options: [
        { id: 'staged', flag: '--staged', description: 'Show staged changes.', longDescription: 'Show differences between the staging area (index) and the last commit (HEAD).', type: 'boolean' as const, requiresValue: false },
        { id: 'file', flag: '--', description: 'Limit to a file.', longDescription: 'Show differences for a specific file path.', type: 'string' as const, placeholder: '<file-path>', requiresValue: true },
        { id: 'commit', flag: '', description: 'Compare with a commit.', longDescription: 'Show differences between the working directory and the specified commit.', type: 'string' as const, placeholder: '<commit>', requiresValue: true },
    ],
  },
  {
    id: 'fetch',
    name: 'fetch',
    icon: FetchIcon,
    description: 'Download objects and refs from another repository.',
    longDescription: 'Fetch branches and/or tags from one or more other repositories, along with the objects necessary to complete their histories. Remote-tracking branches are updated. This does NOT merge the changes into your local branches.',
    options: [
      { id: 'prune', flag: '--prune', description: 'Prune stale branches.', longDescription: 'Before fetching, remove any remote-tracking references that no longer exist on the remote.', type: 'boolean' as const, requiresValue: false },
      { id: 'all', flag: '--all', description: 'Fetch all remotes.', longDescription: 'Fetch from all remotes defined in your configuration.', type: 'boolean' as const, requiresValue: false },
      { id: 'repository', flag: '', description: 'Remote to fetch from.', longDescription: 'The remote repository to fetch from (e.g., origin).', type: 'string' as const, placeholder: 'origin', requiresValue: true },
    ],
  },
  {
    id: 'grep',
    name: 'grep',
    icon: GrepIcon,
    description: 'Print lines matching a pattern.',
    longDescription: 'Look for specified patterns in the tracked files in the working tree, blobs registered in the index file, or blobs in given tree objects.',
    options: [
        { id: 'pattern', flag: '', description: 'Pattern to search for.', longDescription: 'The pattern to search for. Can be a simple string or a regular expression.', type: 'string' as const, placeholder: 'pattern', requiresValue: true },
        { id: 'i', flag: '-i', description: 'Ignore case.', longDescription: 'Perform a case-insensitive search.', type: 'boolean' as const, requiresValue: false },
        { id: 'n', flag: '-n', description: 'Show line numbers.', longDescription: 'Prefix the line number to the matching lines.', type: 'boolean' as const, requiresValue: false },
        { id: 'I', flag: '-I', description: 'Ignore binary files.', longDescription: "Don't match the pattern in binary files.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'log',
    name: 'log',
    icon: LogIcon,
    description: 'Show commit logs.',
    longDescription: 'Shows the commit logs. This command can be customized to show a range of information about the commit history in various formats.',
    options: [
      { id: 'graph', flag: '--graph', description: 'Draw a text-based graphical representation of the commit history.', longDescription: 'This option provides a visual representation of branches and merges in the commit log.', type: 'boolean' as const, requiresValue: false },
      { id: 'oneline', flag: '--oneline', description: 'Show each commit as a single line.', longDescription: 'This is a shorthand for `--pretty=oneline --abbrev-commit` used together.', type: 'boolean' as const, requiresValue: false },
      { id: 'author', flag: '--author', description: 'Filter by author.', longDescription: 'Limit the commits output to ones with author header lines that match the specified pattern.', type: 'string' as const, placeholder: '<pattern>', requiresValue: true },
      { id: 'all', flag: '--all', description: 'Show all branches.', longDescription: 'Pretend as if all the refs in `refs/` are listed on the command line as `<commit>`.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'merge',
    name: 'merge',
    icon: MergeIcon,
    description: 'Join two or more development histories together.',
    longDescription: 'Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch. This is most often used to combine two branches.',
    options: [
        { id: 'branch', flag: '', description: 'Branch to merge.', longDescription: 'The name of the branch to merge into the current branch.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
        { id: 'ff-only', flag: '--ff-only', description: 'Fast-forward only.', longDescription: 'Refuse to merge and exit with a non-zero status unless the current HEAD is already up to date or the merge can be resolved as a fast-forward.', type: 'boolean' as const, requiresValue: false },
        { id: 'no-ff', flag: '--no-ff', description: 'No fast-forward.', longDescription: 'Create a merge commit even when the merge could be resolved as a fast-forward.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'mv',
    name: 'mv',
    icon: MvIcon,
    description: 'Move or rename a file, a directory, or a symlink.',
    longDescription: 'Renames a file or directory in the working tree and stages the change. It is equivalent to moving the file on the filesystem and then running `git add` for the new path and `git rm` for the old path.',
    options: [
        { id: 'source', flag: '', description: 'Source file/directory.', longDescription: 'The current path of the file or directory to be renamed.', type: 'string' as const, placeholder: '<source>', requiresValue: true },
        { id: 'destination', flag: '', description: 'Destination file/directory.', longDescription: 'The new path for the file or directory.', type: 'string' as const, placeholder: '<destination>', requiresValue: true },
    ],
  },
  {
    id: 'pull',
    name: 'pull',
    icon: PullIcon,
    description: 'Fetch from and integrate with another repository or a local branch.',
    longDescription: 'In its default mode, `git pull` is shorthand for `git fetch` followed by `git merge FETCH_HEAD`. More precisely, `git pull` runs `git fetch` with the given parameters and calls `git merge` to merge the retrieved branch heads into the current branch.',
    options: [
        { id: 'rebase', flag: '--rebase', description: 'Rebase instead of merge.', longDescription: 'When true, rebase the current branch on top of the upstream branch after fetching.', type: 'boolean' as const, requiresValue: false },
        { id: 'ff-only', flag: '--ff-only', description: 'Fast-forward only.', longDescription: 'Only update the branch pointer if the merge can be resolved as a fast-forward.', type: 'boolean' as const, requiresValue: false },
        { id: 'remote', flag: '', description: 'Remote to pull from.', longDescription: 'The remote repository to pull from (e.g., origin).', type: 'string' as const, placeholder: 'origin', requiresValue: true },
        { id: 'branch', flag: '', description: 'Branch to pull.', longDescription: 'The branch on the remote to pull.', type: 'string' as const, placeholder: 'main', requiresValue: true },
    ],
  },
  {
    id: 'push',
    name: 'push',
    icon: PushIcon,
    description: 'Update remote refs along with associated objects.',
    longDescription: 'Updates remote refs using local refs, while sending objects necessary to complete the given refs. This command is used to upload local repository content to a remote repository.',
    options: [
        { id: 'force', flag: '--force', description: 'Force push.', longDescription: 'Usually, the command refuses to update a remote ref that is not an ancestor of the local ref used to overwrite it. This flag disables the check. Use with extreme caution.', type: 'boolean' as const, requiresValue: false },
        { id: 'tags', flag: '--tags', description: 'Push all tags.', longDescription: 'All tags under refs/tags are pushed, in addition to refspecs explicitly listed on the command line.', type: 'boolean' as const, requiresValue: false },
        { id: 'remote', flag: '', description: 'Remote to push to.', longDescription: 'The remote repository to push to (e.g., origin).', type: 'string' as const, placeholder: 'origin', requiresValue: true },
        { id: 'branch', flag: '', description: 'Branch to push.', longDescription: 'The local branch to push to the remote.', type: 'string' as const, placeholder: 'main', requiresValue: true },
    ],
  },
  {
    id: 'rebase',
    name: 'rebase',
    icon: RebaseIcon,
    description: 'Reapply commits on top of another base tip.',
    longDescription: 'Rebasing is the process of moving or combining a sequence of commits to a new base commit. It is a powerful way to rewrite history and maintain a linear project history.',
    options: [
      { id: 'i', flag: '-i', description: 'Interactive.', longDescription: 'Start an interactive rebase session, which allows you to edit, reword, squash, or drop commits.', type: 'boolean' as const, requiresValue: false },
      { id: 'base', flag: '', description: 'Upstream branch or commit.', longDescription: 'The branch or commit to rebase onto. This can be a branch name, a commit hash, or a relative reference like HEAD~3.', type: 'string' as const, placeholder: 'main or HEAD~3', requiresValue: true },
    ],
  },
  {
    id: 'reflog',
    name: 'reflog',
    icon: ReflogIcon,
    description: 'Manage reflog information.',
    longDescription: 'Reference logs, or "reflogs", record when the tips of branches and other references were updated in the local repository. Reflog is a safety net; it tracks every change to the HEAD, allowing you to go back to states that may otherwise seem lost.',
    options: [],
  },
  {
    id: 'remote',
    name: 'remote',
    icon: RemoteIcon,
    description: 'Manage set of tracked repositories.',
    longDescription: 'Manage the set of repositories ("remotes") whose branches you track.',
    options: [
        { id: 'v', flag: '-v', description: 'Verbose.', longDescription: 'Be a little more verbose and show the remote URL after the name.', type: 'boolean' as const, requiresValue: false },
        { id: 'add', flag: 'add', description: 'Add a new remote.', longDescription: 'Adds a remote named <name> for the repository at <url>.', type: 'string' as const, placeholder: '<name> <url>', requiresValue: true },
        { id: 'remove', flag: 'remove', description: 'Remove a remote.', longDescription: 'Removes the remote named <name>.', type: 'string' as const, placeholder: '<name>', requiresValue: true },
    ],
  },
  {
    id: 'reset',
    name: 'reset',
    icon: ResetIcon,
    description: 'Reset current HEAD to the specified state.',
    longDescription: 'This command resets the current branch head to a specified commit and optionally updates the index and the working directory. It is a powerful command for undoing changes.',
    options: [
      { id: 'mode', flag: '', description: 'Reset mode.', longDescription: '`--soft`: un-commits changes, leaving them staged. `--mixed` (default): un-commits and un-stages changes. `--hard`: un-commits and deletes changes.', type: 'choice' as const, choices: ['--soft', '--mixed', '--hard'], requiresValue: true },
      { id: 'commit-ref', flag: '', description: 'Commit reference.', longDescription: 'The commit to reset to. Can be a hash or a relative reference like HEAD~1.', type: 'string' as const, placeholder: 'HEAD~1', requiresValue: true },
    ],
  },
  {
    id: 'restore',
    name: 'restore',
    icon: RestoreIcon,
    description: 'Restore working tree files.',
    longDescription: 'Restore specified paths in the working tree with some contents from a restore source. If a path is tracked but does not exist in the restore source, it will be removed to match the source.',
    options: [
        { id: 'file', flag: '', description: 'File(s) to restore.', longDescription: 'The path to the file or directory to restore from the index.', type: 'string' as const, placeholder: '<file-path>', requiresValue: true },
        { id: 'staged', flag: '--staged', description: 'Unstage a file.', longDescription: 'Restores the content of the index from HEAD, effectively unstaging the file without changing the working directory.', type: 'boolean' as const, requiresValue: false },
        { id: 'source', flag: '--source', description: 'Source commit.', longDescription: 'Restore files from a specific commit instead of the index.', type: 'string' as const, placeholder: '<commit>', requiresValue: true },
    ],
  },
  {
    id: 'revert',
    name: 'revert',
    icon: RevertIcon,
    description: 'Revert some existing commits.',
    longDescription: 'Given one or more existing commits, revert the changes that the related patches introduce, and record some new commits that record them. This is a safe way to undo changes, as it does not rewrite history.',
    options: [
        { id: 'commit', flag: '', description: 'Commit to revert.', longDescription: 'The commit hash to revert.', type: 'string' as const, placeholder: '<commit-hash>', requiresValue: true },
        { id: 'no-edit', flag: '--no-edit', description: 'Do not edit message.', longDescription: 'Use the auto-generated commit message without launching an editor.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'rm',
    name: 'rm',
    icon: RmIcon,
    description: 'Remove files from the working tree and from the index.',
    longDescription: 'Removes files from the index, or from the working tree and the index. `git rm` will not remove a file from just your working directory.',
    options: [
      { id: 'file', flag: '', description: "File(s) to remove.", longDescription: "The path to the file or directory to remove.", type: 'string' as const, placeholder: "path/to/file", requiresValue: true },
      { id: 'cached', flag: '--cached', description: "Unstage only.", longDescription: "Use this option to unstage and remove paths only from the index. Working tree files, whether modified or not, will be left alone.", type: 'boolean' as const, requiresValue: false },
      { id: 'f', flag: '-f', description: "Force removal.", longDescription: "Override the up-to-date check, which prevents removal of files that have modifications in the working directory that are not in the index.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'show',
    name: 'show',
    icon: ShowIcon,
    description: 'Show various types of objects.',
    longDescription: 'Shows one or more objects (blobs, trees, tags and commits). For commits, it shows the log message and a diff of the changes.',
    options: [
        { id: 'object', flag: '', description: 'Object to show.', longDescription: 'The name of the object to show (e.g., a commit hash, tag, or branch name). Defaults to HEAD.', type: 'string' as const, placeholder: 'HEAD', requiresValue: true },
    ],
  },
  {
    id: 'shortlog',
    name: 'shortlog',
    icon: ShortlogIcon,
    description: 'Summarize `git log` output.',
    longDescription: 'Summarizes `git log` output in a format suitable for release announcements. It groups commits by author and displays the first line of each commit message.',
    options: [
        { id: 'n', flag: '-n', description: 'Sort by number.', longDescription: 'Sort output according to the number of commits per author instead of author name.', type: 'boolean' as const, requiresValue: false },
        { id: 's', flag: '-s', description: 'Suppress commit descriptions.', longDescription: 'Suppress commit descriptions and only provide a commit count per author.', type: 'boolean' as const, requiresValue: false },
        { id: 'e', flag: '-e', description: 'Show email.', longDescription: "Show the author's email address.", type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'stash',
    name: 'stash',
    icon: StashIcon,
    description: 'Stash the changes in a dirty working directory away.',
    longDescription: 'Use `git stash` when you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the `HEAD` commit.',
    options: [
      { id: 'list', flag: 'list', description: 'List stashes.', longDescription: 'List the stashes that you currently have.', type: 'boolean' as const, requiresValue: false },
      { id: 'apply', flag: 'apply', description: 'Apply a stash.', longDescription: 'Apply the changes recorded in a stash to your working directory.', type: 'boolean' as const, requiresValue: false },
      { id: 'pop', flag: 'pop', description: 'Apply and drop a stash.', longDescription: 'Apply the stash and then immediately drop it from the stash list.', type: 'boolean' as const, requiresValue: false },
      { id: 'drop', flag: 'drop', description: 'Drop a stash.', longDescription: 'Remove a single stash from the list.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'status',
    name: 'status',
    icon: StatusIcon,
    description: 'Show the working tree status.',
    longDescription: 'Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git.',
    options: [
        { id: 's', flag: '-s', description: 'Short format.', longDescription: 'Give the output in the short-format.', type: 'boolean' as const, requiresValue: false },
        { id: 'b', flag: '-b', description: 'Show branch.', longDescription: 'Show the branch and tracking info.', type: 'boolean' as const, requiresValue: false },
    ],
  },
  {
    id: 'switch',
    name: 'switch',
    icon: SwitchIcon,
    description: 'Switch branches.',
    longDescription: 'A more modern and clearer alternative to `git checkout <branch>`. Switches the current working branch to the specified branch.',
    options: [
      { id: 'branch', flag: '', description: 'Branch to switch to.', longDescription: 'The name of the branch to switch to.', type: 'string' as const, placeholder: '<branch-name>', requiresValue: true },
      { id: 'c', flag: '-c', description: 'Create and switch.', longDescription: 'Create a new branch and immediately switch to it.', type: 'string' as const, placeholder: '<new-branch-name>', requiresValue: true },
      { id: 'detached', flag: '--detach', description: 'Detached HEAD.', longDescription: 'Switch to a commit instead of a branch, putting you in a "detached HEAD" state.', type: 'string' as const, placeholder: '<commit>', requiresValue: true },
    ],
  },
  {
    id: 'tag',
    name: 'tag',
    icon: TagIcon,
    description: 'Create, list, delete or verify a tag object signed with GPG.',
    longDescription: 'Tags are used to mark specific points in a repository’s history as being important, typically for releases. There are two main types: lightweight tags and annotated tags.',
    options: [
        { id: 'a', flag: '-a', description: 'Annotated tag.', longDescription: 'Make an unsigned, annotated tag object.', type: 'string' as const, placeholder: '<tag-name>', requiresValue: true },
        { id: 'd', flag: '-d', description: 'Delete tag.', longDescription: 'Delete an existing tag.', type: 'string' as const, placeholder: '<tag-name>', requiresValue: true },
        { id: 'l', flag: '-l', description: 'List tags.', longDescription: 'List all tags.', type: 'boolean' as const, requiresValue: false },
        { id: 'commit', flag: '', description: 'Commit to tag.', longDescription: 'Specify the commit to tag. Defaults to HEAD.', type: 'string' as const, placeholder: 'HEAD', requiresValue: true },
    ],
  },
  {
    id: 'worktree',
    name: 'worktree',
    icon: WorktreeIcon,
    description: 'Manage multiple working trees.',
    longDescription: 'Allows you to have multiple working trees attached to the same repository, letting you check out more than one branch at a time. This is useful for working on a hotfix on one branch while continuing development on another.',
    options: [
        { id: 'add', flag: 'add', description: 'Add a worktree.', longDescription: 'Create a new worktree at the specified path for a given branch.', type: 'string' as const, placeholder: '<path> <branch>', requiresValue: true },
        { id: 'list', flag: 'list', description: 'List worktrees.', longDescription: 'List all worktrees associated with the repository.', type: 'boolean' as const, requiresValue: false },
        { id: 'remove', flag: 'remove', description: 'Remove a worktree.', longDescription: 'Remove the worktree at the specified path.', type: 'string' as const, placeholder: '<path>', requiresValue: true },
        { id: 'prune', flag: 'prune', description: 'Prune worktrees.', longDescription: 'Remove worktree information for paths that no longer exist on the filesystem.', type: 'boolean' as const, requiresValue: false },
    ],
  },
].sort((a, b) => a.name.localeCompare(b.name));
