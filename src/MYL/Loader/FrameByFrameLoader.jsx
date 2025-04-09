import React, { useState, useEffect } from 'react';

const FrameByFrameLoader = ({ onAnimationComplete }) => {
  const frames = Array.from({ length: 9 }, (_, i) => `/loader-frames/frame${i + 1}.png`); // Replace with actual frame paths
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const totalDuration = 3000; // Total animation duration (5 seconds)
    const frameDuration = totalDuration / frames.length; // Duration for each frame (555ms)

    let frameIndex = 0;
    const interval = setInterval(() => {
      frameIndex++;
      setCurrentFrame((prev) => (prev + 1) % frames.length);

      if (frameIndex === frames.length) {
        clearInterval(interval);
        onAnimationComplete(); // Animation complete
      }
    }, frameDuration);

    return () => clearInterval(interval);
  }, [frames.length, onAnimationComplete]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <img
        src={frames[currentFrame]}
        alt="Loader Frame"
        style={{
          width: '100%',
          height: '100%',
          // objectFit: 'contain', // Ensure it scales proportionally without distortion
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      />
    </div>
  );
};

export default FrameByFrameLoader;

// import React, { useState, useEffect } from 'react';

// const FrameByFrameLoader = ({ onAnimationComplete }) => {
//   const frames = Array.from({ length: 9 }, (_, i) => `/loader-frames/frame${i + 1}.png`); // Replace with actual frame paths
//   const [currentFrame, setCurrentFrame] = useState(0);

//   useEffect(() => {
//     const totalDuration = 5000; // Total animation duration (5 seconds)
//     const frameDuration = totalDuration / frames.length; // Duration for each frame (555ms for 9 frames)

//     let frameIndex = 0;

//     const interval = setInterval(() => {
//       frameIndex++;
//       setCurrentFrame((prev) => (prev + 1) % frames.length);

//       if (frameIndex === frames.length) {
//         clearInterval(interval);
//         onAnimationComplete(); // Notify the parent component that the animation is done
//       }
//     }, frameDuration);

//     return () => clearInterval(interval);
//   }, [frames.length, onAnimationComplete]);

//   return (
//     <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
//       <img
//         src={frames[currentFrame]}
//         alt="Loader Frame"
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//       />
//     </div>
//   );
// };

// export default FrameByFrameLoader;

