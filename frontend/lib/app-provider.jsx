import { useMemo, useState } from "react";
import { AppContext } from "./app-context.js";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
