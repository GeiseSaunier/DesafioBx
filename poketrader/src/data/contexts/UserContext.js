import React, { createContext, useState } from 'react'

export const UserContext = createContext({});

export function UserProvider({ children, ...rest }) {
    const [user, setUser] = useState({});

    function setCurrentUser(user) {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{
            user,
            setCurrentUser,
        }}>
            {children}
        </UserContext.Provider>
    );
}