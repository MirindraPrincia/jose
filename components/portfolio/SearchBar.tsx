'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchTest() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

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
                    onChange={(e) => setValue(e.target.value)}
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