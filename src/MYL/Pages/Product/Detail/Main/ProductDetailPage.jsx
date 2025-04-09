import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails";

function ProductDetailPage() {
    const { id } = useParams(); // ✅ Extract ID from URL

    return (
        <div id="export-area" className="flex overflow-hidden flex-col bg-white">
            {/* ✅ Pass the id as a key to force re-render when switching products */}
            <ProductDetails key={id} productId={id} id="export-area"/>
        </div>
    );
}

export default ProductDetailPage;
