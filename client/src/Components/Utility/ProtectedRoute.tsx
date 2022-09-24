import { useContext, ReactElement, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../../Context/LoadingContext";

const ProtectedRoute = ({ children }: {children: ReactElement<any, any>} ) => {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate()
  const { loading } = useContext(LoadingContext)!;

  useEffect(() => {
    if(!user && !loading) {
      navigate('/login', {replace: true});
    }
  },[navigate, user, loading])

  return children; 
}
 
export default ProtectedRoute;