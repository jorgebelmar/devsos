import React, { createContext, useState, useContext } from 'react';

interface SessionContextProps {
  token: string | null;
  user: any;
  setSession: (token: string, user: any) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const setSession = (token: string, user: any) => {
    setToken(token);
    setUser(user);
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ token, user, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
