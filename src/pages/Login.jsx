import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error)
    }
  };

  return (
    <div
      className="h-screen bg-black bg-opacity-75 flex justify-center items-center"
      style={{
        backgroundImage:
          'url("https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
      }}
    >
      <div className="w-full max-w-md px-5 py-10 bg-black bg-opacity-80 rounded">
        <h1 className="text-white text-3xl font-bold mb-4 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
            {error && <p className="text-red-500">auth/invalid-credential</p>}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:text-white">
              Forgot password?
            </a>
          </div>
          <div className="mt-6 text-center flex justify-center">
            <p className="text-gray-400">New to Netflix?</p>
            <p className="ml-1 font-bold cursor-pointer" onClick={() => navigate("/sign-up")}>Sign Up</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
