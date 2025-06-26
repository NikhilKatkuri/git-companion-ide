//code for BottomBar

import dark from "@/constants/theme";

export default function BottomBar() {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${dark.colors.titleBarBackgroundStart},#000)`,
      }}
      className="h-8 w-screen flex items-center justify-between px-2 select-none"
    >
      <h1>BottomBar</h1>
    </div>
  );
}
