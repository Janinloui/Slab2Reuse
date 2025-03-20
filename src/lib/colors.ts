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
