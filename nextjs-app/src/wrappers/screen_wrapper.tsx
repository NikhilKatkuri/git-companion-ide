//code for ScreenWrapper
// screen_wrapper.tsx
"use client";

import BottomBar from "@/components/bottom-bar";
import SideNavigationBar from "@/components/side-navigation-bar";
import TitleBar from "@/components/Title-bar";
import { useThemeContext } from "@/context/themeContext";


export default function ScreenWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {theme}=useThemeContext()
  return (

    <div
      style={{
        backgroundColor: theme.colors.background,
      }}
      className={`w-screen h-screen`}
    >
      <TitleBar />

      <div className="h-[calc(100%-4.5rem)] w-full flex">
        <div
        className={`h-full w-12 bg-white/1 overflow-hidden`}>
          <SideNavigationBar/>
        </div>
        <div className="h-full w-[calc(100%-3rem)]">{children}</div>
      </div>
      <BottomBar />
    </div>
  );
}
