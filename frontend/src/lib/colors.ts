import { VisualCondition } from '../enums/visualCondition';

export const getColorForCondition = (condition: VisualCondition): string => {
  switch (condition) {
    case VisualCondition.Good:
      return '#3CB371';
    case VisualCondition.Repairable:
      return '#FFEB3B';
    case VisualCondition.Broken:
      return '#FF6666';
  }
};

export const hexToRgb = (hex: string): [number, number, number] | undefined => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : undefined;
};
