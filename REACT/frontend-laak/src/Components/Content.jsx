import React from 'react';

export default function Content(PropsWithChildren) {
    const { children } = PropsWithChildren;

    return (
        <div>
            {children}
        </div>
    );
}