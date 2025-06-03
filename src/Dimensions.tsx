import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size: number, baseWidth = 375) => (width / baseWidth) * size;
const verticalScale = (size: number, baseHeight = 667) => (height / baseHeight) * size;
const moderateScale = (size: number, factor = 0.5, baseWidth = 375) =>
  size + (scale(size, baseWidth) - size) * factor;

export { width, height, scale, verticalScale, moderateScale };
