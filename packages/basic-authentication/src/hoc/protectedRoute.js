import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const protectedRoute =
  (Comp, route = "/profile") =>
  (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      async function checkAuthState() {
        try {
          await Auth.currentAuthenticatedUser();
        } catch (err) {
          navigate(route);
        }
      }
      checkAuthState();
    }, [navigate]);
    return <Comp {...props} />;
  };

export default protectedRoute;
