"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextValue {
  user: { email?: string } | null;
  loading: boolean;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signInGoogle = async () => {
    // Firebase auth disabled for now.
  };

  const signOut = async () => {
    // Firebase auth disabled for now.
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
