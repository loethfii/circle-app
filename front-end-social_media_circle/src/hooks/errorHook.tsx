import React from "react";

const ErrorHook = () => {
  const [errorCek, setError] = React.useState("");
  return {
    errorCek,
    setError,
  };
};

export default ErrorHook;
