import React, { useEffect, useState } from "react";
import LoginPageNew from "./LoginPage";
import FullPageLoader from "../../../../components/FullPageLoader";

const LoginWithLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // ⏱ 1.5 seconds loader

    return () => clearTimeout(timer);
  }, []);

  return loading ? <FullPageLoader /> : <LoginPageNew />;
};

export default LoginWithLoader;
