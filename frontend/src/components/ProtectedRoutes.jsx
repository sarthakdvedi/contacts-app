import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth(); // value return karega

  if (authLoading) { // user load hora h
    return null;
    // dashboard k loading se y spinner conflict karra tha, 2 spinners are the, to yaha simply null return karre h
    // return (
    //   <div className="min-h-screen flex items-center justify-center">
    //     <span className="loading loading-spinner loading-lg text-primary"></span>
    //   </div>
    // );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  // Navigate redirect krta h automatic
    // replace history stack m last url ko replace krta h.
    // isse user back button daba k fir LoginPage pe nahi jaa paega.
    // otherwise, 1. navigate to login hota
    // 2. user press back -> wapas protectedRoute p unauth jata -> 1. (loop) 

  }

  return children;
}

export default ProtectedRoute;