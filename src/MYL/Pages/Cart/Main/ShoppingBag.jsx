import React, { useState } from "react";

const initialProducts = [
  {
    category: "Party Wear",
    name: "RED SEQUIN PATCH-WORK DRESS...",
    size: "Small",
    material: "Cotton",
    color: "White",
    price: 6754.0,
    quantity: 1,
    image: "https://example.com/image1.jpg",
  },
  {
    category: "Casual",
    name: "BLUE FLORAL SUMMER DRESS",
    size: "Medium",
    material: "Linen",
    color: "Blue",
    price: 3450.0,
    quantity: 2,
    image: "https://example.com/image2.jpg",
  },
];

const ShoppingBag = ({ updateOrderSummary }) => {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
    updateSummary(newProducts);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: newQuantity } : product
    );
    setProducts(newProducts);
    updateSummary(newProducts);
  };

  const updateSummary = (updatedProducts) => {
    const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    updateOrderSummary({ totalQuantity, selectedProducts: updatedProducts.length, totalPrice });
  };

  return (
    <section className="mt-16 text-black max-md:mt-10 max-md:max-w-full">
      <header className="flex flex-col justify-center px-9 py-5 text-2xl font-semibold rounded-xl border border-solid bg-stone-50 border-neutral-200 max-md:px-5">
        <div className="flex justify-between items-center w-full">
          <h2>Product</h2>
          <div className="flex gap-10 items-center min-w-60">
            <span>Price</span>
            <span>Quantity</span>
            <span>Total Price</span>
            <span>Action</span>
          </div>
        </div>
      </header>

      <div className="px-9 py-9 mt-9 border bg-stone-50 border-neutral-200 rounded-[30px] max-md:px-5">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="flex justify-between items-center py-5 border-b">
              <div className="flex items-center gap-5">
                <img src={product.image} alt={product.name} className="w-[80px] h-[80px] object-cover rounded" />
                <div>
                  <p className="text-sm font-medium uppercase">{product.category}</p>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>
              </div>
              <p className="text-lg font-semibold">₹ {product.price.toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(index, product.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                <span className="px-3">{product.quantity}</span>
                <button onClick={() => updateQuantity(index, product.quantity + 1)} className="px-2 py-1 border rounded">+</button>
              </div>
              <p className="text-lg font-semibold">₹ {(product.price * product.quantity).toFixed(2)}</p>
              <button onClick={() => removeProduct(index)} className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold">Your shopping bag is empty.</p>
        )}
      </div>
    </section>
  );
};

export default ShoppingBag;
