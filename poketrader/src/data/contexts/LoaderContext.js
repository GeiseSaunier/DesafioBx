import React, { createContext, useState } from 'react'

export const LoaderContext = createContext({});

export function LoaderProvider({ children, ...rest }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoaderContext.Provider value={{
            isLoading,
            setIsLoading,
        }}>
            {children}
        </LoaderContext.Provider>
    );
}