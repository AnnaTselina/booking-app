import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useParseSearchParams = () => {
  const [params, setParams] = useState<null | URLSearchParams>(null);

  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      setParams(new URLSearchParams(search));
    }
  }, [search]);

  return params;
};

export default useParseSearchParams;
