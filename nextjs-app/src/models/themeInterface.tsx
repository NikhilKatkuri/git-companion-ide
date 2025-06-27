export interface ThemeColors {
  // General UI colors
  background: string;
  surface: string;
  primary: string;
  secondary: string;

  // Text Colors
  text: string;
  textMuted: string;
  textError: string;
  textSuccess: string;
  iconColor?: string;

  // Border & Separators
  borderColor: string;
  separatorColor: string;

  // Title Bar specific colors (flattened for CSS variables)
  titleBarBackgroundStart: string;
  titleBarBackgroundEnd: string;
  titleBarTextColor: string;
  titleBarButtonHoverBackground: string;
  titleBarButtonActiveBackground: string;

  // Other UI Elements
  inputBackground: string;
  inputBorder: string;
  inputTextColor: string;
  scrollThumb: string;
  scrollTrack: string;
  hoverHighlight: string;
}

export interface ThemeInterFace {
  name: string;
  id: string;
  colors: ThemeColors;
}
