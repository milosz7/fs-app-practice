import AuthContext, { UserData, UserInput } from '../../Context/AuthContext';
import { useState, ReactNode, useContext } from 'react';
import AlertsContext from '../../Context/AlertsContext';
import LoadingContext from '../../Context/LoadingContext';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const { displayError, displaySuccess } = useContext(AlertsContext)!;
  const { setLoading } = useContext(LoadingContext)!;
  const navigate = useNavigate();

  const login = async (userData: UserInput) => {
    try {
      setLoading(true);
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const status = response.status;
      if (status === 200) {
        const { user }: { user: UserData } = await response.json();
        setUser(user);
        setLoading(false);
        navigate('/');
      }
      if (status !== 200) {
        const { message }: { message: string } = await response.json();
        throw new Error(message);
      }
    } catch (e) {
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server.');
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch('/auth/logout', {
        method: 'DELETE',
      });
      const status = response.status;
      const { message }: { message: string } = await response.json();

      if (status === 200) {
        setLoading(false);
        setUser(null);
        displaySuccess(message);
        navigate('/');
      }
      if (status !== 200) {
        throw new Error(message);
      }
    } catch (e) {
      e instanceof Error
        ? displayError(e.message)
        : displayError('Failed to connect with the server.');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
