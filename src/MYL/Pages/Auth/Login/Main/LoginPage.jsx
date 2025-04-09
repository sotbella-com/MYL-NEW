import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import login from "../../../../assets/Enterprice/login-img.webp";
import BackgroundVideo from "../../../../assets/Enterprice/login-bg-video.mp4";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const response = await axios.post(`${baseUrl}/v1/google-signin`, {
          accessToken: tokenResponse.access_token,
        });
        localStorage.setItem("accessToken", response.data.data.accessToken);
        window.dispatchEvent(new Event("user-logged-in"));
        setMessage("Google Sign-In successful!");
        navigate("/collections");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Google Sign-In failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    onError: () => setMessage("Google Sign-In failed. Please try again."),
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle OTP Request & Verification in one function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!isOtpSent) {
        const response = await axios.post(`${baseUrl}/v1/login/request-otp`, {
          email: formData.email,
        });
        setIsOtpSent(true);
        setMessage(response.data.message || "OTP sent to your email!");
      } else {
        const response = await axios.post(`${baseUrl}/v1/login/verify-otp`, formData);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        window.dispatchEvent(new Event("user-logged-in")); // ✅ trigger cart fetch
        setMessage("Login successful!");
        navigate("/collections");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("User not found.");
      } else {
        setMessage(error.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex max-lg:flex-col relative">
      {/* Back to Home */}
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-black font-medium">Home</span>
      </div>

      {/* Left Section: Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white max-lg:w-full max-md:h-auto max-md:py-8 mx-auto my-auto">
        <div className="w-full max-w-[90%]">
          <h1 className="text-center md:text-left text-6xl font-jakarta font-bold leading-[56px] text-black max-md:text-4xl max-md:leading-[48px]">
            Grow your business fast with Make Your Label
          </h1>

          {/* ✅ FIXED: Form uses `handleSubmit` */}
          <form
            className="flex flex-col mt-9 w-[60%] max-xl:w-full text-gray-600"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col p-5 w-full mb-1 rounded-xl border bg-stone-50 border-neutral-200">
              <div className="flex items-center w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-transparent outline-none text-sm lg:text-base"
                  required
                />
              </div>
            </div>

            {message && (
              <div
                className={`text-sm font-medium mb-4 ${
                  message.toLowerCase().includes("otp sent")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {isOtpSent && (
              <div className="flex flex-col p-5 w-full mb-4 rounded-xl border bg-stone-50 border-neutral-200">
                <div className="flex gap-3 items-center w-full">
                  <span className="text-gray-600">OTP</span>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full bg-transparent outline-none text-sm lg:text-base"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-5 mt-4 text-white bg-black rounded-xl hover:bg-gray-800"
            >
              {loading ? "Loading..." : isOtpSent ? "Verify OTP" : "Continue"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="w-[60%] max-xl:w-full flex gap-1 items-center mt-4 text-sm text-neutral-200">
            <div className="flex-grow h-px bg-neutral-200" />
            <span className="px-2">Or</span>
            <div className="flex-grow h-px bg-neutral-200" />
          </div>

          {/* ✅ Google Sign-In Button */}
          <button
            onClick={() => googleLogin()}
            className="w-[60%] max-xl:w-full flex justify-center items-center px-4 py-5 mt-4 bg-stone-50 rounded-xl border border-neutral-200 text-sm lg:text-base"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/bfc0beadc47e449dcbc1680b86e0a5c94640b3a2f1dcfb2cce7ae4edf3e4deba"
              alt="Google Icon"
              className="w-6 mr-2"
            />
            <span className="text-sm lg:text-base">Continue with Google</span>
          </button>
          <p 
          onClick={() => {
            window.scrollTo(0, 0); 
            navigate('/contact'); 
          }}
          className="w-[60%] max-xl:w-full mt-4">
            {" "}
            Don't have access to Private Label? Get access by &nbsp;
            <span className="text-blue-700 cursor-pointer hover:underline">clicking here</span>
          </p>
        </div>
      </div>

      {/* Right Section: Black Background */}
      <div className="w-1/2 bg-white max-lg:hidden">
        {/* <img src={login} className="object-fill w-full h-[100vh]"/> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden lg:block w-full h-full object-fill"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/b938b710248846f782ae6ffb3b070a01.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LoginPage;
