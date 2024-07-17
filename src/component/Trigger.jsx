import React, { useEffect } from "react";

const Trigger = ({ setLoading }) => {
  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  return <></>;
};

export default Trigger;
