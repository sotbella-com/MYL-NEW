// import React, { useState } from "react";
// import ShoppingBag from "./ShoppingBag";
// import OrderDetails from "./OrderDetails";

// const AddCart = () => {
//   const [orderSummary, setOrderSummary] = useState({
//     totalQuantity: 0,
//     selectedProducts: 0,
//     totalPrice: 0,
//   });

//   return (
//     <main className="overflow-hidden bg-white">

//       <div className="flex flex-col px-16 mt-16 w-full max-md:px-5">
//         <header>
//           <h1 className="text-2xl font-semibold">Shopping Bag</h1>
//           <p className="mt-2.5 text-lg">
//             <strong>{orderSummary.selectedProducts} Items</strong> in your bag.
//           </p>
//         </header>
//         <ShoppingBag updateOrderSummary={setOrderSummary} />
//         <OrderDetails summary={orderSummary} />
//       </div>
//     </main>
//   );
// };

// export default AddCart;


import React, { useEffect, useState } from "react";
import ShoppingBag from "./ShoppingBag";
import OrderDetails from "./OrderDetails";
import CartSkeleton from "./CartSkeleton";

const AddCart = () => {
  const [orderSummary, setOrderSummary] = useState({
    totalQuantity: 0,
    selectedProducts: 0,
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-hidden bg-white">
      {loading ? (
        <CartSkeleton />
      ) : (
        <div className="flex flex-col px-16 mt-16 w-full max-md:px-5">
          <header>
            <h1 className="text-2xl font-semibold">Shopping Bag</h1>
            <p className="mt-2.5 text-lg">
              <strong>{orderSummary.selectedProducts} Items</strong> in your bag.
            </p>
          </header>
          <ShoppingBag updateOrderSummary={setOrderSummary} />
          <OrderDetails summary={orderSummary} />
        </div>
      )}
    </main>
  );
};

export default AddCart;
