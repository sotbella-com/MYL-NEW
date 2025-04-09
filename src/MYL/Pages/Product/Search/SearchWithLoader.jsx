import React, { useEffect, useState } from "react";
import SearchProducts from "./SearchProducts";
import FullPageLoader from "../../../components/FullPageLoader";

const SearchWithLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show loader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return loading ? <FullPageLoader /> : <SearchProducts />;
};

export default SearchWithLoader;
