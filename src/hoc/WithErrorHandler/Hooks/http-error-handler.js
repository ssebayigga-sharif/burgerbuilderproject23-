import { useState, useEffect } from "react";

const useHttpErrorHandler = (httpClient) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request interceptor clears previous errors
    const reqInterceptor = httpClient.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    // Response interceptor catches errors
    const resInterceptor = httpClient.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
        return Promise.reject(err);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [httpClient]);

  const clearError = () => setError(null);

  return [error, clearError];
};

export default useHttpErrorHandler;
