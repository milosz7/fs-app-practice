import { useContext, ReactElement, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertsContext from "../../Context/AlertsContext";
import LoadingContext from "../../Context/LoadingContext";

const RouteForUnauthorized = ({ children }: {children: ReactElement<any, any>} ) => {
  const { user } = useContext(AuthContext)!;
  const { setDisplayedMessage, setMessageDisplay } = useContext(AlertsContext)!;
  const { loading } = useContext(LoadingContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if(user && !loading) {
      navigate('/');
      setDisplayedMessage('You are already logged in.');
      setMessageDisplay(true);
    }
  },[navigate, user, setMessageDisplay, setDisplayedMessage, loading])

  return children; 
}
 
export default RouteForUnauthorized;