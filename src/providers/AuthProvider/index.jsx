import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";

function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setTokenData] = useState(null);
  const [refreshToken, setRefreshTokenData] = useState(null);


  const setToken = useCallback((tokenData) => {
    setTokenData(tokenData);

    if (tokenData) {
      Cookies.set("access-token", tokenData);
    } else {
      Cookies.remove("access-token");
    }
  }, []);

  const setRefreshToken = useCallback((tokenDataRef) => {
    setRefreshTokenData(tokenDataRef);

    if (tokenDataRef) {
      Cookies.set("refresh-token", tokenDataRef);
    } else {
      Cookies.remove("refresh-token");
    }
  }, []);


  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  }, [setToken,setRefreshToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("access-token");
    const tokenDataRef = Cookies.get("refresh-token");

    setTokenData(tokenData);
    setRefreshTokenData(tokenDataRef);

    try {
      if (tokenData) {
        const { data } = await api.auth.getProfile();
        setUser(data);
      }
    } catch {
      setToken(null);
    } finally {
      setIsLoaded(true);
    }
  }, [setToken,setRefreshToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      token,
      refreshToken,
      setUser,
      setToken,
      setRefreshToken,
      logOut,
    }),
    [isLoaded, user, token, setToken, logOut,refreshToken,setRefreshToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
