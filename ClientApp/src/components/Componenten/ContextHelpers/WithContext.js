import { createElement } from 'react';

export default function WithContext(contextProvider, component) {
    return () => createElement(
        contextProvider,
        {},
        createElement(
            component
        )
    )
}