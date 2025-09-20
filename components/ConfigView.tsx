import React, { useState, useEffect, useMemo } from 'react';

interface ConfigViewProps {
    localConfig: Record<string, string>;
    globalConfig: Record<string, string>;
    scope: 'local' | 'global';
    configKey: string;
    configValue: string;
    showList: boolean;
    onConfigChange: (key: string, value: string, scope: 'local' | 'global') => void;
}

export const ConfigView: React.FC<ConfigViewProps> = ({
    localConfig,
    globalConfig,
    scope,
    configKey,
    configValue,
    showList,
    onConfigChange,
}) => {

    const [keyInput, setKeyInput] = useState(configKey);
    const [valueInput, setValueInput] = useState(configValue);
    const [currentScope, setCurrentScope] = useState(scope);
    
    useEffect(() => setKeyInput(configKey), [configKey]);
    useEffect(() => setValueInput(configValue), [configValue]);
    useEffect(() => setCurrentScope(scope), [scope]);

    const effectiveConfig = useMemo(() => ({
        ...globalConfig,
        ...localConfig
    }), [localConfig, globalConfig]);
    
    const configToShow = showList ? (scope === 'local' ? localConfig : globalConfig) : effectiveConfig;
    const sortedKeys = Object.keys(configToShow).sort();

    const handleSubmit = () => {
        if (keyInput.trim()) {
            onConfigChange(keyInput, valueInput, currentScope);
        }
    };

    return (
        <div className="mt-6 border border-deep-charcoal/10 rounded-lg animate-fade-in-slide-up">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Display Panel */}
                <div>
                    <h3 className="font-bold text-deep-charcoal mb-2">
                        {showList ? `Listing ${scope} config` : 'Effective Configuration'}
                    </h3>
                    <p className="text-sm text-stone-gray mb-4">
                        {showList ? `Showing settings for the ${scope} scope.` : 'Local settings override global ones.'}
                    </p>
                    <div className="font-mono text-xs text-deep-charcoal bg-deep-charcoal/5 p-3 rounded-md max-h-60 overflow-y-auto">
                        {sortedKeys.map(key => (
                            <div key={key} className="flex">
                                <span className="text-burnt-gold">{key}=</span>
                                <span className="truncate">{configToShow[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Panel */}
                <div>
                    <h3 className="font-bold text-deep-charcoal mb-2">Set Configuration</h3>
                    <p className="text-sm text-stone-gray mb-4">
                        Add or update a configuration value for the selected scope.
                    </p>
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-deep-charcoal/80 mb-1">Scope</label>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => onConfigChange(keyInput, valueInput, 'local')}
                                    className={`px-4 py-2 text-sm rounded-md transition-colors ${currentScope === 'local' ? 'bg-burnt-gold/20 text-burnt-gold font-bold' : 'bg-deep-charcoal/5 hover:bg-deep-charcoal/10'}`}>
                                    Local
                                </button>
                                <button
                                     onClick={() => onConfigChange(keyInput, valueInput, 'global')}
                                     className={`px-4 py-2 text-sm rounded-md transition-colors ${currentScope === 'global' ? 'bg-burnt-gold/20 text-burnt-gold font-bold' : 'bg-deep-charcoal/5 hover:bg-deep-charcoal/10'}`}>
                                    Global
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="config-key" className="block text-sm font-medium text-deep-charcoal/80 mb-1">Key</label>
                            <input
                                id="config-key"
                                type="text"
                                value={keyInput}
                                onChange={e => setKeyInput(e.target.value)}
                                placeholder="e.g., user.name"
                                className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                            />
                        </div>
                        <div>
                             <label htmlFor="config-value" className="block text-sm font-medium text-deep-charcoal/80 mb-1">Value</label>
                            <input
                                id="config-value"
                                type="text"
                                value={valueInput}
                                onChange={e => setValueInput(e.target.value)}
                                placeholder="e.g., Your Name"
                                className="w-full font-mono text-sm bg-paper-white px-3 py-2 border border-deep-charcoal/20 rounded-md focus:outline-none focus:ring-2 focus:ring-burnt-gold/50"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-deep-charcoal text-paper-white py-2 rounded-md hover:bg-deep-charcoal/90 transition-colors font-bold"
                        >
                            Set {currentScope} Value
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}