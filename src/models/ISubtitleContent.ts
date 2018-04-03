export interface ISubtitleContent {
  id: number;
  title: string;

  /** the locale code of the subtitle (e.g. en-US) */
  locale: string;

  /** the locale string of the subtitle (e.g. English (US)) */
  localeString: string;

  wrapStyle: string
  playResX: string
  playResY: string
  styles: ISubtitleContentStyle[];
  events: ISubtitleContentEvent[];
}

export interface ISubtitleContentStyle {
  name: string;
  fontName: string;
  fontSize: string;
  primaryColour: string;
  secondaryColour: string;
  outlineColour: string;
  backColour: string;
  bold: string;
  italic: string;
  underline: string;
  strikeout: string;
  scaleX: string;
  scaleY: string;
  spacing: string;
  angle: string;
  borderStyle: string;
  outline: string;
  shadow: string;
  alignment: string;
  marginL: string;
  marginR: string;
  marginV: string;
  encoding: string;
}

export interface ISubtitleContentEvent {
  start: string;
  end: string;
  style: string;
  name: string;
  marginL: string;
  marginR: string;
  marginV: string;
  effect: string;
  text: string;
}