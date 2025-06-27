"use client";

import Image from "next/image";
import { dragRegion, noDragRegion } from "@/lib/electronStyles";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/themeContext";

const navbarList = ["file", "edit", "view", "terminal", "help"];

// Declare the global Electron API type for TypeScript
declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onWindowStateChange?: (
        callback: (state: "maximized" | "unmaximized") => void
      ) => () => void; // Added return type for unsubscribe
    };
  }
}

export default function TitleBar() {
  const { theme } = useThemeContext();
  // Ensure 'theme' always has a fallback to prevent errors if theme is not yet loaded
  // or if its structure is incomplete during initial renders.
 

  const [electronControls, setElectronControls] =
    useState<typeof window.electronAPI | null>(null); // Initialize with null

  const [isMaximized, setIsMaximized] = useState(false); // State to track window maximization

  useEffect(() => {
    // Check if window and electronAPI are defined before setting controls
    if (typeof window !== "undefined" && window.electronAPI) {
      setElectronControls(window.electronAPI);

      // Set up listener for window state changes
      const unsubscribe = window.electronAPI.onWindowStateChange?.((state) => {
        setIsMaximized(state === "maximized");
      });

      // Initial check for window state (if needed, though maximize/unmaximize handlers handle it)
      // You might need an initial IPC call to get the current state if not handled by maximize/unmaximize events.

      // Clean up the listener when the component unmounts
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${theme.colors.titleBarBackgroundStart}, ${theme.colors.titleBarBackgroundEnd})`,
        // Use a default text color if theme.colors.titleBarTextColor isn't available
        color: theme.colors.titleBarTextColor || '#abb2bf', 
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
                className={`text-xs ${theme.colors.titleBarTextColor} px-3 py-1 rounded hover:bg-titlebar-hover active:bg-titlebar-active transition-colors`}
                style={noDragRegion}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Window Controls */}
      <div className="flex items-center gap-4 h-8" style={noDragRegion}> {/* Apply noDragRegion here too for controls */}
        {/* Minimize Button */}
        <button
          onClick={() => electronControls?.minimize()}
          // Ensure a fallback class if theme.colors.iconColor is not defined
          className={`${theme.colors.iconColor || 'text-gray-400'} cursor-alias hover:bg-gray-700 active:bg-gray-600 rounded p-1`}
          aria-label="Minimize"
          disabled={!electronControls} // Disable if electronControls is not ready
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        {/* Maximize/Restore Button */}
        <button
          onClick={() => electronControls?.maximize()}
          className={`${theme.colors.iconColor || 'text-gray-400'} hover:bg-gray-700 active:bg-gray-600 rounded p-1`}
          aria-label={isMaximized ? "Restore Down" : "Maximize"}
          disabled={!electronControls} // Disable if electronControls is not ready
        >
          {isMaximized ? (
            // Restore Down Icon (two overlapping squares)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path d="M12 3h9v9h-9zm-2 2H3v9h7zM12 5v7h7V5h-7zM5 12v-7h7v7H5z" /> {/* Simplified for example, real icon may vary */}
              <path fillRule="evenodd" d="M8.25 4.5A.75.75 0 0 1 9 3.75h5.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75H9A.75.75 0 0 1 8.25 9V4.5ZM12 12.75a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75H12.75a.75.75 0 0 1-.75-.75V12.75Z" clipRule="evenodd" />
            </svg>
          ) : (
            // Maximize Icon (single square)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="size-4"
            >
              <path d="M640-160v-360H160v360h480Zm80-200v-80h80v-360H320v200h-80v-200q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v360q0 33-23.5 56.5T800-360h-80ZM160-80q-33 0-56.5-23.5T80-160v-360q0-33 23.5-56.5T160-600h480q33 0 56.5 23.5T720-520v360q0 33-23.5 56.5T640-80H160Zm400-603ZM400-340Z" />
            </svg>
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={() => {
            electronControls?.close();
          }}
          className={`${theme.colors.iconColor || 'text-gray-400'} px-2 h-full hover:bg-red-500 rounded p-1`}
          aria-label="Close"
          disabled={!electronControls} // Disable if electronControls is not ready
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}