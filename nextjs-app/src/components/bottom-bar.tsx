//code for BottomBar

import { useThemeContext } from "@/context/themeContext";

 

export default function BottomBar() {
  const {theme}=useThemeContext()
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${theme.colors.titleBarBackgroundStart},#000)`,
      }}
      className="h-8 w-screen flex items-center justify-between px-2 select-none"
    >
      <h1>BottomBar</h1>
    </div>
  );
}
