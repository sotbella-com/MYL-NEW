// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import './App.css';
// import App from "./App.jsx";
// import { CartProvider } from "./MYL/Pages/Cart/CartContext.jsx";
// // import { CartProvider } from "./NewDesign/CartPage/CartContext.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import CurrencyProvider from "./MYL/Currency/CurrencyContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <CurrencyProvider>
//       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//         <CartProvider> {/* Wrap the App with CartProvider */}
//           <App />
//         </CartProvider>
//       </GoogleOAuthProvider>
//     </CurrencyProvider>
//   </StrictMode>
// );



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

import { CartProvider } from "./MYL/Pages/Cart/CartContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CurrencyProvider from "./MYL/Currency/CurrencyContext.jsx";
import { ExportProvider } from "./MYL/Pages/Product/Listing/Components/ExportContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> 
      <ExportProvider>
        <CurrencyProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <CartProvider>
              <App />
            </CartProvider>
          </GoogleOAuthProvider>
        </CurrencyProvider>
      </ExportProvider>
    </BrowserRouter>
  </StrictMode>
);
