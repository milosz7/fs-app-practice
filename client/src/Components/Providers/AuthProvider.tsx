import AuthContext, { UserData, UserInput } from '../../Context/AuthContext';
import { useState, ReactNode } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (userData: UserInput) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const { message }: { message: string } = await response.json();
        return message;
      }
      const { user }: { user: UserData } = await response.json();
      setUser(user);
    } catch {
      return 'Failed to connect with the server.';
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('auth/logout', {
        method: 'DELETE',
      });
      if (!response.ok) {
        const { message }: { message: string } = await response.json();
        return message;
      }
      setUser(null);
    } catch {
      return 'Failed to connect with the server.';
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
