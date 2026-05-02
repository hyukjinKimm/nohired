import { useContext } from "react";
import { AppContext } from "./app-context.js";

export function useApp() {
  const ctx = useContext(AppContext);
  if (ctx == null) {
    throw new Error("useApp must be used within AppContext.Provider");
  }
  return ctx;
}
