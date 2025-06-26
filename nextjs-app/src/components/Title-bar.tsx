"use client";

import Image from "next/image";
import dark from "@/constants/theme";
import { dragRegion, noDragRegion } from "@/lib/electronStyles";
import { useEffect, useState } from "react";
const navbarList = ["file", "edit", "view", "terminal", "help"];

declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onWindowStateChange?: (
        callback: (state: "maximized" | "unmaximized") => void
      ) => void;
    };
  }
}

export default function TitleBar() {
  const [electronControls, setElectronControls] =
    useState<typeof window.electronAPI>();
  useEffect(() => {
    if (typeof window !== "undefined" && window.electronAPI) {
      setElectronControls(window.electronAPI);
    }
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${dark.colors.titleBarBackgroundStart}, ${dark.colors.titleBarBackgroundEnd})`,
        // color: dark.colors.titleBarTextColor,
        ...dragRegion,
      }}
      className="w-full h-10 flex items-center justify-between px-2 select-none"
    >
      {/* Left Side: Logo + Navbar */}
      <div className="flex items-center gap-3">
        <Image
          src="/Star_Fall_Minimalistic.png"
          alt="App Logo"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <ul className="hidden md:flex gap-1">
          {navbarList.map((item, index) => (
            <li key={index}>
              <button
                className={`text-xs ${dark.colors.titleBarTextColor}  px-3 py-1 rounded hover:bg-titlebar-hover active:bg-titlebar-active transition-colors`}
                style={noDragRegion}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Window Controls */}
      <div className="flex items-center gap-2" style={noDragRegion}>
        <button
          onClick={() => {}}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110"
          aria-label="Minimize"
        />
        <button
          onClick={() => electronControls?.maximize()}
          className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110"
          aria-label="Maximize"
        />
        <button
          onClick={() => {
            electronControls?.close();
          }}
          className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110"
          aria-label="Close"
        />
      </div>
    </div>
  );
}
