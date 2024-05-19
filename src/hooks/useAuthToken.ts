import { useState } from 'react';

const useAuthToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
};

export default useAuthToken;
