import AuthContext, { UserData, UserInput } from '../../Context/AuthContext';
import { useState, ReactNode } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (userData: UserInput) => {
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
  };

  const logout = async () => {
    const response = await fetch('auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const { message }: { message: string } = await response.json();
      return message;
    }
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
