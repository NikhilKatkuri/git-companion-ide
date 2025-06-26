//code for ScreenWrapper

import BottomBar from "@/components/bottom-bar";
import TitleBar from "@/components/Title-bar";
import dark from "@/constants/theme";

export default function ScreenWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        backgroundColor: dark.colors.background,
      }}
      className={`w-screen h-screen`}
    >
      <TitleBar />
      <div className="h-[calc(100%-4.5rem)] w-full flex">
        <div
        className={`h-full w-12 bg-white/1`}></div>
        <div className="h-full w-[calc(100%-3rem)]">{children}</div>
      </div>
      <BottomBar />
    </div>
  );
}
