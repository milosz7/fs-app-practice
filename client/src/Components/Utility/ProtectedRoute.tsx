import { useContext, ReactElement, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertsContext from "../../Context/AlertsContext";
import LoadingContext from "../../Context/LoadingContext";

const ProtectedRoute = ({ children }: {children: ReactElement<any, any>} ) => {
  const { user } = useContext(AuthContext)!;
  const { setDisplayedMessage, setMessageDisplay } = useContext(AlertsContext)!;
  const navigate = useNavigate()
  const { loading } = useContext(LoadingContext)!;

  useEffect(() => {
    if(!user && !loading) {
      navigate('/login');
      setDisplayedMessage('You have to be logged in!');
      setMessageDisplay(true);
    }
  },[navigate, user, setMessageDisplay, setDisplayedMessage, loading])

  return children; 
}
 
export default ProtectedRoute;