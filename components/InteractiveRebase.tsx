
import React, { useState, useRef, useEffect } from 'react';
import type { RebaseCommit, RebaseAction } from '../types';

const REBASE_ACTIONS: RebaseAction[] = ['pick', 'reword', 'edit', 'squash', 'fixup', 'drop'];

const GrabHandleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

interface InteractiveRebaseProps {
    commits: RebaseCommit[];
    setCommits: React.Dispatch<React.SetStateAction<RebaseCommit[]>>;
}

export const InteractiveRebase: React.FC<InteractiveRebaseProps> = ({ commits, setCommits }) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const dragOverIndex = useRef<number | null>(null);
    const [dropPlaceholderIndex, setDropPlaceholderIndex] = useState<number | null>(null);

    const handleActionChange = (id: string, newAction: RebaseAction) => {
        setCommits(prev => prev.map(c => c.id === id ? { ...c, action: newAction } : c));
    };
    
    const handleMessageChange = (id: string, newMessage: string) => {
        setCommits(prev => prev.map(c => c.id === id ? { ...c, message: newMessage } : c));
    }

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add class to body to change cursor
        document.body.classList.add('grabbing');
    };

    const handleDragEnter = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;
        dragOverIndex.current = index;
        setDropPlaceholderIndex(index);
    };

    const handleDragEnd = () => {
        if (draggedIndex !== null && dragOverIndex.current !== null) {
            const newCommits = [...commits];
            const draggedItem = newCommits.splice(draggedIndex, 1)[0];
            newCommits.splice(dragOverIndex.current, 0, draggedItem);
            setCommits(newCommits);
        }
        setDraggedIndex(null);
        dragOverIndex.current = null;
        setDropPlaceholderIndex(null);
        document.body.classList.remove('grabbing');
    };
    
    useEffect(() => {
        return () => {
            // Cleanup: ensure grabbing class is removed if component unmounts during drag
            document.body.classList.remove('grabbing');
        }
    }, [])

    return (
        <div className="mt-4 border-t border-deep-charcoal/10 pt-4">
             <style>{`.grabbing, .grabbing * { cursor: grabbing !important; }`}</style>
             <p className="text-sm text-stone-gray mb-4">
                This is a visual preview of an interactive rebase. Reorder commits by dragging them, or change their action. The <span className="font-bold text-deep-charcoal">Live Scribe</span> will explain what each action does.
            </p>
            <ul
                className="space-y-2 font-mono text-sm"
                onDragLeave={() => {
                    dragOverIndex.current = null;
                    setDropPlaceholderIndex(null);
                }}
            >
                {commits.map((commit, index) => {
                    const isSquashOrFixup = commit.action === 'squash' || commit.action === 'fixup';
                    const isDragged = draggedIndex === index;

                    return (
                        <React.Fragment key={commit.id}>
                             {dropPlaceholderIndex === index && (
                                <li className="h-12 border-2 border-dashed border-burnt-gold/50 rounded-md bg-burnt-gold/5"></li>
                             )}
                            <li
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnter={() => handleDragEnter(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => e.preventDefault()}
                                className={`flex items-center p-2 rounded-md transition-all duration-200 ${isSquashOrFixup ? 'bg-burnt-gold/10' : 'bg-deep-charcoal/5'} ${isDragged ? 'opacity-50 shadow-lg' : ''}`}
                            >
                                <span className="mr-3 cursor-grab touch-none"><GrabHandleIcon /></span>
                                <select
                                    value={commit.action}
                                    onChange={(e) => handleActionChange(commit.id, e.target.value as RebaseAction)}
                                    className={`mr-4 font-bold rounded-md border-transparent focus:border-burnt-gold focus:ring focus:ring-burnt-gold/50 transition-colors ${commit.action === 'pick' ? 'text-burnt-gold' : 'text-olive-green'} bg-transparent appearance-none`}
                                >
                                    {REBASE_ACTIONS.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                                <span className="font-bold text-stone-gray mr-4">{commit.hash}</span>
                                {commit.action === 'reword' ? (
                                    <input 
                                        type="text"
                                        value={commit.message}
                                        onChange={(e) => handleMessageChange(commit.id, e.target.value)}
                                        className="bg-paper-white/50 px-2 py-1 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-burnt-gold"
                                    />
                                ) : (
                                     <span className="truncate flex-1">{commit.message}</span>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
};
