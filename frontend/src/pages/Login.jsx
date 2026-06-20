import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { FaHeartbeat } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-violet-100
      via-white
      to-purple-100
      px-4
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        shadow-2xl
        rounded-3xl
        p-10
        w-full
        max-w-md
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-center
          mb-2
          text-violet-600
        "
        >
         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
                         <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
                           <FaHeartbeat size={14} className="text-white" />
                         </div>
                         <div >
                           <p className="text-xl font-semibold text-gray-900 leading-tight">FirstLook PCOS</p>
                           <p className="text-[13px] text-gray-400 mt-0.5">Health Monitor</p>
                         </div>
                 </div>
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-8
        "
        >
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Email Address"
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-violet-400
        "
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-6
          focus:outline-none
          focus:ring-2
          focus:ring-violet-400
        "
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          className="
          w-full
          bg-violet-500
          hover:bg-violet-600
          text-white
          py-3
          rounded-xl
          transition
          font-semibold
        "
        >
          Login
        </button>

        <p
          className="
          text-center
          mt-6
          text-gray-600
        "
        >
          Don't have an account?
          <Link
            to="/signup"
            className="
            text-violet-500
            ml-2
            font-semibold
          "
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;