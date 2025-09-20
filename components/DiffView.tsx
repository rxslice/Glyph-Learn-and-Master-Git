import React from 'react';
import type { RepoFile, DiffLine } from '../types';

interface DiffViewProps {
    file: RepoFile;
    diffData: DiffLine[];
    onClose: () => void;
}

const BackIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


export const DiffView: React.FC<DiffViewProps> = ({ file, diffData, onClose }) => {
    
    const getLineClass = (type: DiffLine['type']) => {
        switch (type) {
            case 'added': return 'bg-olive-green/10';
            case 'removed': return 'bg-red-500/10';
            default: return 'bg-transparent';
        }
    };
    
     const getSymbol = (type: DiffLine['type']) => {
        switch (type) {
            case 'added': return '+';
            case 'removed': return '-';
            default: return ' ';
        }
    };

    return (
         <div className="mt-6 border border-deep-charcoal/10 rounded-lg overflow-hidden animate-fade-in-slide-up">
            <div className="bg-deep-charcoal/5 p-3 border-b border-deep-charcoal/10 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onClose} className="mr-3 p-1 rounded-md hover:bg-deep-charcoal/10 transition-colors">
                        <BackIcon />
                    </button>
                    <p className="font-mono text-sm font-bold text-deep-charcoal">diff: <span className="text-burnt-gold">{file.path}</span></p>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center"><span className="w-3 h-3 bg-red-500/20 mr-1.5 border border-red-500/30"></span>Deletions</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-olive-green/20 mr-1.5 border border-olive-green/30"></span>Additions</div>
                </div>
            </div>
            <div className="font-mono text-xs text-deep-charcoal overflow-x-auto max-h-[400px]">
                <table className="w-full">
                    <tbody>
                        {diffData.map((line, index) => (
                            <tr key={index} className={getLineClass(line.type)}>
                                <td className="p-1 w-10 text-right pr-2 text-stone-gray/70 select-none">{line.oldLineNumber || ''}</td>
                                <td className="p-1 w-10 text-right pr-2 text-stone-gray/70 select-none">{line.newLineNumber || ''}</td>
                                <td className="p-1 w-5 text-center text-stone-gray/80 select-none">{getSymbol(line.type)}</td>
                                <td className="p-1 w-full"><pre className="whitespace-pre-wrap"><code>{line.content}</code></pre></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};