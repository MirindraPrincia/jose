'use client';

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

type SearchBarProps = {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false); // ✅ maintenant défini

    useEffect(() => {
        function onClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', onClickOutside);
        }
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, [open]);

    return (
        <div ref={containerRef} style={{ maxWidth: '400px', margin: '2rem auto', position: 'relative' }}>
            <button onClick={() => setOpen(true)}>Ouvrir la recherche</button>
            {open && (
                <input
                    autoFocus
                    type="text"
                    placeholder="Tape ici..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        marginTop: '1rem',
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                    }}
                />
            )}
        </div>
    );
}