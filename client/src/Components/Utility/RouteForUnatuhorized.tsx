import { useContext, ReactElement, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertsContext from "../../Context/AlertsContext";

const RouteForUnauthorized = ({ children }: {children: ReactElement<any, any>} ) => {
  const { user } = useContext(AuthContext)!;
  const { setDisplayedMessage, setMessageDisplay } = useContext(AlertsContext)!;
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate('/');
      setDisplayedMessage('You are already logged in.');
      setMessageDisplay(true);
    }
  },[navigate, user, setMessageDisplay, setDisplayedMessage])

  return children; 
}
 
export default RouteForUnauthorized;