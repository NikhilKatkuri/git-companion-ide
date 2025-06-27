import { ThemeInterFace } from "@/models/themeInterface";

 

const ThemeData: ThemeInterFace[] = [
  {
    name: "VS Code Dark+ Modern",
    id: "vscode-dark",
    colors: {
      // 🌑 General UI
      background: "#1e1e1e", // editor background
      surface: "#252526", // panel background
      primary: "#007acc", // primary accent (blue)
      secondary: "#0e639c", // secondary buttons / hover

      // 📝 Text
      text: "#d4d4d4", // default text color
      textMuted: "#999999", // less important text
      textError: "#f48771", // red errors
      textSuccess: "#89d185", // green success
      
      iconColor:"text-stone-300",

      // 🔲 Borders
      borderColor: "#3c3c3c",
      separatorColor: "#2d2d2d",

      // 🪟 Title Bar (Windows style)
      titleBarBackgroundStart: "#1f1f1f",
      titleBarBackgroundEnd: "#323232",
      titleBarTextColor: "text-[#cccccc] hover:text-white", 
      titleBarButtonHoverBackground: "rgba(255,255,255,0.08)",
      titleBarButtonActiveBackground: "rgba(255,255,255,0.15)",

      // 🧩 Components
      inputBackground: "#3c3c3c",
      inputBorder: "#555555",
      inputTextColor: "#ffffff",
      scrollThumb: "#424242",
      scrollTrack: "#2a2a2a",
      hoverHighlight: "rgba(255, 255, 255, 0.05)",
    },
  },
  {
    name: "Dark Mode (Default)",
    id: "dark",
    colors: {
      // General UI
      background: "#1a1a1a",
      surface: "#2a2a2a",
      primary: "#8e24aa",
      secondary: "#5e35b1",

      // Text Colors
      text: "#e0e0e0",
      textMuted: "#b0b0b0",
      textError: "#ff6b6b",
      textSuccess: "#4CAF50",

      // Border & Separators
      borderColor: "#3a3a3a",
      separatorColor: "#444444",

      // Title Bar (Windows-specific gradient suggested by user)
      titleBarBackgroundStart: "#2c3e50", // Flattened to CSS variable names
      titleBarBackgroundEnd: "#4a69bd",
      titleBarTextColor: "#ffffff",
      titleBarButtonHoverBackground: "rgba(255, 255, 255, 0.2)",
      titleBarButtonActiveBackground: "rgba(255, 255, 255, 0.3)",

      // Other UI Elements
      inputBackground: "#333333",
      inputBorder: "#555555",
      inputTextColor: "#ffffff",
      scrollThumb: "#555555",
      scrollTrack: "#333333",
      hoverHighlight: "rgba(255, 255, 255, 0.1)",
    },
  },
  {
    name: "Light Mode",
    id: "light",
    colors: {
      // General UI
      background: "#f0f2f5",
      surface: "#ffffff",
      primary: "#3f51b5",
      secondary: "#00bcd4",

      // Text Colors
      text: "#212121",
      textMuted: "#616161",
      textError: "#d32f2f",
      textSuccess: "#388e3c",

      // Border & Separators
      borderColor: "#e0e0e0",
      separatorColor: "#cccccc",

      // Title Bar (Windows-specific gradient)
      titleBarBackgroundStart: "#f7f9fc",
      titleBarBackgroundEnd: "#e0e5ea",
      titleBarTextColor: "#333333",
      titleBarButtonHoverBackground: "rgba(0, 0, 0, 0.1)",
      titleBarButtonActiveBackground: "rgba(0, 0, 0, 0.2)",

      // Other UI Elements
      inputBackground: "#ffffff",
      inputBorder: "#bbbbbb",
      inputTextColor: "#000000",
      scrollThumb: "#aaaaaa",
      scrollTrack: "#e5e5e5",
      hoverHighlight: "rgba(0, 0, 0, 0.05)",
    },
  },
];

 export  default ThemeData
