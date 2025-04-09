// // components/TryOnDress.jsx
// import React, { useState } from "react";

// const API_KEY = "fa-ZpsusMOuuJc7-SV82EuEGU00JkQpnSWqAJjNS"; // Replace with your actual API key

// const TryOnDress = ({ clothImage }) => {
//   const [userImage, setUserImage] = useState(null);
//   const [resultImage, setResultImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUserImage(reader.result); // Base64 image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const runPrediction = async () => {
//     if (!userImage) return alert("Please upload your image first.");
//     setLoading(true);
//     try {
//       const response = await fetch("https://api.fashn.ai/v1/run", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model_image: userImage,
//           garment_image: clothImage,
//           category: "auto",
//         }),
//       });

//       const { id } = await response.json();

//       let status = "starting";
//       let outputUrl = null;

//       while (status !== "completed") {
//         const statusRes = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         });

//         const data = await statusRes.json();
//         status = data.status;

//         if (status === "completed") {
//           outputUrl = data.output?.[0];
//         } else if (status === "failed") {
//           throw new Error("Try-on failed.");
//         }

//         await new Promise((res) => setTimeout(res, 3000));
//       }

//       setResultImage(outputUrl);
//       setShowModal(true);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong during try-on.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col mt-6 w-full border p-4 rounded-md">
//       <input type="file" accept="image/*" onChange={handleImageUpload} />

//       <button
//         className="mt-3 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
//         onClick={runPrediction}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Try This Dress On You"}
//       </button>

//       {/* Modal */}
//       {showModal && resultImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative">
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
//               onClick={() => setShowModal(false)}
//             >
//               &times;
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Your Virtual Try-On</h3>
//             <img
//               src={resultImage}
//               alt="Virtual try-on result"
//               className="w-full rounded-md"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TryOnDress;


import React, { useState, useRef } from "react";

const API_KEY = "fa-ZpsusMOuuJc7-SV82EuEGU00JkQpnSWqAJjNS";

const TryOnDress = ({ clothImage }) => {
  const [userImage, setUserImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // NEW
  const fileInputRef = useRef();

  const downloadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "virtual-tryon.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowDropdown(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        runPrediction(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const runPrediction = async (image) => {
    setLoading(true);
    setLoadingPercent(0);
    try {
      const response = await fetch("https://api.fashn.ai/v1/run", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_image: image,
          garment_image: clothImage,
          category: "auto",
        }),
      });

      const { id } = await response.json();

      let status = "starting";
      let outputUrl = null;
      let progress = 0;

      while (status !== "completed") {
        const statusRes = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await statusRes.json();
        status = data.status;

        if (progress < 95) progress += 10;
        setLoadingPercent(progress);

        if (status === "completed") {
          outputUrl = data.output?.[0];
          setLoadingPercent(100);

          // Wait for image to fully load
          const img = new Image();
          img.onload = () => {
            setResultImage(outputUrl);
            setIsImageLoaded(true); // image is ready
            setLoading(false);
          };
          img.src = outputUrl;
        } else if (status === "failed") {
          throw new Error("Try-on failed.");
        }

        await new Promise((res) => setTimeout(res, 1000));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during try-on.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-6 w-full border p-4 rounded-md">
      <button
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        onClick={() => setShowModal(true)}
      >
        Try This Dress On You
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg max-w-2xl w-[90vw] p-10 relative">
            <button
              className="absolute top-1 right-2 text-gray-600 hover:text-black text-3xl lg:text-5xl"
              onClick={() => {
                setShowModal(false);
                setUserImage(null);
                setResultImage(null);
                setLoading(false);
                setLoadingPercent(0);
                setShowDropdown(false);
                setIsImageLoaded(false);
              }}
            >
              &times;
            </button>

            {!resultImage && (
              <>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Upload Your Photo to Try This Dress On
                </h3>
                <p className="text-sm text-center text-gray-500 mb-6 max-w-md">
                  For best results, upload a{" "}
                  <span className="font-medium text-black">
                    well-lit, front-facing full body photo
                  </span>{" "}
                  of yourself. This will help us give you the most accurate
                  virtual try-on experience.
                </p>

                <div className="relative flex justify-center mt-5">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex items-center border px-4 py-2 rounded shadow text-black font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M8 2v4M16 2v4M4 10h16M10 14h4v4h-4z" />
                    </svg>
                    CHOOSE FILES
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-12 bg-white border rounded shadow-md w-56">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          fileInputRef.current.click();
                          setShowDropdown(false);
                        }}
                      >
                        📁 From device
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </>
            )}

            {(loading || (resultImage && !isImageLoaded)) && (
              <div className="w-full text-center mt-4">
                <p className="mb-2 font-medium">
                  Processing... {loadingPercent}%
                </p>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-black h-3 rounded-full transition-all duration-300"
                    style={{ width: `${loadingPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            {resultImage && isImageLoaded && (
              <div>
                <h3 className="text-base lg:text-lg font-medium mb-2 text-center">
                  Your Virtual Try-On
                </h3>
                <img
                  src={resultImage}
                  alt="Try-on Result"
                  className="w-full rounded-md mb-4"
                />

                <div className="flex justify-center">
                  <button
                    onClick={() => downloadImage(resultImage)}
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m-6-9h6"
                      />
                    </svg>
                    Download Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOnDress;
