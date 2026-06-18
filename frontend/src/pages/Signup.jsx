import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    ageGroup: "",
    height: "",
    weight: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {

      setError(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      await api.post(
        "/auth/signup",
        {
          ...form,
          age: Number(form.age),
          height: Number(form.height),
          weight: Number(form.weight)
        }
      );

      alert(
        "Account created successfully"
      );

      navigate("/login");

    } 
    catch (error) {

  console.log("Signup Error:", error);

  console.log(
    "Response:",
    error.response?.data
  );

  setError(
    JSON.stringify(
      error.response?.data
    ) || "Signup failed"
  );

} 
    finally {

      setLoading(false);

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
      py-10
    "
    >

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-3xl
        shadow-2xl
        w-full
        max-w-lg
      "
      >

        <h1
          className="
          text-4xl
          text-center
          font-bold
          text-violet-600
          mb-2
        "
        >
          Create Account
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-8
        "
        >
          Join PCOS Detection
        </p>

        {error && (

          <div
            className="
            bg-red-100
            text-red-600
            p-3
            rounded-lg
            mb-4
          "
          >
            {error}
          </div>

        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <select
          name="ageGroup"
          value={form.ageGroup}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        >
          <option value="">
            Select Age Group
          </option>

          <option value="Youth">
            Youth (15-24)
          </option>

          <option value="Young Adult">
            Young Adult
          </option>

          <option value="Reproductive Age Group">
            Reproductive Age Group
          </option>

          <option value="Adult Women">
            Adult Women
          </option>

        </select>

        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-4
        "
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="
          w-full
          p-3
          border
          rounded-xl
          mb-6
        "
          required
        />

        <button
          type="submit"
          disabled={loading}
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
          {loading
            ? "Creating Account..."
            : "Sign Up"}
        </button>

        <p
          className="
          text-center
          mt-6
          text-gray-600
        "
        >
          Already have an account?

          <Link
            to="/login"
            className="
            text-violet-500
            ml-2
            font-semibold
          "
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Signup;