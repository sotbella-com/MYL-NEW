import React from "react";

import ShoppingBagHeader from "./ShoppingBagHead";
import ProductListHeader from "./ProductListHeader";
import ProductCard from "./ProductCard";
import OrderSummary from "./OrderSummary";

import { Product, OrderSummaryType } from "./types";

const AddCart: React.FC = () => {
    const products: Product[] = [
        {
            category: "Party Wear",
            name: "RED SEQUIN PATCH-WORK DRESS...",
            size: "Small",
            material: "Cotton",
            color: "White",
            price: 6754.0,
            quantity: 80,
            image:
                "https://cdn.builder.io/api/v1/image/assets/c3781a61f99f45d9979de044d3603935/694a795fbf2938d87241ef75baa7cf072854735bda3236aa0119cdf847ef1cfa",
        },
        // Repeated for the other two identical products
    ];

    const orderSummary: OrderSummaryType = {
        totalQuantity: 80,
        selectedProducts: 4,
        totalPrice: 540320.0,
    };

    return (
        <main className="flex overflow-hidden flex-col items-center bg-white">


            <div className="flex flex-col items-center w-full max-w-[1312px] px-4">
                <ShoppingBagHeader />
                <ProductListHeader />

                <section className="w-full space-y-3 mt-9">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </section>

                <OrderSummary summary={orderSummary} />
            </div>
        </main>
    );
};

export default AddCart;
