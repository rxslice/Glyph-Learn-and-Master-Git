
import React, { useMemo } from 'react';
import type { BlameLine } from '../types';

interface BlameViewProps {
    lines: BlameLine[];
    showEmail: boolean;
    fileName: string;
}

export const BlameView: React.FC<BlameViewProps> = ({ lines, showEmail, fileName }) => {
    const authorColors: Record<string, string> = useMemo(() => {
        const colors: Record<string, string> = {};
        const palette = ['bg-burnt-gold/20', 'bg-olive-green/20', 'bg-deep-charcoal/10', 'bg-red-200/50', 'bg-blue-200/50'];
        let colorIndex = 0;
        
        lines.forEach(({ author }) => {
            if (!colors[author]) {
                colors[author] = palette[colorIndex % palette.length];
                colorIndex++;
            }
        });
        return colors;
    }, [lines]);

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg overflow-hidden animate-fade-in-slide-up">
            <div className="bg-deep-charcoal/5 p-3 border-b border-deep-charcoal/10">
                <p className="font-mono text-sm font-bold text-deep-charcoal">blame: <span className="text-burnt-gold">{fileName}</span></p>
            </div>
            <div className="font-mono text-xs text-deep-charcoal overflow-x-auto max-h-[400px]">
                <table className="w-full">
                    <tbody>
                        {lines.map((line) => (
                            <tr key={line.line} className={`hover:bg-deep-charcoal/5 transition-colors ${authorColors[line.author]}`}>
                                <td className="p-2 whitespace-nowrap border-r border-deep-charcoal/5"><span className="text-stone-gray">{line.hash}</span></td>
                                <td className="p-2 whitespace-nowrap w-28 border-r border-deep-charcoal/5">{showEmail ? line.email : line.author}</td>
                                <td className="p-2 whitespace-nowrap w-24 border-r border-deep-charcoal/5 text-stone-gray/80">{line.date}</td>
                                <td className="p-2 w-10 text-right pr-4 text-stone-gray/60 border-r border-deep-charcoal/5">{line.line}</td>
                                <td className="p-2 w-full"><pre className="whitespace-pre-wrap"><code>{line.content || ' '}</code></pre></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
