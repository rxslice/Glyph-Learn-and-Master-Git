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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l-4-4m0 0l4-4m-4 4h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10l4 4m0 0l-4 4m4-4H4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16" />
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
    </svg>
);


export const GIT_COMMANDS: GitVerb[] = [
  {
    id: 'add',
    name: 'add',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: AddIcon,
    description: "Add file contents to the index.",
    longDescription: "This command updates the index using the current content found in the working tree, to prepare the content staged for the next commit. The 'index' holds a snapshot of the content of the working tree, and it is this snapshot that is taken as the contents of the next commit.",
    options: [
        // Fix: Explicitly set the type to 'string' literal to prevent incorrect type widening by TypeScript.
        { id: 'pathspec', flag: '', description: "File(s) to add.", longDescription: "The path to the file or directory to add. Using '.' will add all changes in the current directory and subdirectories.", type: 'string' as const, placeholder: ".", requiresValue: true },
        { id: 'p', flag: '-p', description: "Interactively stage hunks.", longDescription: "Interactively choose hunks of patch between the working tree and the index and add them to the index. This gives you finer control over what gets committed.", type: 'boolean' as const, requiresValue: false },
        { id: 'u', flag: '-u', description: "Update tracked files.", longDescription: "Update only files that Git already knows about. This will not stage new (untracked) files.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'archive',
    name: 'archive',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: ArchiveIcon,
    description: "Create an archive of files from a named tree.",
    longDescription: "Creates an archive file (e.g., zip, tar) containing the constituent files of a single tree from the repository. The archive is created from a specified commit or branch.",
    options: [
        { id: 'tree-ish', flag: '', description: "The tree or commit to archive.", longDescription: "The branch, tag, or commit hash to create the archive from. For example, 'main' or 'v1.2.0'.", type: 'string' as const, placeholder: "main", requiresValue: true },
        { id: 'format', flag: '--format', description: "Archive format.", longDescription: "Specifies the format of the archive, such as 'zip' or 'tar'. If not specified, it's inferred from the output filename.", type: 'string' as const, placeholder: "zip", requiresValue: true },
        { id: 'output', flag: '-o', description: "Output file.", longDescription: "Write the archive to the specified file instead of stdout.", type: 'string' as const, placeholder: "project.zip", requiresValue: true },
        { id: 'prefix', flag: '--prefix', description: "Prepend a path prefix.", longDescription: "Prepend the specified prefix to each file in the archive. For example, 'my-project/'.", type: 'string' as const, placeholder: "project-v1/", requiresValue: true },
    ]
  },
  {
    id: 'bisect',
    name: 'bisect',
    icon: BisectIcon,
    description: "Use binary search to find the commit that introduced a bug.",
    longDescription: "Git bisect is a powerful debugging tool that performs a binary search through your commit history to find a specific commit that introduced a regression. You start by telling it a 'bad' commit where the bug exists and a 'good' commit where it doesn't. Git then repeatedly checks out a commit halfway between them and asks you whether the bug exists there.",
    options: [
        { id: 'start', flag: 'start', description: "Start a bisect session.", longDescription: "Starts the bisect process. You must provide a 'bad' and 'good' commit reference after this.", type: 'boolean' as const, requiresValue: false },
        { id: 'bad', flag: 'bad', description: "Mark a commit as bad.", longDescription: "Identifies a commit where the bug or regression is present.", type: 'string' as const, placeholder: "commit-hash", requiresValue: true },
        { id: 'good', flag: 'good', description: "Mark a commit as good.", longDescription: "Identifies a commit where the bug or regression is not present.", type: 'string' as const, placeholder: "commit-hash", requiresValue: true },
        { id: 'reset', flag: 'reset', description: "End the bisect session.", longDescription: "Cleans up the bisect state and returns you to your original HEAD.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'blame',
    name: 'blame',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: BlameIcon,
    description: "Show what revision and author last modified each line of a file.",
    longDescription: "The 'blame' command annotates each line in the given file with information from the revision which last changed the line. This is used to examine the history of specific lines of a file.",
    options: [
        { id: 'file', flag: '', description: "The file to annotate.", longDescription: "The path to the file you want to inspect.", type: 'string' as const, placeholder: "path/to/file.js", requiresValue: true },
        { id: 'L', flag: '-L', description: "Annotate a line range.", longDescription: "Restricts the output to the specified line range. The format is '<start>,<end>' or ':<funcname>'.", type: 'string' as const, placeholder: "10,20", requiresValue: true },
        { id: 'e', flag: '-e', description: "Show author email.", longDescription: "Shows the author's email address instead of their name in the blame output.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'branch',
    name: 'branch',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: BranchIcon,
    description: "List, create, or delete branches.",
    longDescription: "Branches are pointers to specific commits. The 'branch' command lets you manage these pointers. They are a core part of Git, allowing for parallel development.",
    options: [
        { id: 'create-branch-name', flag: '', description: "New branch name.", longDescription: "Providing a name creates a new branch. By default, it's created from the current HEAD commit.", type: 'string' as const, placeholder: "new-feature", requiresValue: true },
        { id: 'start-point', flag: '', description: "Set start-point for new branch.", longDescription: "Specifies the commit a new branch should be created from. If omitted, it defaults to HEAD.", type: 'string' as const, placeholder: "commit-hash", requiresValue: true },
        { id: 'd', flag: '-d', description: "Delete a branch.", longDescription: "The '-d' flag deletes the specified branch. It will prevent deletion if the branch has unmerged changes.", type: 'string' as const, placeholder: "branch-to-delete", requiresValue: true },
        { id: 'D', flag: '-D', description: "Force delete a branch.", longDescription: "The '-D' flag is a shortcut for '--delete --force'. It deletes the branch regardless of its merge status.", type: 'string' as const, placeholder: "branch-to-force-delete", requiresValue: true },
        { id: 'm-branch', flag: '-m', description: "Rename a branch.", longDescription: "The '-m' flag renames a branch. If you are on the branch you want to rename, you can omit the old branch name.", type: 'string' as const, placeholder: "new-branch-name", requiresValue: true },
    ]
  },
  {
    id: 'checkout',
    name: 'checkout',
    icon: CheckoutIcon,
    description: "Switch branches or restore working tree files.",
    longDescription: "A versatile command that switches branches or restores working tree files. It is one of the most frequently used Git commands, allowing you to navigate between different versions of your project and manage your working directory.",
    options: [
      { id: 'branch', flag: '', description: "Branch to switch to.", longDescription: "The name of an existing branch you want to check out.", type: 'string' as const, placeholder: "branch-name", requiresValue: true },
      { id: 'b', flag: '-b', description: "Create and switch to a new branch.", longDescription: "Creates a new branch with the given name and then switches to it.", type: 'string' as const, placeholder: "new-branch-name", requiresValue: true },
      { id: 'start-point', flag: '', description: "Start point for the new branch.", longDescription: "Specifies the commit a new branch should be created from when using -b. If omitted, it defaults to HEAD.", type: 'string' as const, placeholder: "main", requiresValue: true },
      { id: 'pathspec', flag: '--', description: "File(s) to restore.", longDescription: "Discards changes in the working directory. The '--' is used to separate branch names from file paths.", type: 'string' as const, placeholder: "path/to/file.js", requiresValue: true },
    ]
  },
  {
    id: 'cherry-pick',
    name: 'cherry-pick',
    icon: CherryPickIcon,
    description: "Apply the changes from existing commits.",
    longDescription: "Given one or more existing commits, apply the change that each one introduces, recording a new commit for each. This is useful for picking a specific commit from one branch and applying it to another.",
    options: [
        { id: 'commit', flag: '', description: "Commit to cherry-pick.", longDescription: "The commit hash to apply to the current branch.", type: 'string' as const, placeholder: "commit-hash", requiresValue: true },
        { id: 'no-commit', flag: '--no-commit', description: "Apply changes without committing.", longDescription: "Applies the changes to your working directory and staging area, but does not create a new commit.", type: 'boolean' as const, requiresValue: false },
        { id: 'edit', flag: '-e', description: "Edit the commit message.", longDescription: "Allows you to edit the commit message of the cherry-picked commit before it is applied.", type: 'boolean' as const, requiresValue: false },
        { id: 'abort', flag: '--abort', description: "Abort the operation.", longDescription: "Cancels the cherry-pick operation and returns your branch to its previous state.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'clean',
    name: 'clean',
    icon: CleanIcon,
    description: "Remove untracked files from the working tree.",
    longDescription: "Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.",
    options: [
        { id: 'n', flag: '-n', description: "Dry run.", longDescription: "Show what would be done, without actually removing any files.", type: 'boolean' as const, requiresValue: false },
        { id: 'f', flag: '-f', description: "Force deletion.", longDescription: "Required to actually delete the files. If not specified, git clean will not remove anything.", type: 'boolean' as const, requiresValue: false },
        { id: 'd', flag: '-d', description: "Remove directories.", longDescription: "Removes untracked directories in addition to untracked files.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'clone',
    name: 'clone',
    icon: CloneIcon,
    description: "Clone a repository into a new directory.",
    longDescription: "Clones a repository from a URL into a newly created directory. This is typically the first command you'll use when starting to work on an existing project.",
    options: [
      { id: 'repository', flag: '', description: "Repository URL.", longDescription: "The URL of the remote repository to clone (e.g., 'https://github.com/user/repo.git').", type: 'string' as const, placeholder: "https://github.com/user/repo.git", requiresValue: true },
      { id: 'directory', flag: '', description: "Local directory name.", longDescription: "The name of the directory to clone into on your local machine. If omitted, it's derived from the repository name.", type: 'string' as const, placeholder: "my-project", requiresValue: true },
      { id: 'b', flag: '-b', description: "Checkout specific branch.", longDescription: "Instead of pointing the newly created HEAD to the branch pointed to by the cloned repository's HEAD, point to this branch instead.", type: 'string' as const, placeholder: "branch-name", requiresValue: true },
      { id: 'depth', flag: '--depth', description: "Create a shallow clone.", longDescription: "Creates a 'shallow' clone with a history truncated to the specified number of commits. This can be much faster for large repositories.", type: 'string' as const, placeholder: "1", requiresValue: true },
    ]
  },
  {
    id: 'commit',
    name: 'commit',
    icon: CommitIcon,
    description: "Record changes to the repository.",
    longDescription: "The 'commit' command saves your staged changes. It's like creating a snapshot of your repository at a specific point in time. Each commit has a unique ID and a message describing the changes.",
    options: [
      { id: 'amend', flag: '--amend', description: "Amend the previous commit.", longDescription: "The '--amend' flag modifies the most recent commit. You can change its message or add/remove files from it. Use with caution on shared branches.", type: 'boolean' as const, requiresValue: false },
      { id: 'no-edit', flag: '--no-edit', description: "Use selected commit message without launching an editor.", longDescription: "Used with '--amend', this flag amends a commit without changing its commit message.", type: 'boolean' as const, requiresValue: false },
      { id: 'a', flag: '-a', description: "Stage all tracked, modified files.", longDescription: "The '-a' flag automatically stages every file that is already tracked by Git and then commits them. It does not stage new (untracked) files.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'config',
    name: 'config',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: ConfigIcon,
    description: "Get and set repository or global options.",
    longDescription: "Used to query or set configuration options for Git. These can be for a specific repository (local) or for your user account (global). Common settings include user name and email.",
    options: [
        { id: 'key', flag: '', description: "The configuration key.", longDescription: "The name of the configuration variable you want to read or write (e.g., 'user.name').", type: 'string' as const, placeholder: "user.name", requiresValue: true },
        { id: 'value', flag: '', description: "The new value for the key.", longDescription: "The value to set for the configuration key. If omitted, the command will show the current value for the key.", type: 'string' as const, placeholder: '"Your Name"', requiresValue: true },
        { id: 'global', flag: '--global', description: "Use global configuration.", longDescription: "Applies the configuration to the global ~/.gitconfig file, affecting all of your repositories.", type: 'boolean' as const, requiresValue: false },
        { id: 'list', flag: '--list', description: "List all variables.", longDescription: "Lists all configuration variables for the current scope (local or global).", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'describe',
    name: 'describe',
    icon: DescribeIcon,
    description: "Give an object a human-readable name based on an available ref.",
    longDescription: "This command finds the most recent tag that is reachable from a commit. If the tag points to the commit, then only the tag is shown. If the tag points to an ancestor of the commit, the output will be <tag>-<number-of-commits>-g<short-hash>.",
    options: [
        { id: 'commit-ish', flag: '', description: "Commit-ish to describe.", longDescription: "The commit-ish object to describe. Defaults to HEAD if not specified.", type: 'string' as const, placeholder: "HEAD", requiresValue: true },
        { id: 'tags', flag: '--tags', description: "Use tags for describing.", longDescription: "Instead of using only annotated tags, use any tag found in refs/tags.", type: 'boolean' as const, requiresValue: false },
        { id: 'all', flag: '--all', description: "Use all refs.", longDescription: "Instead of using only the annotated tags, use any ref found in refs/.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'diff',
    name: 'diff',
    icon: DiffIcon,
    description: "Show changes between commits, commit and working tree, etc.",
    longDescription: "Shows changes between the working tree and the index or a tree, changes between the index and a tree, changes between two trees, changes between two blob objects, or changes between two files on disk.",
    options: [
        { id: 'file', flag: '', description: "File to diff.", longDescription: "Limit the diff to the named file.", type: 'string' as const, placeholder: "path/to/file", requiresValue: true },
        { id: 'staged', flag: '--staged', description: "Show staged changes.", longDescription: "Show changes between the index (staged changes) and the last commit (HEAD). Also known as '--cached'.", type: 'boolean' as const, requiresValue: false },
        { id: 'word-diff', flag: '--word-diff', description: "Show word-level differences.", longDescription: "Show differences on a word-by-word basis, instead of line-by-line.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'fetch',
    name: 'fetch',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: FetchIcon,
    description: "Download objects and refs from another repository.",
    longDescription: "The 'fetch' command downloads commits, files, and refs from a remote repository into your local repo. It doesn't merge or modify your current work, it just updates your local knowledge of the remote state.",
    options: [
        { id: 'remote', flag: '', description: "The remote to fetch from.", longDescription: "Specifies which remote to fetch from (e.g., 'origin'). If blank, it uses the default remote.", type: 'string' as const, placeholder: "origin", requiresValue: true },
        { id: 'all', flag: '--all', description: "Fetch all remotes.", longDescription: "Fetches from all of your configured remote repositories.", type: 'boolean' as const, requiresValue: false },
        { id: 'prune', flag: '--prune', description: "Prune stale branches.", longDescription: "Before fetching, remove any remote-tracking references that no longer exist on the remote.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'grep',
    name: 'grep',
    icon: GrepIcon,
    description: "Print lines matching a pattern.",
    longDescription: "Looks for specified patterns in the contents of files in the working tree, blobs registered in the index file, or blobs in trees of commits.",
    options: [
        { id: 'pattern', flag: '', description: "The pattern to search for.", longDescription: "The regular expression or string to match against file contents.", type: 'string' as const, placeholder: "searchTerm", requiresValue: true },
        { id: 'path', flag: '--', description: "File(s) to search.", longDescription: "Limit the search to specific files or directories.", type: 'string' as const, placeholder: "src/", requiresValue: true },
        { id: 'n', flag: '-n', description: "Show line numbers.", longDescription: "Prefix the line number to the output.", type: 'boolean' as const, requiresValue: false },
        { id: 'i', flag: '-i', description: "Ignore case.", longDescription: "Ignore case distinctions in both the pattern and the files.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'log',
    name: 'log',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: LogIcon,
    description: "Show commit logs.",
    longDescription: "The 'log' command displays the commit history. It's highly customizable to show you exactly the information you need.",
    options: [
        { id: 'oneline', flag: '--oneline', description: "Show one commit per line.", longDescription: "Condenses the log output to show the commit hash and title on a single line.", type: 'boolean' as const, requiresValue: false },
        { id: 'graph', flag: '--graph', description: "Display an ASCII graph.", longDescription: "Draws a text-based graphical representation of the commit history on the left side of the output.", type: 'boolean' as const, requiresValue: false },
        { id: 'n', flag: '-n', description: "Limit number of commits.", longDescription: "Limits the number of commits to show in the output.", type: 'string' as const, placeholder: "10", requiresValue: true },
        { id: 'since', flag: '--since', description: "Show commits more recent than a date.", longDescription: "Shows commits more recent than a specific date (e.g., '2023-01-01').", type: 'string' as const, placeholder: "YYYY-MM-DD", requiresValue: true },
        { id: 'until', flag: '--until', description: "Show commits older than a date.", longDescription: "Shows commits older than a specific date (e.g., '2023-12-31').", type: 'string' as const, placeholder: "YYYY-MM-DD", requiresValue: true },
    ]
  },
  {
    id: 'merge',
    name: 'merge',
    icon: MergeIcon,
    description: "Join two or more development histories together.",
    longDescription: "Merges the specified branch into the current branch. Git will attempt to automatically combine the histories; if there are conflicting changes, you will be asked to resolve them.",
    options: [
      { id: 'branch', flag: '', description: "Branch to merge.", longDescription: "The name of the branch whose changes you want to merge into your current branch.", type: 'string' as const, placeholder: "feature-branch", requiresValue: true },
      { id: 'no-ff', flag: '--no-ff', description: "Create a merge commit.", longDescription: "Create a merge commit even when the merge could be resolved as a fast-forward. This is useful for preserving the history of a feature branch.", type: 'boolean' as const, requiresValue: false },
      { id: 'squash', flag: '--squash', description: "Squash commits.", longDescription: "Combine all of the merged branch's commits into a single new commit on top of the current branch. The original commits from the other branch are not included in the history.", type: 'boolean' as const, requiresValue: false },
      { id: 'abort', flag: '--abort', description: "Abort a conflicted merge.", longDescription: "If a merge results in conflicts, this command will abort the merge process and try to reconstruct the pre-merge state.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'mv',
    name: 'mv',
    icon: MvIcon,
    description: "Move or rename a file, a directory, or a symlink.",
    longDescription: "Renames a file in the working tree and stages the change. It is equivalent to moving the file on the filesystem and then running 'git rm' on the old path and 'git add' on the new path.",
    options: [
      { id: 'source', flag: '', description: "Source path.", longDescription: "The current path of the file or directory.", type: 'string' as const, placeholder: "old-path/file.txt", requiresValue: true },
      { id: 'destination', flag: '', description: "Destination path.", longDescription: "The new path for the file or directory.", type: 'string' as const, placeholder: "new-path/file.txt", requiresValue: true },
      { id: 'f', flag: '-f', description: "Force rename or move.", longDescription: "Force the operation even if the target exists. Use with caution.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'pull',
    name: 'pull',
    icon: PullIcon,
    description: "Fetch from and integrate with another repository.",
    longDescription: "The 'git pull' command is a shortcut for 'git fetch' followed by 'git merge'. It fetches changes from a remote and integrates them with the current branch.",
    options: [
      { id: 'remote', flag: '', description: "Remote repository.", longDescription: "The remote repository to pull from. Defaults to 'origin'.", type: 'string' as const, placeholder: "origin", requiresValue: true },
      { id: 'branch', flag: '', description: "Remote branch.", longDescription: "The name of the remote branch to pull. Defaults to the current local branch's upstream branch.", type: 'string' as const, placeholder: "main", requiresValue: true },
      { id: 'rebase', flag: '--rebase', description: "Use rebase instead of merge.", longDescription: "Instead of using 'git merge' to integrate changes, use 'git rebase'. This creates a more linear history.", type: 'boolean' as const, requiresValue: false },
      { id: 'ff-only', flag: '--ff-only', description: "Fast-forward only.", longDescription: "Only update the branch if it can be fast-forwarded. If not, the command will fail, preventing a merge commit.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'push',
    name: 'push',
    icon: PushIcon,
    description: "Update remote refs along with associated objects.",
    longDescription: "The 'push' command uploads local repository content to a remote repository. It's how you share your commits with others.",
    options: [
      { id: 'remote', flag: '', description: "Remote repository.", longDescription: "The destination remote repository. Defaults to 'origin'.", type: 'string' as const, placeholder: "origin", requiresValue: true },
      { id: 'branch', flag: '', description: "Branch to push.", longDescription: "The local branch to push to the remote. If omitted, Git uses the current branch.", type: 'string' as const, placeholder: "main", requiresValue: true },
      { id: 'u', flag: '-u', description: "Set upstream tracking.", longDescription: "For every branch that is up to date or successfully pushed, add upstream (tracking) reference. This simplifies future 'git pull' commands.", type: 'boolean' as const, requiresValue: false },
      { id: 'force', flag: '--force', description: "Force the push.", longDescription: "Forcibly overwrites the remote branch. This can discard other people's commits and should be used with extreme caution.", type: 'boolean' as const, requiresValue: false },
      { id: 'tags', flag: '--tags', description: "Push all tags.", longDescription: "Pushes all of your local tags to the remote repository.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'rebase',
    name: 'rebase',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: RebaseIcon,
    description: "Reapply commits on top of another base tip.",
    longDescription: "Rebasing is the process of moving or combining a sequence of commits to a new base commit. It creates a linear history, which can be easier to read.",
    options: [
      { id: 'i', flag: '-i', description: "Interactive rebase.", longDescription: "Interactive rebasing gives you the opportunity to alter individual commits in the process. You can reorder, squash, edit, or remove commits.", type: 'boolean' as const, requiresValue: false },
      { id: 'base', flag: '', description: "Target branch or commit.", longDescription: "The branch or commit hash onto which you want to rebase your current branch.", type: 'string' as const, placeholder: "main", requiresValue: true },
    ]
  },
  {
    id: 'reflog',
    name: 'reflog',
    icon: ReflogIcon,
    description: "Manage reflog information.",
    longDescription: "The 'reflog' command tracks when the tips of branches and other references were updated in the local repository. It's a safety net that allows you to go back to commits even if they are not referenced by any branch or tag.",
    options: []
  },
  {
    id: 'remote',
    name: 'remote',
    icon: RemoteIcon,
    description: "Manage set of tracked repositories.",
    longDescription: "Manages the set of remote repositories whose branches you track. You can add, rename, and remove remotes.",
    options: [
        { id: 'v', flag: '-v', description: "Be verbose.", longDescription: "Show URLs of remotes when listing. Without this, only the names of the remotes are shown.", type: 'boolean' as const, requiresValue: false },
        { id: 'add', flag: 'add', description: "Add a remote.", longDescription: "Adds a remote named <name> for the repository at <url>.", type: 'string' as const, placeholder: "origin https://..", requiresValue: true },
        { id: 'remove', flag: 'remove', description: "Remove a remote.", longDescription: "Removes the remote with the specified name.", type: 'string' as const, placeholder: "origin", requiresValue: true },
        { id: 'rename', flag: 'rename', description: "Rename a remote.", longDescription: "Renames a remote from <old> to <new>.", type: 'string' as const, placeholder: "origin upstream", requiresValue: true },
    ]
  },
  {
    id: 'reset',
    name: 'reset',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: ResetIcon,
    description: "Reset current HEAD or unstage files.",
    longDescription: "The 'reset' command is versatile. It can be used to unstage files from the index, or to reset your entire working tree to a previous commit. Be aware of the mode you are using as '--hard' can discard your work.",
    options: [
        { id: 'mode', flag: '', description: "Set the reset mode.", longDescription: "Specifies the reset mode for moving HEAD. 'soft' moves HEAD but doesn't touch the staging area or working directory. 'mixed' (default) resets the staging area. 'hard' resets everything.", type: 'choice' as const, choices: ['--soft', '--mixed', '--hard'], requiresValue: true },
        { id: 'commit-ref', flag: '', description: "Target commit for HEAD reset.", longDescription: "The commit to reset to. Typically 'HEAD~1' to go back one commit. Used with modes like '--soft'.", type: 'string' as const, placeholder: "HEAD~1", requiresValue: true },
        { id: 'path', flag: '', description: "Unstage a file.", longDescription: "Unstages the specified file, removing it from the index without changing the working directory. This is the opposite of 'git add'. If a commit is specified, the file is reset to its state in that commit.", type: 'string' as const, placeholder: "path/to/file.js", requiresValue: true },
    ]
  },
  {
    id: 'restore',
    name: 'restore',
    icon: RestoreIcon,
    description: "Restore working tree files.",
    longDescription: "Restores files in the working tree. Use it to discard local changes in a file, or to unstage a file from the index. Unlike 'reset', it does not update your branch.",
    options: [
        { id: 'pathspec', flag: '', description: "File(s) to restore.", longDescription: "The path to the file or directory to restore.", type: 'string' as const, placeholder: "path/to/file", requiresValue: true },
        { id: 'staged', flag: '--staged', description: "Unstage files.", longDescription: "Restores the file in the index, effectively unstaging it. The changes will remain in your working directory.", type: 'boolean' as const, requiresValue: false },
        { id: 'source', flag: '--source', description: "Specify a source commit.", longDescription: "Restore the file from a specific commit or branch, instead of from the index. E.g., 'HEAD' or a commit hash.", type: 'string' as const, placeholder: "HEAD", requiresValue: true },
    ]
  },
  {
    id: 'revert',
    name: 'revert',
    icon: RevertIcon,
    description: "Revert some existing commits.",
    longDescription: "Creates a new commit that applies the inverse of the changes introduced by the target commit. This is a safe way to undo changes in a shared history, as it doesn't alter the existing commit history.",
    options: [
        { id: 'commit', flag: '', description: "Commit to revert.", longDescription: "The commit hash to revert. This will create a new commit that undoes its changes.", type: 'string' as const, placeholder: "commit-hash", requiresValue: true },
        { id: 'no-commit', flag: '--no-commit', description: "Do not create a commit.", longDescription: "Applies the inverse changes to your working directory and staging area, but does not create a new commit.", type: 'boolean' as const, requiresValue: false },
        { id: 'no-edit', flag: '--no-edit', description: "Use auto-generated message.", longDescription: "Reverts the commit without launching the commit message editor.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'rm',
    name: 'rm',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: RmIcon,
    description: "Remove files from the working tree and index.",
    longDescription: "Removes files from your repository. Use the '--cached' option to un-track a file without deleting it from your disk, which is useful when adding a previously tracked file to .gitignore.",
    options: [
        { id: 'file', flag: '', description: "File(s) to remove.", longDescription: "The path to the file or directory you want to remove.", type: 'string' as const, placeholder: "path/to/file", requiresValue: true },
        { id: 'cached', flag: '--cached', description: "Only remove from the index.", longDescription: "Use this option to remove a file from being tracked by Git, but keep the file in your working directory. This is often the first step before adding the file path to .gitignore.", type: 'boolean' as const, requiresValue: false },
        { id: 'r', flag: '-r', description: "Recursive removal.", longDescription: "Allows recursive removal when removing a directory.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'show',
    name: 'show',
    icon: ShowIcon,
    description: "Show various types of objects.",
    longDescription: "Shows one or more objects (blobs, trees, tags, and commits). For commits, it shows the commit log message and a diff of the changes.",
    options: [
        { id: 'object', flag: '', description: "Object to show.", longDescription: "The object to display (e.g., a commit hash, tag name, or branch name). Defaults to HEAD.", type: 'string' as const, placeholder: "HEAD", requiresValue: true },
    ]
  },
  {
    id: 'shortlog',
    name: 'shortlog',
    icon: ShortlogIcon,
    description: "Summarize 'git log' output.",
    longDescription: "Summarizes the git log output in a format suitable for release announcements. It groups commits by author and displays the first line of each commit message.",
    options: [
        { id: 'n', flag: '-n', description: "Sort by number of commits.", longDescription: "Sorts the output based on the number of commits per author, rather than alphabetically.", type: 'boolean' as const, requiresValue: false },
        { id: 's', flag: '-s', description: "Suppress commit descriptions.", longDescription: "Shows only the number of commits per author, suppressing the commit descriptions.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'stash',
    name: 'stash',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: StashIcon,
    description: "Stash the changes in a dirty working directory away.",
    longDescription: "Use 'stash' when you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the HEAD commit.",
    options: [
        { id: 'push', flag: 'push', description: "Save your local modifications to a new stash.", longDescription: "This is the default operation. It saves your changes and cleans the working directory.", type: 'boolean' as const, requiresValue: false },
        { id: 'apply', flag: 'apply', description: "Apply the latest stash.", longDescription: "Applies the changes from the most recent stash without removing it from the stash list.", type: 'boolean' as const, requiresValue: false },
        { id: 'pop', flag: 'pop', description: "Apply and drop the latest stash.", longDescription: "Applies the most recent stash and then removes it from the stash list.", type: 'boolean' as const, requiresValue: false },
        { id: 'list', flag: 'list', description: "List all stashes.", longDescription: "Shows a list of all your stashed changes.", type: 'boolean' as const, requiresValue: false },
        { id: 'drop', flag: 'drop', description: "Drop the latest stash.", longDescription: "Removes the most recent stash from the stash list.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'status',
    name: 'status',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: StatusIcon,
    description: "Show the working tree status.",
    longDescription: "Displays paths that have differences between the index file and the current HEAD commit (staged changes), paths that have differences between the working tree and the index file (unstaged changes), and paths in the working tree that are not tracked by Git (untracked files).",
    options: [
        { id: 's', flag: '-s', description: "Show status in short format.", longDescription: "Gives the output in the short-format, which is more compact and easier to parse.", type: 'boolean' as const, requiresValue: false },
        { id: 'b', flag: '-b', description: "Show branch information.", longDescription: "Show the branch and tracking info, even in short-format.", type: 'boolean' as const, requiresValue: false },
    ]
  },
  {
    id: 'switch',
    name: 'switch',
    // Fix: Directly assign the icon component to ensure correct type inference.
    icon: SwitchIcon,
    description: "Switch branches.",
    longDescription: "The 'switch' command lets you switch your current working branch. You can switch to an existing branch, or use the '-c' flag to create a new branch and switch to it in a single step.",
    options: [
        { id: 'branch-name', flag: '', description: "Branch to switch to.", longDescription: "The name of an existing branch you want to move to. Cannot be used with '-c'.", type: 'string' as const, placeholder: "feature-branch", requiresValue: true },
        { id: 'c', flag: '-c', description: "Create and switch to a new branch.", longDescription: "Creates a new branch with the given name and then switches to it. Cannot be used with the plain branch name argument.", type: 'string' as const, placeholder: "new-feature-branch", requiresValue: true },
    ]
  },
  {
    id: 'tag',
    name: 'tag',
    icon: TagIcon,
    description: "Create, list, delete or verify a tag object.",
    longDescription: "Tags are used to mark specific points in a repository’s history as being important. Typically, people use this functionality to mark release points (e.g., v1.0).",
    options: [
        { id: 'list', flag: '--list', description: "List all tags.", longDescription: "Lists all tags in the repository. Can be combined with a pattern to list specific tags.", type: 'string' as const, placeholder: "v1.*", requiresValue: true },
        { id: 'a', flag: '-a', description: "Create an annotated tag.", longDescription: "Creates an annotated tag, which is stored as a full object in the Git database.", type: 'string' as const, placeholder: "v1.0.0", requiresValue: true },
        { id: 'm', flag: '-m', description: "Tag message.", longDescription: "Use the given message for an annotated tag, instead of prompting for one.", type: 'string' as const, placeholder: "Release version 1.0.0", requiresValue: true },
        { id: 'd', flag: '-d', description: "Delete a tag.", longDescription: "Deletes the tag with the given name.", type: 'string' as const, placeholder: "v1.0.0-beta", requiresValue: true },
    ]
  },
  {
    id: 'worktree',
    name: 'worktree',
    icon: WorktreeIcon,
    description: "Manage multiple working trees.",
    longDescription: "A git worktree allows you to have multiple checkouts of a repository on your filesystem at the same time. This is useful for working on different features or hotfixes in parallel without needing to stash or commit your work when switching contexts.",
    options: [
        { id: 'list', flag: 'list', description: "List all worktrees.", longDescription: "Shows a list of all your worktrees, including their path, HEAD commit, and branch.", type: 'boolean' as const, requiresValue: false },
        { id: 'add', flag: 'add', description: "Create a new worktree.", longDescription: "Creates a new worktree at the specified path, checking out the specified branch.", type: 'string' as const, placeholder: "<path> <branch>", requiresValue: true },
        { id: 'remove', flag: 'remove', description: "Remove a worktree.", longDescription: "Removes the worktree at the specified path. This will fail if the worktree has untracked or modified files, unless --force is used.", type: 'string' as const, placeholder: "<path>", requiresValue: true },
        { id: 'force', flag: '--force', description: "Force remove.", longDescription: "Forces the removal of a worktree even if it has uncommitted changes.", type: 'boolean' as const, requiresValue: false },
    ]
  },
].sort((a, b) => a.name.localeCompare(b.name));