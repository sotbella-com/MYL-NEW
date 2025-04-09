// import React, { useState, useEffect, useRef, useCallback } from "react";
// import ProductGridWithCards from "./ProductGridWithCards";
// import FilterSortDrawer from "./FilterSortDrawer";
// import ProductSkeleton from "./ProductSkeleton";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// export default function Collections() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sortOption, setSortOption] = useState("relevance");
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [fetchError, setFetchError] = useState(null);
//   const [page, setPage] = useState(1);

//   const [apiLoaded, setApiLoaded] = useState(false);
//   const [skeletonDurationCompleted, setSkeletonDurationCompleted] = useState(false);

//   const limit = 15;
//   const hasFetchedProducts = useRef(false);
//   const observerRef = useRef(null);

//   // Show skeleton for a minimum of 1.5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSkeletonDurationCompleted(true);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Debounce utility
//   const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(`${baseURL}/v1/categories/17/n`);
//         if (!response.ok) throw new Error("Failed to fetch categories");

//         const data = await response.json();
//         const formattedCategories = [
//           { id: "", name: "All" },
//           ...data.data.map(cat => ({ id: cat._id, name: cat.var_title })),
//         ];
//         setCategories(formattedCategories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch products
//   const fetchProducts = async (append = false, retryCount = 0) => {
//     const currentPage = append ? page : 1;
//     if (!append) setIsLoading(true);
//     setFetchError(null);

//     try {
//       const response = await fetch(`${baseURL}/v1/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           from_price: Number(minPrice),
//           to_price: Number(maxPrice),
//           fk_category: selectedCategory || undefined,
//           page: currentPage,
//           limit,
//         }),
//       });

//       if (!response.ok) throw new Error(`Error: ${response.statusText}`);

//       const data = await response.json();
//       const fetchedProducts = data.data || [];
//       const newTotalProducts = data.total || 0;

//       setTotalProducts(newTotalProducts);
//       if (!hasFetchedProducts.current && newTotalProducts > 0) {
//         hasFetchedProducts.current = true;
//       }

//       setProducts((prev) => {
//         const uniqueProducts = [...prev, ...fetchedProducts].reduce((acc, item) => {
//           if (!acc.some((prod) => prod._id === item._id)) acc.push(item);
//           return acc;
//         }, []);
//         return append ? uniqueProducts : fetchedProducts;
//       });

//       setApiLoaded(true); // ✅ Set flag when data is fetched

//       if (append) setPage((prev) => prev + 1);
//       else setPage(2);
//     } catch (error) {
//       if (retryCount < 3) {
//         setTimeout(() => fetchProducts(append, retryCount + 1), 1000);
//       } else {
//         setFetchError("Failed to fetch products. Please try again later.");
//       }
//     } finally {
//       if (!append) setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   };

//   const sortProducts = (products, sortOption) => {
//     if (!products || products.length === 0) return products;

//     return [...products].sort((a, b) => {
//       if (sortOption === "lowToHigh") return a.default_variant.price - b.default_variant.price;
//       if (sortOption === "highToLow") return b.default_variant.price - a.default_variant.price;
//       if (sortOption === "aToZ") return a.var_title.localeCompare(b.var_title);
//       if (sortOption === "zToA") return b.var_title.localeCompare(a.var_title);
//       return 0;
//     });
//   };

//   const applyFilters = (filters, updatedSortOption) => {
//     setSelectedCategory(filters.category || "");
//     setMinPrice(Number(filters.priceRange.min) || 0);
//     setMaxPrice(Number(filters.priceRange.max) || 1000);
//     setSortOption(updatedSortOption);
//     fetchProducts(false);
//   };

//   const debouncedFetch = useCallback(debounce(fetchProducts, 300), [
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     sortOption,
//   ]);

//   useEffect(() => {
//     debouncedFetch(false);
//   }, [selectedCategory, minPrice, maxPrice, sortOption]);

//   // Infinite scroll observer
//   useEffect(() => {
//     if (!observerRef.current || isLoading || isLoadingMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && products.length < totalProducts) {
//           setIsLoadingMore(true);
//           fetchProducts(true);
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [products, totalProducts, isLoading, isLoadingMore]);

//   // ✅ Only show skeleton if either API or skeleton timer is not yet done
//   const showSkeleton = (!apiLoaded || !skeletonDurationCompleted) && products.length === 0;

//   return (
//     <div className="flex flex-col bg-white my-5">
//       {showSkeleton ? (
//         <div className="flex justify-center items-center w-full py-20">
//           <ProductSkeleton count={8} />
//         </div>
//       ) : fetchError ? (
//         <div className="text-center text-gray-600 py-10">{fetchError}</div>
//       ) : (
//         <main className="flex flex-col items-start w-[90vw] mx-auto">
//           <div className="w-full mt-4">
//             <div className="flex justify-between items-center w-full pb-4">
//               <FilterSortDrawer applyFilters={applyFilters} categories={categories} />
//             </div>
//           </div>

//           {products.length === 0 ? (
//             <div className="text-center text-gray-600 py-10">No products available</div>
//           ) : (
//             <ProductGridWithCards products={sortProducts(products, sortOption)} isLoading={isLoading} />
//           )}

//           {isLoadingMore && (
//             <div className="flex justify-center w-full py-5">
//               <ProductSkeleton count={8} />
//             </div>
//           )}

//           <div ref={observerRef} className="h-10"></div>
//         </main>
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect, useRef, useCallback } from "react";
// import ProductGridWithCards from "./ProductGridWithCards";
// import FilterSortDrawer from "./FilterSortDrawer";
// import ProductSkeleton from "./ProductSkeleton";
// import { useExport } from "./ExportContext";

// const baseURL = import.meta.env.VITE_APP_BASE_URL;

// export default function Collections() {
//   const { setExportData } = useExport();
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sortOption, setSortOption] = useState("relevance");
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [fetchError, setFetchError] = useState(null);
//   const [page, setPage] = useState(1);
//   const limit = 15;
//   const hasFetchedProducts = useRef(false);
//   const observerRef = useRef(null);

//   // Debounce utility
//   const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   useEffect(() => {
//   if (products.length > 0) {
//     const enriched = products.map((p) => ({
//       ...p,
//       var_price: p.default_variant?.selling_price || p.var_price || "0",
//     }));
//     setExportData(enriched);
//   }
// }, [products]);


//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(`${baseURL}/v1/categories/17/n`);
//         if (!response.ok) throw new Error("Failed to fetch categories");

//         const data = await response.json();
//         const formattedCategories = [
//           { id: "", name: "All" },
//           ...data.data.map((cat) => ({ id: cat._id, name: cat.var_title })),
//         ];
//         setCategories(formattedCategories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch products
//   const fetchProducts = async (append = false, retryCount = 0) => {
//     const currentPage = append ? page : 1;
//     if (!append) setIsLoading(true);
//     setFetchError(null);

//     try {
//       const response = await fetch(`${baseURL}/v1/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           from_price: Number(minPrice),
//           to_price: Number(maxPrice),
//           fk_category: selectedCategory || undefined,
//           page: currentPage,
//           limit,
//         }),
//       });

//       if (!response.ok) throw new Error(`Error: ${response.statusText}`);

//       const data = await response.json();
//       const fetchedProducts = data.data || [];
//       const newTotalProducts = data.total || 0;

//       setTotalProducts(newTotalProducts);
//       if (!hasFetchedProducts.current && newTotalProducts > 0) {
//         hasFetchedProducts.current = true;
//       }

//       setProducts((prev) => {
//         const uniqueProducts = [...prev, ...fetchedProducts].reduce((acc, item) => {
//           if (!acc.some((prod) => prod._id === item._id)) acc.push(item);
//           return acc;
//         }, []);
//         return append ? uniqueProducts : fetchedProducts;
//       });

//       if (append) setPage((prev) => prev + 1);
//       else setPage(2);
//     } catch (error) {
//       if (retryCount < 3) {
//         setTimeout(() => fetchProducts(append, retryCount + 1), 1000);
//       } else {
//         setFetchError("Failed to fetch products. Please try again later.");
//       }
//     } finally {
//       if (!append) setIsLoading(false);
//       setIsLoadingMore(false);
//     }
//   };

//   // Sort logic
//   const sortProducts = (products, sortOption) => {
//     if (!products || products.length === 0) return products;

//     return [...products].sort((a, b) => {
//       if (sortOption === "lowToHigh") return a.default_variant.price - b.default_variant.price;
//       if (sortOption === "highToLow") return b.default_variant.price - a.default_variant.price;
//       if (sortOption === "aToZ") return a.var_title.localeCompare(b.var_title);
//       if (sortOption === "zToA") return b.var_title.localeCompare(a.var_title);
//       return 0;
//     });
//   };

//   const applyFilters = (filters, updatedSortOption) => {
//     setSelectedCategory(filters.category || "");
//     setMinPrice(Number(filters.priceRange.min) || 0);
//     setMaxPrice(Number(filters.priceRange.max) || 1000);
//     setSortOption(updatedSortOption);
//     fetchProducts(false, filters, updatedSortOption);
//   };
  
//   const debouncedFetch = useCallback(debounce(fetchProducts, 300), [
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     sortOption,
//   ]);

//   useEffect(() => {
//     debouncedFetch(false);
//   }, [selectedCategory, minPrice, maxPrice, sortOption]);

//   // Infinite scroll observer
//   useEffect(() => {
//     if (!observerRef.current || isLoading || isLoadingMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && products.length < totalProducts) {
//           setIsLoadingMore(true);
//           fetchProducts(true);
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [products, totalProducts, isLoading, isLoadingMore]);

//   return (
//     <div id="export-area" className="flex flex-col bg-white my-5">
//       <ProductSkeleton count={8} duration={1500}>
//         {fetchError ? (
//           <div className="text-center text-gray-600 py-10">{fetchError}</div>
//         ) : (
//           <main className="flex flex-col items-start w-[90vw] mx-auto">
//             <div className="w-full mt-4">
//               <div className="flex justify-between items-center w-full pb-4">
//                 <FilterSortDrawer applyFilters={applyFilters} categories={categories} />
//               </div>
//             </div>

//             {products.length === 0 ? (
//               <div className="text-center text-gray-600 py-10">No products available</div>
//             ) : (
//               <ProductGridWithCards
//                 products={sortProducts(products, sortOption)}
//                 isLoading={isLoading}
//               />
//             )}

//             {isLoadingMore && (
//               <div className="flex justify-center w-full py-5">
//                 <ProductSkeleton count={8} duration={1500} />
//               </div>
//             )}

//             <div ref={observerRef} className="h-10"></div>
//           </main>
//         )}
//       </ProductSkeleton>
//     </div>
//   );
// }





import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductGridWithCards from "./ProductGridWithCards";
import FilterSortDrawer from "./FilterSortDrawer";
import ProductSkeleton from "./ProductSkeleton";
import { useExport } from "./ExportContext";
import useCurrency from "../../../../Currency/useCurrency";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default function Collections() {
  const { convertPrice, selectedCurrency } = useCurrency();
  const { setExportData } = useExport();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("relevance");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [fetchError, setFetchError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 15;
  const hasFetchedProducts = useRef(false);
  const observerRef = useRef(null);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (products.length > 0) {
      const enriched = products.map((p) => ({
        ...p,
        var_price: p.default_variant?.selling_price || p.var_price || "0",
      }));
      setExportData(enriched);
    }
  }, [products]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/v1/categories/17/n`);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        const formattedCategories = [
          { id: "", name: "All" },
          ...data.data.map((cat) => ({ id: cat._id, name: cat.var_title })),
        ];
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (append = false) => {
    const currentPage = append ? page : 1;
    setIsLoading(true);

    const payload = {
      from_price: Number(minPrice),
      to_price: Number(maxPrice),
      fk_category: selectedCategory || undefined,
      page: currentPage,
      limit,
    };

    console.log("📢 Sending API Request with Payload:", payload);

    try {
      const response = await fetch(`${baseURL}/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      console.log("✅ API Response:", data);

      if (append) {
        setProducts((prevProducts) => [...prevProducts, ...data.data]);
      } else {
        setProducts(data.data || []);
      }
      setTotalProducts(data.total || 0);
      setPage(currentPage + 1);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    console.log("📢 State updated, triggering API:", { minPrice, maxPrice });

    if (minPrice !== undefined && maxPrice !== undefined) {
      fetchProducts(false);
    }
  }, [selectedCategory, minPrice, maxPrice, sortOption]);

  const sortProducts = (products, sortOption) => {
    if (!products || products.length === 0) return products;

    return [...products].sort((a, b) => {
      if (sortOption === "lowToHigh") return a.default_variant.price - b.default_variant.price;
      if (sortOption === "highToLow") return b.default_variant.price - a.default_variant.price;
      if (sortOption === "aToZ") return a.var_title.localeCompare(b.var_title);
      if (sortOption === "zToA") return b.var_title.localeCompare(a.var_title);
      return 0;
    });
  };

  const applyFilters = (filters, updatedSortOption) => {
    console.log("🚀 Applying Filters:", filters);

    setSelectedCategory(filters.category || "");
    setMinPrice(Number(filters.priceRange.min) || 0);
    setMaxPrice(Number(filters.priceRange.max) || 1000);
    setSortOption(updatedSortOption);

    fetchProducts(false);
  };

  const debouncedFetch = useCallback(debounce(fetchProducts, 300), [
    selectedCategory,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  useEffect(() => {
    console.log("📢 State updated, triggering API:", { minPrice, maxPrice });
    if (minPrice !== undefined && maxPrice !== undefined) {
      fetchProducts(false);
    }
  }, [selectedCategory, minPrice, maxPrice, sortOption]);

  useEffect(() => {
    if (!observerRef.current || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && products.length < totalProducts) {
          setIsLoadingMore(true);
          fetchProducts(true);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [products, totalProducts, isLoading, isLoadingMore]);

  return (
    <div id="export-area" className="flex flex-col bg-white my-5">
      <ProductSkeleton count={8} duration={1500}>
        {fetchError ? (
          <div className="text-center text-gray-600 py-10">{fetchError}</div>
        ) : (
          <main className="flex flex-col items-start w-[90vw] mx-auto">
            <div className="w-full mt-4">
              <div className="flex justify-between items-center w-full pb-4">
                <FilterSortDrawer applyFilters={applyFilters} categories={categories} />
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center text-gray-600 py-10">No products available</div>
            ) : (
              <ProductGridWithCards
                products={sortProducts(products, sortOption)}
                isLoading={isLoading}
              />
            )}

            {isLoadingMore && (
              <div className="flex justify-center w-full py-5">
                <ProductSkeleton count={8} duration={1500} />
              </div>
            )}

            <div ref={observerRef} className="h-10"></div>
          </main>
        )}
      </ProductSkeleton>
    </div>
  );
}