import React, { useMemo, useState } from 'react';
import type { RepoFile } from '../types';
import { HunkView } from './HunkView';

interface StatusViewProps {
    files: RepoFile[];
    onStage: (filePath: string) => void;
    onUnstage: (filePath: string) => void;
    onViewDiff: (file: RepoFile) => void;
    onToggleHunk: (filePath: string, hunkId: string) => void;
    onDiscard: (filePath: string) => void;
}

const FileEntry: React.FC<{ file: RepoFile; actionButton: React.ReactNode; onViewDiff?: (file: RepoFile) => void; onExpand?: () => void; isExpandable?: boolean }> = ({ file, actionButton, onViewDiff, onExpand, isExpandable }) => {
    
    const getStatusInfo = () => {
        switch(file.status) {
            case 'modified': return { text: 'modified:', color: 'text-burnt-gold' };
            case 'staged': return { text: file.type === 'new' ? 'new file:' : 'modified:', color: 'text-olive-green' };
            case 'partially-staged': return { text: 'modified:', color: 'text-purple-500' };
            default: return { text: '', color: '' };
        }
    };

    const { text, color } = getStatusInfo();
    const canViewDiff = file.status === 'modified' && onViewDiff && !isExpandable;

    const handleClick = () => {
        if (isExpandable && onExpand) {
            onExpand();
        } else if (canViewDiff && onViewDiff) {
            onViewDiff(file);
        }
    }

    return (
        <div className={`flex items-center justify-between p-2 rounded-md ${(isExpandable || canViewDiff) ? 'hover:bg-deep-charcoal/5 cursor-pointer' : ''}`} onClick={handleClick}>
            <div className="flex items-center">
                <span className={`w-28 flex-shrink-0 font-mono text-xs ${color}`}>{text}</span>
                <span className="font-mono text-sm text-deep-charcoal">{file.path}</span>
            </div>
            <div onClick={e => e.stopPropagation()}>
             {actionButton}
            </div>
        </div>
    );
};

const FileSection: React.FC<{ title: string; files: RepoFile[]; children: React.ReactNode }> = ({ title, files, children }) => {
    if (files.length === 0) return null;
    return (
        <div>
            <h4 className="font-bold text-sm text-deep-charcoal mb-2">{title}</h4>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
};

export const StatusView: React.FC<StatusViewProps> = ({ files, onStage, onUnstage, onViewDiff, onToggleHunk, onDiscard }) => {
    
    const [expandedFilePath, setExpandedFilePath] = useState<string | null>(null);

    const staged = useMemo(() => files.filter(f => f.status === 'staged'), [files]);
    const modified = useMemo(() => files.filter(f => f.status === 'modified' || f.status === 'partially-staged'), [files]);
    const untracked = useMemo(() => files.filter(f => f.status === 'untracked'), [files]);
    
    const handleToggleExpand = (path: string) => {
        setExpandedFilePath(prev => prev === path ? null : path);
    };
    
    const DiscardButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <button
            onClick={onClick}
            title="Discard all changes in this file"
            className="text-xs font-bold bg-red-500/10 text-red-600 px-3 py-1 rounded-md hover:bg-red-500/20 transition-colors"
        >
            Discard
        </button>
    );

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-6">
            <FileSection title="Changes to be committed" files={staged}>
                 {staged.map(file => (
                    <FileEntry 
                        key={file.path}
                        file={file}
                        actionButton={
                            <button
                                onClick={() => onUnstage(file.path)}
                                className="text-xs font-bold bg-deep-charcoal/10 text-deep-charcoal px-3 py-1 rounded-md hover:bg-deep-charcoal/20 transition-colors"
                            >
                                Unstage
                            </button>
                        }
                    />
                ))}
            </FileSection>

            <FileSection title="Changes not staged for commit" files={modified}>
                {modified.map(file => (
                    <div key={file.path}>
                        <FileEntry 
                            file={file}
                            isExpandable={!!file.hunks}
                            onExpand={file.hunks ? () => handleToggleExpand(file.path) : undefined}
                            onViewDiff={!file.hunks ? onViewDiff : undefined}
                            actionButton={
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onStage(file.path)}
                                        className="text-xs font-bold bg-olive-green/20 text-olive-green px-3 py-1 rounded-md hover:bg-olive-green/30 transition-colors"
                                    >
                                        {file.status === 'partially-staged' ? 'Stage All' : 'Stage File'}
                                    </button>
                                    <DiscardButton onClick={() => onDiscard(file.path)} />
                                </div>
                            }
                        />
                         {expandedFilePath === file.path && file.hunks && (
                            <div className="pl-6 pt-2 pb-1">
                                {file.hunks.map(hunk => (
                                    <HunkView key={hunk.id} hunk={hunk} onToggle={() => onToggleHunk(file.path, hunk.id)} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </FileSection>
            
             <FileSection title="Untracked files" files={untracked}>
                {untracked.map(file => (
                    <div key={file.path} className="flex items-center justify-between p-2 rounded-md hover:bg-deep-charcoal/5">
                        <span className="font-mono text-sm text-red-600/80">{file.path}</span>
                         <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onStage(file.path)}
                                className="text-xs font-bold bg-olive-green/20 text-olive-green px-3 py-1 rounded-md hover:bg-olive-green/30 transition-colors"
                            >
                                Stage
                            </button>
                            <DiscardButton onClick={() => onDiscard(file.path)} />
                        </div>
                    </div>
                ))}
            </FileSection>
        </div>
    );
};