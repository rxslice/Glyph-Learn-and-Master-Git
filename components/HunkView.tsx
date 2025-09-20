import React from 'react';
import type { Hunk, DiffLine } from '../types';

interface HunkViewProps {
    hunk: Hunk;
    onToggle: () => void;
}

export const HunkView: React.FC<HunkViewProps> = ({ hunk, onToggle }) => {
    // Reusing styling from DiffView
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
        <div className="my-2 border border-deep-charcoal/10 rounded-lg overflow-hidden animate-fade-in-slide-up">
            <header className="flex items-center justify-between bg-deep-charcoal/5 p-2 border-b border-deep-charcoal/10">
                <p className="font-mono text-xs text-stone-gray">{hunk.header}</p>
                <button
                    onClick={onToggle}
                    className={`text-xs font-bold px-3 py-1 rounded-md transition-colors ${
                        hunk.isStaged
                            ? 'bg-deep-charcoal/10 text-deep-charcoal hover:bg-deep-charcoal/20'
                            : 'bg-olive-green/20 text-olive-green hover:bg-olive-green/30'
                    }`}
                >
                    {hunk.isStaged ? 'Unstage Hunk' : 'Stage Hunk'}
                </button>
            </header>
            <table className="w-full font-mono text-xs text-deep-charcoal">
                <tbody>
                    {hunk.lines.map((line, index) => (
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
    );
};