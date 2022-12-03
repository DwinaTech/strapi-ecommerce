import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protector = ({ Component }) => {
  const navigate = useNavigate();
  const loggedIn = false;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return <Component />;
};
