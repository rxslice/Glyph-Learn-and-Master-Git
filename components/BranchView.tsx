
import React, { useState } from 'react';

// Icons for actions
const CreateBranchIcon = ({ className = "w-4 h-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const SwitchBranchIcon = ({ className = "w-4 h-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const RenameIcon = ({ className = "w-4 h-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const DeleteBranchIcon = ({ className = "w-4 h-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

interface BranchViewProps {
    branches: Record<string, string>;
    headCommitId: string;
    onCreate: (name: string, startPoint?: string) => void;
    onSwitch: (name: string) => void;
    onRename: (oldName: string, newName: string) => void;
    onDelete: (name: string) => void;
}

export const BranchView: React.FC<BranchViewProps> = ({ branches, headCommitId, onCreate, onSwitch, onRename, onDelete }) => {
    const [newBranchName, setNewBranchName] = useState('');
    const [startPoint, setStartPoint] = useState('');
    const [renamingBranch, setRenamingBranch] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    
    const currentBranchName = Object.entries(branches).find(([, commitId]) => commitId === headCommitId)?.[0] || null;

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newBranchName.trim()) {
            onCreate(newBranchName.trim(), startPoint.trim() || undefined);
            setNewBranchName('');
            setStartPoint('');
        }
    };
    
    const handleStartRename = (name: string) => {
        setRenamingBranch(name);
        setRenameValue(name);
    }
    
    const handleConfirmRename = (oldName: string) => {
        if (renameValue.trim() && renameValue.trim() !== oldName) {
            onRename(oldName, renameValue.trim());
        }
        setRenamingBranch(null);
        setRenameValue('');
    }

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg p-4 animate-fade-in-slide-up space-y-6">
            <div>
                <h3 className="font-bold text-lg text-deep-charcoal mb-4">Branches</h3>
                <ul className="space-y-2">
                    {Object.keys(branches).sort().map(name => (
                        <li key={name} className="flex items-center justify-between p-2 rounded-md hover:bg-deep-charcoal/5 group">
                            {renamingBranch === name ? (
                                <input
                                    type="text"
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    onBlur={() => handleConfirmRename(name)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmRename(name)}
                                    className="font-mono text-sm bg-paper-white px-2 py-1 border border-burnt-gold rounded-md focus:outline-none"
                                    autoFocus
                                />
                            ) : (
                                <span className={`font-mono text-sm flex items-center ${name === currentBranchName ? 'text-olive-green font-bold' : 'text-deep-charcoal'}`}>
                                    {name === currentBranchName && <span className="mr-2">*</span>}
                                    {name}
                                </span>
                            )}
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {name !== currentBranchName && (
                                    <button onClick={() => onSwitch(name)} title="Switch to this branch" className="p-1.5 rounded-md hover:bg-deep-charcoal/10"><SwitchBranchIcon /></button>
                                )}
                                <button onClick={() => handleStartRename(name)} title="Rename branch" className="p-1.5 rounded-md hover:bg-deep-charcoal/10"><RenameIcon /></button>
                                {name !== currentBranchName && (
                                    <button onClick={() => onDelete(name)} title="Delete branch" className="p-1.5 rounded-md hover:bg-red-500/10 text-stone-gray hover:text-red-600"><DeleteBranchIcon /></button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            <form onSubmit={handleCreate} className="border-t border-deep-charcoal/10 pt-6">
                <h4 className="font-bold text-md text-deep-charcoal mb-3">Create New Branch</h4>
                <div className="flex items-end space-x-3">
                    <div className="flex-grow">
                        <label htmlFor="new-branch-name" className="block text-xs font-medium text-stone-gray mb-1">Branch Name</label>
                        <input
                            id="new-branch-name"
                            type="text"
                            value={newBranchName}
                            onChange={(e) => setNewBranchName(e.target.value)}
                            placeholder="e.g., feature/new-design"
                            className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                            required
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="start-point" className="block text-xs font-medium text-stone-gray mb-1">Start Point (optional)</label>
                        <input
                            id="start-point"
                            type="text"
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            placeholder="e.g., main or commit-hash"
                            className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                        />
                    </div>
                    <button type="submit" className="flex items-center space-x-2 bg-deep-charcoal text-paper-white px-4 py-2 rounded-md hover:bg-deep-charcoal/90 transition-colors font-bold text-sm h-[42px]">
                        <CreateBranchIcon className="w-5 h-5" />
                        <span>Create</span>
                    </button>
                </div>
            </form>
        </div>
    );
};
