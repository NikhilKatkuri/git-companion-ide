"use client"

import ThemeData from "@/constants/theme";
import { ThemeInterFace } from "@/models/themeInterface";
import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
theme: ThemeInterFace;
settheme: (value: ThemeInterFace) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme,settheme] = useState<ThemeInterFace>(ThemeData[0]);

  return (
    <ThemeContext.Provider value={{ theme,settheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within a ThemeContextProvider");
  return context;
};