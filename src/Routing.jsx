import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import Collections from "./MYL/Pages/Product/Listing/Components/Collections";
import CommonLayout from "./MYL/Layout/CommonLayout";
import HomePage from "./MYL/Pages/Home/MainHome/HomePage";
import PricingPage from "./MYL/Pages/Pricing/PricingPage";
import FAQSection from "./MYL/Pages/FAQ/Main/FAQSection";
import LoginPageNew from "./MYL/Pages/Auth/Login/Main/LoginPage";
import ProtectedLayout from "./MYL/Layout/ProtectedLayout";
import About from "./MYL/Pages/Home/HomePage/About";
import BookAMeetingPage from "./MYL/Pages/Forms/Book A Meeting/Main/BookAMeetingPage";
// import FrameByFrameLoader from "./MYL/Loader/FrameByFrameLoader";
import ProductDetailPage from "./MYL/Pages/Product/Detail/Main/ProductDetailPage";
import TechPackPage from "./MYL/Pages/TechPack/Main/TechPack";
import FreeConsultation from "./MYL/Pages/FreeConsulation/Main/FreeConsultaion";
import Production from "./MYL/Pages/Production/Main/Production";
import Design from "./MYL/Pages/Design/Main/Design";
import GraphicDesign from "./MYL/Pages/GraphicDesign/Main/GraphicDesign";
import Sourcing from "./MYL/Pages/Sourcing/Main/Sourcing";
import Packaging from "./MYL/Pages/Packaging/Main/Packaging";
import LabelsTags from "./MYL/Pages/LabelsTags/Main/LabelsTags";
import Photography from "./MYL/Pages/Photography/Main/Photography";
import Embriodery from "./MYL/Pages/Embriodery/Main/Embriodery";
import Services from "./MYL/Pages/Home/HomePage/Services";
import PrivacyPolicy from "./MYL/Pages/Help/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./MYL/Pages/Help/TermsConditions/TermsConditions";
import OrderPage from "./MYL/Pages/Cart/OrderPage";
import HistoryList from "./MYL/Pages/History/HistoryList";
import ProfileNew from "./MYL/Pages/Profile/ProfileNew";
import CustomQuery from "./MYL/Pages/CustomQuery/CustomQuery";
import CustomQueryList from "./MYL/Pages/CustomQuery/CustomQueryList";
import CancelledBooking from "./MYL/Pages/StatusPage/CancelledBooking";
import SuccessfulBooked from "./MYL/Pages/StatusPage/SuccessfulBooked";
import ErrorBooked from "./MYL/Pages/StatusPage/ErrorBooked";

import ThankYou from "./MYL/Pages/CustomQuery/ThankYou";
import OrderConfirmation from "./MYL/Pages/Cart/Main/OrderConfirmation";
import OrderDetailPage from "./MYL/Pages/History/HistoryDetail/OrderDetailPage";
import ErrorFound from "./MYL/Pages/NotFound/ErrorFound";
import LoginWithLoader from "./MYL/Pages/Auth/Login/Main/LoginWithLoader";
import SearchWithLoader from "./MYL/Pages/Product/Search/SearchWithLoader";

// Utility function to check authentication
const isAuthenticated = () => !!localStorage.getItem("accessToken");

// Public Route Component (Accessible only to unauthenticated users)
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/collections" replace /> : children;
};

// Protected Route Component (Accessible only to authenticated users)
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// const AnimatedLayout = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(() => {
//     return sessionStorage.getItem('hasVisited') ? false : true;
//   });

//   useEffect(() => {
//     if (isLoading) {
//       // Set sessionStorage flag to ensure animation doesn't repeat in the same session
//       const timer = setTimeout(() => {
//         sessionStorage.setItem('hasVisited', 'true');
//         setIsLoading(false);
//       }, 3000); // Adjust based on animation duration

//       return () => clearTimeout(timer);
//     }
//   }, [isLoading]);

//   return isLoading ? <FrameByFrameLoader /> : children;
// };

// const AnimatedLayout = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(() => {
//     return sessionStorage.getItem("hasVisited") ? false : true;
//   });
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect if the screen is mobile or not
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768); // Mobile: <768px, Tablet & PC: ≥768px
//     };

//     handleResize(); // Check on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

// useEffect(() => {
//   if (isLoading && !isMobile) {
//     // Only show animation for tablets & PCs
//     const timer = setTimeout(() => {
//       sessionStorage.setItem("hasVisited", "true");
//       setIsLoading(false);
//     }, 3000); // Adjust based on animation duration

//     return () => clearTimeout(timer);
//   } else {
//     setIsLoading(false); // Skip animation for mobile users
//   }
// }, [isLoading, isMobile]);

//   return isLoading && !isMobile ? (
//     <FrameByFrameLoader onAnimationComplete={() => setIsLoading(false)} />
//   ) : (
//     children
//   );
// };

const Routing = () => {
  return (
    // <AnimatedLayout>
    <Routes>
      {/* MYL Layout */}
      <Route element={<CommonLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/techpack" element={<TechPackPage />} />
        <Route path="/consultation" element={<FreeConsultation />} />
        <Route path="/design" element={<Design />} />
        <Route path="/production" element={<Production />} />
        <Route path="/embroidery" element={<Embriodery />} />
        <Route path="/graphic-design" element={<GraphicDesign />} />
        <Route path="/sourcing" element={<Sourcing />} />
        <Route path="/labels" element={<LabelsTags />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/packaging" element={<Packaging />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQSection />} />
        <Route path="/contact" element={<BookAMeetingPage />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancelled-booking" element={<CancelledBooking />} />
        <Route path="/successfully-booked" element={<SuccessfulBooked />} />
        <Route path="/error-booking" element={<ErrorBooked />} />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginWithLoader />
          </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            {" "}
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/collections" element={<Collections />} />
        <Route path="/product-details/id/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<OrderPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmation />} />

        <Route path="/history" element={<HistoryList />} />
        <Route path="/order-details" element={<OrderDetailPage />} />
        {/* <Route path="/order-details" element={<OrderDetails />} /> */}
        <Route path="/profile" element={<ProfileNew />} />
        <Route path="/custom-query" element={<CustomQuery />} />  
        <Route path="/custom-query-list" element={<CustomQueryList />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/search" element={<SearchWithLoader />} />
      </Route>
      {/* MYL Layout */}

      {/* 404 Page */}
      <Route path="*" element={<ErrorFound />} />
    </Routes>
    // </AnimatedLayout>
  );
};

export default Routing;
