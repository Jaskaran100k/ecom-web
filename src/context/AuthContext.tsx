import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(email);
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string) => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      return false;
    }
    setUsers([...users, { email, password }]);
    setUser(email);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
