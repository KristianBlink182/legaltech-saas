import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';

interface Props {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SearchSelect: React.FC<Props> = ({ label, placeholder, options, value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <div className="relative">
        <input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl max-h-48 overflow-y-auto p-1.5 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange(item);
                  setQuery(item);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-slate-800 text-slate-300 hover:text-white transition"
              >
                <span>{item}</span>
                {value === item && <Check className="w-3.5 h-3.5 text-indigo-400" />}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-indigo-400 text-center font-medium">
              ✓ Usar texto personalizado: "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};