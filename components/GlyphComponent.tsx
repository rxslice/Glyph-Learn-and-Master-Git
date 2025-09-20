import React, { useState, useEffect, useRef } from 'react';
import type { GitOption } from '../types';

interface GlyphComponentProps {
  prefix: string;
  value: string;
  placeholder?: string;
  option?: GitOption;
  // Fix: Corrected property name from `onValue-change` to `onValueChange` to be a valid identifier.
  onValueChange: (value: string) => void;
  onRemove: () => void;
  isVerb?: boolean;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const GlyphComponent: React.FC<GlyphComponentProps> = ({ prefix, value, placeholder, option, onValueChange, onRemove, isVerb = false }) => {
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (option?.type === 'string' && option.requiresValue && !isVerb) {
      inputRef.current?.focus();
    }
  }, [option]);

  const handleBlur = () => {
    onValueChange(internalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onValueChange(internalValue);
      e.currentTarget.blur();
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(e.target.value);
    onValueChange(e.target.value);
  };
  
  const baseClasses = "flex items-center rounded-md text-deep-charcoal border border-deep-charcoal/20 h-10 transition-all duration-200";
  const verbClasses = isVerb ? "bg-burnt-gold/20 font-bold" : "bg-paper-white hover:border-burnt-gold/50";

  return (
    <div className="animate-fade-in-slide-up mr-2 mb-2">
        <div className={`group relative flex items-center font-mono text-sm ${baseClasses} ${verbClasses}`}>
        <span className="px-3 border-r border-deep-charcoal/20">{prefix}</span>
        {option?.type === 'string' && option.requiresValue ? (
            <input
            ref={inputRef}
            type="text"
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="bg-transparent px-3 w-48 focus:outline-none"
            />
        ) : option?.type === 'choice' && option.choices ? (
            <select value={internalValue} onChange={handleSelectChange} className="bg-transparent pl-2 pr-8 focus:outline-none appearance-none">
                {option.choices.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        ) : (
            <span className="px-3">{value}</span>
        )}
        {!isVerb && (
            <button onClick={onRemove} className="absolute -top-1 -right-1 bg-deep-charcoal text-paper-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <CloseIcon />
            </button>
        )}
        </div>
    </div>
  );
};