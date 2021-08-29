import {PixelRatio} from 'react-native';

export const fontSize = (size: number, withPx = true) => {
  const pixelSize = 1 * (1.3 - PixelRatio.getFontScale() / 3.5);
  return `${Math.round(size + pixelSize)}${withPx ? 'px' : ''}`;
};
