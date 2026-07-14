import { Link } from "react-router";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { registerUser } from "../../api/authApi";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(formData);
      toast.success("Registered");
      navigate("/login");
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-base-content/60 mt-2">
              Register to manage your contacts
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            <label className="form-control">
              <span className="label-text mb-1">Username</span>

              <div className="input input-bordered flex items-center gap-2">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="grow"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Email */}
            <label className="form-control">
              <span className="label-text mb-1">Email</span>

              <div className="input input-bordered flex items-center gap-2">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="grow"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Password */}
            <label className="form-control">
              <span className="label-text mb-1">Password</span>

              <div className="input input-bordered flex items-center gap-2">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="grow"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Confirm Password */}
            <label className="form-control">
              <span className="label-text mb-1">Confirm Password</span>

              <div className="input input-bordered flex items-center gap-2">
                <ShieldCheck size={18} />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="grow"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
            </label>

            {/* Button */}
            <button className="btn btn-primary w-full mt-4">
              Register
            </button>

          </form>

          {/* Footer */}
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary font-medium"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;