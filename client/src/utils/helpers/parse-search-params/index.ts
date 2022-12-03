import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useParseSearchParams = () => {
  const [params, setParams] = useState<null | URLSearchParams>(null);

  const location = useLocation();

  useEffect(() => {
    if (location) {
      setParams(new URLSearchParams(location.search));
    }
  }, [location]);

  return params;
};

export default useParseSearchParams;
