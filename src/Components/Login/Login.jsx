import * as Yup from "yup"; // Importing Yup for form validation
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

import Image from "../../assets/icon.jpg";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
export default function Login() {
  let { token, settoken } = useContext(TokenContext);

  const [userMessage, setuserMessage] = useState(null); // Success message state
  const [useError, setuseError] = useState(null); // Error message state
  const [isLoading, setisLoading] = useState(false); // Loading state
  let navigate = useNavigate(); // useNavigate hook for navigation

  // Yup schema for form validation
  let mySchema = Yup.object({
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,200}$/,
        "password isnt valid ( minimum 6 chars, First letter capital)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema, // Validation schema
    onSubmit: (values) => {
      loginform(values); // Handle form submission
      console.log(values);
    },
  });

  async function loginform(values) {
    setisLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setuserMessage(response.data.message); // Set success message
      console.log(response.data);
      settoken(response.data.token);
      localStorage.setItem("userToken", response.data.token);
      setisLoading(false); // Set loading state to false
      navigate("/"); // Navigate to login page after successful registration
    } catch (err) {
      setisLoading(false); // Set loading state to false
      setuseError(err.response.data.message); // Set error message
    }
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 signup">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-bold text-white dark:text-white"
          >
            <img className="w-8 h-8 mr-2  " src={Image} alt="logo" />
            Login Form
          </a>
          <div className="w-full bg-black bg-opacity-70 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-white">
                Login Now
              </h1>

              {/* Display error message if there is one */}
              {useError ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                  role="alert"
                >
                  {useError}
                </div>
              ) : null}

              {/* Display success message if registration is successful */}
              {userMessage ? (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100"
                  role="alert"
                >
                  {userMessage}
                </div>
              ) : null}

              {/* Form with various input fields */}
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    className="text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                      role="alert"
                    >
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    className="text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                      role="alert"
                    >
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                {/* Re-Password Field */}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>

                {/* Link to Login Page */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    signup here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
