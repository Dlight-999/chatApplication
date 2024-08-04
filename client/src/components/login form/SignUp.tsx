import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../features/users/authSlice";
import { useAppDispatch } from "../../app/hooks";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>();
  const [checkboxChecked, setCheckBoxChecked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckBoxChecked(e.target.checked);
    if (error && e.target.checked) {
      setError("");
    }
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkboxChecked) {
      setError("Please agree to the terms of use & privacy policy");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords must match");
      return;
    }

    try {
      await dispatch(
        signupUser({
          username: userData.firstName + " " + userData.lastName,
          email: userData.email,
          password: userData.password,
        })
      ).unwrap();
        navigate("/login");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <div className="signup-page flex justify-center items-center h-screen bg-gray-100">
      <form
        className="container max-w-lg bg-black flex flex-col gap-7 rounded-xl text-base p-6 justify-center w-96"
        onSubmit={handleSubmit}
      >
        <div className="signup-title flex justify-between text-center font-bold text-xl font-mono">
          <h2 className="text-white">Sign Up</h2>
          <button
            type="button"
            className="bg-white rounded-full h-6 w-6 flex justify-center items-center"
            onClick={() => (window.location.href = "/login")}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="login-input grid grid-cols-2 gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="border border-gray-300 p-3 rounded-sm"
            value={userData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="border border-gray-300 p-3 rounded-sm"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="email">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-300 p-3 rounded-sm w-full"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="Password1">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-gray-300 p-3 rounded-sm w-full"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <div className="Password2">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="border border-gray-300 p-3 rounded-sm w-full"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 border-none p-3 rounded-md text-white"
        >
          Create account
        </button>

        <div className="condition flex items-start gap-1 font-thin">
          <input
            type="checkbox"
            required
            className="mt-1"
            checked={checkboxChecked}
            onChange={handleCheck}
          />
          <p className="text-white">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        <p className="text-white">
          Already have an account?
          <span
            className="text-purple-600 font-semibold cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            <u> Login here</u>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
