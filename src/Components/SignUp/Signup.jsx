// Importing CSS module for styling
import { useFormik } from "formik"; // Importing Formik for form handling
import * as Yup from "yup"; // Importing Yup for form validation
import axios from "axios"; // Importing Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import { useState } from "react";
import Image from "../../assets/icon.jpg"; // Import your logo image

export default function Register() {
  const [userMessage, setuserMessage] = useState(null); // Success message state
  const [useError, setuseError] = useState(null); // Error message state
  const [isLoading, setisLoading] = useState(false); // Loading state
  let navigate = useNavigate(); // useNavigate hook for navigation

  // Yup schema for form validation
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "cant be less than 3 chars")
      .max(10, "max is 10 chars"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,200}$/,
        "password isnt valid ( minimum 6 chars, First letter capital)"
      ),
    rePassword: Yup.string()
      .required("repass is required")
      .oneOf([Yup.ref("password"), "DOESNT MATCH PASSWORD"]),
    phone: Yup.string()
      .required()
      .matches(/^(002)?01[0125][0-9]{8}$/, "phone isnt valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema, // Validation schema
    onSubmit: (values) => {
      registerForm(values); // Handle form submission
      console.log(values);
    },
  });

  async function registerForm(values) {
    setisLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setuserMessage(response.data.message); // Set success message
      console.log(response.data);

      setisLoading(false); // Set loading state to false
      navigate("/login"); // Navigate to login page after successful registration
    } catch (err) {
      setisLoading(false); // Set loading state to false
      setuseError(err.response.data.message); // Set error message
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 signup pt-4">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-bold text-gray-300   dark:text-white"
        >
          <img className="w-8 h-8 mr-2  " src={Image} alt="logo" />
          Register Form
        </a>
        <div className="w-full bg-black bg-opacity-70 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl dark:text-white">
              Register Now
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
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                  First Name
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  className="text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {formik.touched.name && formik.errors.name ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

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
              <div>
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                  Re-Password
                </label>
                <input
                  name="rePassword"
                  type="password"
                  id="rePassword"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                  className="text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    {formik.errors.rePassword}
                  </div>
                ) : null}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
                >
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  id="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  className="text-gray-200 placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                  >
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>

              {/* Link to Login Page */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
