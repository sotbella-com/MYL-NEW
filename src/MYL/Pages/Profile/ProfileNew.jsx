import React, { useEffect, useState } from "react";
import FormComponent_Updated from "./FormComponent_Updated";
import FullPageLoader from "../../components/FullPageLoader";

const ProfileNew = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (1.5 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <FullPageLoader /> : <FormComponent_Updated />;
};

export default ProfileNew;
