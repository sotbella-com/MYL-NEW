// import React, { useEffect, useRef } from "react";
// import { useTransform, motion, useScroll } from "framer-motion";
// import Lenis from "@studio-freight/lenis";
// import { workItems } from "../../../../Data/Work/WorkData";
// import styles from "./Parallax.module.scss";
// import { Link } from "react-router-dom";

// const ParallaxScroll = () => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });

//   useEffect(() => {
//     const lenis = new Lenis();
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//   }, []);

//   return (
//     <main ref={container} id="parallaxMain">
//       {workItems.map((item, i) => {
//         const targetScale = Math.max(1 - (workItems.length - i) * 0.05, 0.85); // ✅ Prevent shrinking issue
//         return (
//           <Card
//             key={`w_${i}`}
//             i={i}
//             {...item}
//             progress={scrollYProgress}
//             range={[i * 0.25, 1]}
//             targetScale={targetScale}
//           />
//         );
//       })}
//     </main>
//   );
// };

// const Card = ({
//   i,
//   title,
//   description,
//   image,
//   lern,
//   route,
//   imagePosition,
//   progress,
//   range,
//   targetScale,
// }) => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start end", "start start"],
//   });

//   const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
//   const scale = useTransform(progress, range, [1, targetScale]);

//   // ✅ Detect screen width dynamically
//   const isMobile = window.innerWidth < 1024;

//   return (
//     <div ref={container} className={styles.parallaxCardContainer}>
//       <motion.div
//         style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
//         className={styles.parallaxCard}
//       >
//         <h2>{title}</h2>
//         <div
//           className={styles.parallaxBody}
//           style={{
//             flexDirection: isMobile
//               ? "column-reverse"
//               : imagePosition === "left"
//               ? "row"
//               : "row-reverse", // ✅ Adjust layout dynamically
//             alignItems: isMobile ? "center" : "flex-start",
//           }}
//         >
//           <div className={styles.parallaxDescription}>
//             <p>{description}</p>
//             <span>
//               <Link route={route}>{lern}</Link>
//             </span>
//           </div>

//           <div className={styles.parallaxImageContainer}>
//             <motion.div
//               className={styles.parallaxInner}
//               style={{ scale: imageScale }}
//             >
//               <img src={image} alt={title} />
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ParallaxScroll;

// import React, { useEffect, useRef } from "react";
// import { useTransform, motion, useScroll } from "framer-motion";
// import Lenis from "@studio-freight/lenis";
// import { workItems } from "../../../../Data/Work/WorkData";
// import styles from "./Parallax.module.scss";
// import { Link } from "react-router-dom";

// const ParallaxScroll = () => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });

//   useEffect(() => {
//     const lenis = new Lenis();
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//   }, []);

//   return (
//     <main ref={container} id="parallaxMain">
//       {workItems.map((item, i) => {
//         const targetScale = Math.max(1 - (workItems.length - i) * 0.05, 0.85);
//         return (
//           <Card
//             key={`w_${i}`}
//             i={i}
//             {...item}
//             progress={scrollYProgress}
//             range={[i * 0.25, 1]}
//             targetScale={targetScale}
//           />
//         );
//       })}
//     </main>
//   );
// };

// const Card = ({
//   i,
//   title,
//   description,
//   image,
//   lern,
//   route,
//   imagePosition,
//   progress,
//   range,
//   targetScale,
// }) => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start end", "start start"],
//   });

//   const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
//   const scale = useTransform(progress, range, [1, targetScale]);

//   const isMobile = window.innerWidth < 1024;

//   return (
//     <div ref={container} className={styles.parallaxCardContainer}>
//       <motion.div
//         style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
//         className={styles.parallaxCard}
//       >
//         <h2 className="font-jakarta">{title}</h2>
//         <div
//           className={styles.parallaxBody}
//           style={{
//             flexDirection: isMobile
//               ? "column-reverse"
//               : imagePosition === "left"
//               ? "row"
//               : "row-reverse",
//             alignItems: isMobile ? "center" : "flex-start",
//           }}
//         >
//           <div className={styles.parallaxDescription}>
//             <p className="font-inter">{description}</p>
//             <br />
//             <span onClick={() => window.scrollTo(0, 0)}
//             >
//               <Link to={route}>{lern}</Link>
//             </span>
//           </div>

//           <div className={styles.parallaxImageContainer}>
//             <motion.div className={styles.parallaxInner} style={{ scale: imageScale }}>
//               <img src={image} alt={title} />
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ParallaxScroll;

// import React, { useEffect, useRef } from "react";
// import { useScroll, motion } from "framer-motion";
// import Lenis from "@studio-freight/lenis";
// import { workItems } from "../../../../Data/Work/WorkData";
// import styles from "./Parallax.module.scss";
// import { Link } from "react-router-dom";

// const ParallaxScroll = () => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });

//   useEffect(() => {
//     const lenis = new Lenis();
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//   }, []);

//   return (
//     <>
//     <div className="w-[90vw] mx-auto mb-10">
//     <div className="shrink-0 border-2 border-black border-solid"></div>
//       <div className="flex justify-between text-base leading-tight text-black mt-4">
//         <div>Services</div>
//         <div>04</div>
//       </div>
//       </div>

//     <main ref={container} id="parallaxMain">
//       {workItems.map((item, i) => (
//         <Card
//           key={`w_${i}`}
//           i={i}
//           {...item}
//           progress={scrollYProgress}
//         />
//       ))}
//     </main>
//     </>
//   );
// };

// const Card = ({
//   i,
//   title,
//   description,
//   image,
//   lern,
//   route,
//   imagePosition,
// }) => {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start end", "start start"],
//   });

//   // ✅ Remove scaling transformation to keep all cards the same size
//   const imageScale = useScroll(scrollYProgress, [0, 1], [1, 1]);

//   // ✅ Ensure all cards have the same scale (remove individual scaling)
//   return (
//     <>
//     <div id="parallax-section" ref={container} className={styles.parallaxCardContainer}>
//       <motion.div
//         style={{
//           scale: 1, // Keep all cards at the same scale
//           top: `calc(-5vh + ${i * 10}px)`,
//         }}
//         className={styles.parallaxCard}
//       >
//         <h2 className="font-jakarta">{title}</h2>
//         <div
//           className={styles.parallaxBody}
//           style={{
//             flexDirection:
//               window.innerWidth < 1024
//                 ? "column-reverse"
//                 : imagePosition === "left"
//                 ? "row"
//                 : "row-reverse",
//             alignItems: window.innerWidth < 1024 ? "center" : "flex-start",
//           }}
//         >
//           <div className={styles.parallaxDescription}>
//             <p className="font-inter">{description}</p>
//             <br />
//             <span onClick={() => window.scrollTo(0, 0)}>
//               <Link to={route}>{lern}</Link>
//             </span>
//           </div>

//           <div className={styles.parallaxImageContainer}>
//             <motion.div className={styles.parallaxInner} style={{ scale: imageScale }}>
//               <img src={image} alt={title} />
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//     </>
//   );
// };

// export default ParallaxScroll;

import React, { useEffect, useRef, useState } from "react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { workItems } from "../../../../Data/Work/WorkData";
import styles from "./Parallax.module.scss";
import { Link } from "react-router-dom";

const ParallaxScroll = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Update the current index when scrolling
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      workItems.length - 1,
      Math.max(0, Math.floor(latest * workItems.length))
    );
    setCurrentIndex(index);
  });

  return (
    <>
      <div className="w-[90vw] mx-auto mb-10">
        <div className="shrink-0 border-2 border-black border-solid"></div>
        <div className="flex justify-between text-base leading-tight text-black mt-4">
          <div>Services</div>
          <div>04</div>
        </div>
      </div>

      <main ref={container} id="parallaxMain">
        {workItems.map((item, i) => (
          <Card key={`w_${i}`} i={i} {...item} progress={scrollYProgress} />
        ))}
      </main>
    </>
  );
};

const Card = ({
  i,
  title,
  description,
  image,
  lern,
  icon,
  route,
  imagePosition,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // ✅ Remove scaling transformation to keep all cards the same size
  const imageScale = useScroll(scrollYProgress, [0, 1], [1, 1]);

  // ✅ Ensure all cards have the same scale (remove individual scaling)
  return (
    <>
      <div
        id="parallax-section"
        ref={container}
        className={styles.parallaxCardContainer}
      >
        <motion.div
          style={{
            scale: 1, // Keep all cards at the same scale
            top: `calc(-5vh + ${i * 10}px)`,
          }}
          className={styles.parallaxCard}
        >
          {/* <div className={styles.cardCounter}>{i + 1}</div> */}
          <span className={styles.cardCounter}>
            {String(i + 1).padStart(2, "0")}/
            {String(workItems.length).padStart(2, "0")}
          </span>

          <h2 className="font-jakarta font-bold text-black">{title}</h2>
          <div
            className={styles.parallaxBody}
            style={{
              flexDirection:
                window.innerWidth < 1024
                  ? "column-reverse"
                  : imagePosition === "left"
                  ? "row"
                  : "row-reverse",
              alignItems: window.innerWidth < 1024 ? "center" : "flex-start",
            }}
          >
            <div className={styles.parallaxDescription}>
              <p className="font-inter font-semibold text-lg md:text-xl text-gray-550">
                {description}
              </p>
              <br />
              {/* <span onClick={() => window.scrollTo(0, 0)}>
              <Link to={route} className="text-blue-700">{lern}</Link>
            </span> */}
              <Link to={route}>
                <div className={styles.btncontainer} onClick={() => window.scrollTo(0, 0)}>
                  <button
                    className={styles.messagingbtn}
                  >
                    {lern}
                  </button>
                  <span className={styles.icon}>{icon}</span>
                </div>
              </Link>
            </div>

            <div className={styles.parallaxImageContainer}>
              <motion.div
                className={styles.parallaxInner}
                style={{ scale: imageScale }}
              >
                <img src={image} alt={title} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ParallaxScroll;
