import { ThemedStyledFunction } from 'styled-components';

export const theme = {
  colorAccent: '#ff9100',
  colorPrimary: '#8bc34a',
  colorPrimaryDark: '#689F38',
  colorThin: '#fffff0',
  elevationShadow1x: '0 2px 5px rgba(0, 0, 0, 0.26)',
  headerHeight: '56px',
  headerHeightWide: '64px',
  minWidthWide: '768px',
  spacing1x: '8px',
  spacing2x: '16px',
  spacing3x: '24px',
  spacing4x: '32px'
};

export type Theme = typeof theme;

interface Base<T, E extends Element>
  extends ThemedStyledFunction<T & React.HTMLProps<E>, Theme> {}

export interface ThemedHeader<T> extends Base<T, HTMLElement> {}
export interface ThemedDiv<T> extends Base<T, HTMLDivElement> {}
export interface ThemedSection<T> extends Base<T, HTMLElement> {}
export interface ThemedButton<T> extends Base<T, HTMLButtonElement> {}
