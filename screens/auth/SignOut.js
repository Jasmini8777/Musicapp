import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {

    
    // Clear token from localStorage
    window.localStorage.removeItem("token");

    // Force page reload to update state properly
    navigate("/login", { replace: true });
    window.location.reload(); // <- Force re-render after sign out
  }, [navigate]);

  return null;
}
