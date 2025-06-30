import React, { createContext } from "react";

import { rootStore } from "../stores/RootStore";

export const StoreCtx = createContext(rootStore);

export const StoreProvider = ({ children }) => (
  <StoreCtx.Provider value={rootStore}>{children}</StoreCtx.Provider>
);
