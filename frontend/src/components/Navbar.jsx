import { Link } from "react-router";
import { LogOut, Plus, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    // `navigate("/login");` ki need nhi coz dashboard ek protected route h and navBar dashboard ka child h
    // to auto navigate karega login p (as it follows protectedRoutes) if login nahi h
  }

  return (
    <header className="navbar bg-base-100 px-4 shadow-sm md:px-6">
      <div className="flex-1">
        <Link to="/dashboard" className="text-xl font-bold">
          Contacts App
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {user && (
          <div className="mr-2 hidden items-center gap-2 sm:flex">
            <UserRound size={18} />
            <span className="text-sm">{user.username || user.email}</span>
          </div>
        )}

        <Link to="/contacts/add" className="btn btn-primary btn-sm">
          <Plus size={17} />
          Add Contact
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-ghost btn-sm"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;