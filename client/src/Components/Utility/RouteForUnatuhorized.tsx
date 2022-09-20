import { useContext, ReactElement, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorsContext from "../../Context/ErrorsContext";

const RouteForUnauthorized = ({ children }: {children: ReactElement<any, any>} ) => {
  const { user } = useContext(AuthContext)!;
  const { setErrorMessage, setDisplayError } = useContext(ErrorsContext)!;
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate('/');
      setErrorMessage('You are already logged in.');
      setDisplayError(true);
    }
  },[navigate, user, setDisplayError, setErrorMessage])

  return children; 
}
 
export default RouteForUnauthorized;