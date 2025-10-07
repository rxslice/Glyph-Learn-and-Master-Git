import React, { useState, useEffect } from 'react';
import type { Commit } from '../types';

interface CommitLogGraphProps {
    commits: Commit[];
    branches: Record<string, string>;
    remoteBranches: Record<string, string>;
    head: string;
    showGraph: boolean;
    onCommitSelect: (commit: Commit | null) => void;
    selectedCommitId: string | null;
    onCreateBranch: (commit: Commit) => void;
    onSwitchBranch: (branchName: string) => void;
    onDeleteBranch: (branchName: string) => void;
}

const COLUMN_WIDTH = 80;
const ROW_HEIGHT = 60;
const NODE_RADIUS = 10;
const BRANCH_COLORS = ['#859900', '#B58900', '#1F2937', '#d33682', '#2aa198'];

const SwitchBranchIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const DeleteBranchIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const CommitLogGraph: React.FC<CommitLogGraphProps> = ({ commits, branches, remoteBranches, head, showGraph, onCommitSelect, selectedCommitId, onCreateBranch, onSwitchBranch, onDeleteBranch }) => {
    
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; commit: Commit } | null>(null);
    // FIX: Add explicit type annotation for the Map to ensure correct type inference for commits.
    const commitMap = new Map<string, Commit>(commits.map(c => [c.id, c]));

    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const handleContextMenu = (e: React.MouseEvent, commit: Commit) => {
        e.preventDefault();
        setContextMenu({ x: e.pageX, y: e.pageY, commit });
    };

    const handleCreateBranch = () => {
        if (contextMenu) {
            onCreateBranch(contextMenu.commit);
        }
        setContextMenu(null);
    };

    const getCommitPosition = (commitId: string) => {
        const commit = commitMap.get(commitId);
        if (!commit) return { x: 0, y: 0 };
        return {
            x: commit.col * COLUMN_WIDTH + COLUMN_WIDTH / 2,
            y: commit.row * ROW_HEIGHT + ROW_HEIGHT / 2,
        };
    };

    const branchHeads = Object.entries(branches);
    const remoteBranchHeads = Object.entries(remoteBranches);
    
    return (
        <div className="relative mt-8 font-mono text-sm select-none" style={{ height: commits.length * ROW_HEIGHT }}>
            {/* SVG for drawing graph lines */}
            {showGraph && (
                 <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                    {commits.map(commit => {
                        const { x: childX, y: childY } = getCommitPosition(commit.id);
                        return commit.parents.map(parentId => {
                            const parent = commitMap.get(parentId);
                            if (!parent) return null;
                            const { x: parentX, y: parentY } = getCommitPosition(parentId);
                            const color = BRANCH_COLORS[parent.col % BRANCH_COLORS.length];
                            
                            const controlPointX1 = childX;
                            const controlPointY1 = childY + (parentY - childY) * 0.5;
                            const controlPointX2 = parentX;
                            const controlPointY2 = parentY - (parentY - childY) * 0.5;

                            const pathData = `M ${childX} ${childY} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${parentX} ${parentY}`;

                            return (
                                <path
                                    key={`${commit.id}-${parentId}`}
                                    d={pathData}
                                    stroke={color}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            );
                        });
                    })}
                </svg>
            )}

            {/* Commit nodes */}
            <div className="relative" style={{ zIndex: 2 }}>
                {commits.map(commit => {
                    const { x, y } = getCommitPosition(commit.id);
                    const isSelected = selectedCommitId === commit.id;
                    const isHead = head === commit.id;
                    const isMergeCommit = commit.parents.length > 1;

                    const nodeSize = isMergeCommit ? 'w-6 h-6' : 'w-5 h-5';
                    const borderWidth = isMergeCommit ? '4px' : '3px';

                    return (
                        <div
                            key={commit.id}
                            className="absolute flex items-center group"
                            style={{
                                top: y - ROW_HEIGHT / 2,
                                left: 0,
                                width: '100%',
                                height: ROW_HEIGHT,
                                transform: `translateX(${x - (isMergeCommit ? 12 : 10)}px)`, // Adjust for node size
                            }}
                             onContextMenu={(e) => handleContextMenu(e, commit)}
                        >
                             <div 
                                className={`${nodeSize} rounded-full transition-all duration-200 cursor-pointer ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                                style={{
                                    backgroundColor: BRANCH_COLORS[commit.col % BRANCH_COLORS.length],
                                    border: `${borderWidth} solid ${isSelected ? '#B58900' : 'white'}`
                                }}
                                onClick={() => onCommitSelect(isSelected ? null : commit)}
                            ></div>
                            <div className="flex items-center ml-4" style={{ transform: `translateX(${COLUMN_WIDTH/2 - NODE_RADIUS}px)` }}>
                                <span className="font-bold text-stone-gray">{commit.hash}</span>
                                <span className="ml-4 text-deep-charcoal truncate" onClick={() => onCommitSelect(isSelected ? null : commit)}>{commit.message}</span>
                                {branchHeads.filter(([_, commitId]) => commitId === commit.id).map(([name]) => {
                                    const isCurrentBranch = isHead && branches[name] === head;
                                    return (
                                        <div key={name} className="relative group/branch ml-4 text-xs font-bold text-white bg-olive-green px-2 py-0.5 rounded-full flex items-center">
                                            <span>{name}</span>
                                            {!isCurrentBranch && (
                                                <div className="absolute left-full ml-2 flex items-center space-x-1 opacity-0 group-hover/branch:opacity-100 transition-opacity">
                                                    <button onClick={() => onSwitchBranch(name)} title={`Switch to ${name}`} className="p-1 bg-deep-charcoal/10 rounded-full hover:bg-burnt-gold/30"><SwitchBranchIcon /></button>
                                                    <button onClick={() => onDeleteBranch(name)} title={`Delete ${name}`} className="p-1 bg-deep-charcoal/10 rounded-full hover:bg-red-500/50"><DeleteBranchIcon /></button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                                {remoteBranchHeads.filter(([_, commitId]) => commitId === commit.id).map(([name]) => (
                                    <span key={name} className="ml-4 text-xs font-bold text-stone-gray bg-stone-gray/10 px-2 py-0.5 rounded-full">{`origin/${name}`}</span>
                                ))}
                                 {isHead && (
                                     <span className="ml-4 text-xs font-bold text-white bg-burnt-gold px-2 py-0.5 rounded-full">
                                        HEAD
                                     </span>
                                 )}
                            </div>
                        </div>
                    );
                })}
            </div>
            
             {contextMenu && (
                <div
                    className="absolute bg-paper-white border border-deep-charcoal/10 rounded-md shadow-lg p-2 animate-pop-in"
                    style={{ top: contextMenu.y, left: contextMenu.x, zIndex: 100 }}
                >
                    <button
                        onClick={handleCreateBranch}
                        className="w-full text-left px-3 py-1 rounded hover:bg-deep-charcoal/5"
                    >
                        Create branch here...
                    </button>
                </div>
            )}
        </div>
    );
};