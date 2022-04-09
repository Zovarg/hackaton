import { createContext } from "react";

export const AuthContext = createContext({
  isLoaded: false,
  user: null,
  token: null,
  refreshToken: null,
  setUser: () => {},
  setToken: () => {},
  setRefreshToken: () => {},
  logOut: () => {},
});
