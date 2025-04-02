import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { RebarConfiguration } from '../enums/rebarConfiguration';
import { ValueType } from './valueType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';

export type CrossSectionType = {
    [CrossSectionKeyType.id]: string,
    [CrossSectionKeyType.width]: number,
    [CrossSectionKeyType.height]: number,
    [CrossSectionKeyType.moment]: number,
    [CrossSectionKeyType.shear]: number,
    [CrossSectionKeyType.normal]: number,
    rebarConfiguration: RebarConfiguration,
    crossSectionCategory: CrossSectionCategory,
}

export const CrossSectionTypeValueMap: Record<keyof CrossSectionType, ValueType> = {
    [CrossSectionKeyType.id]: 'string',
    [CrossSectionKeyType.width]: 'number',
    [CrossSectionKeyType.height]: 'number',
    [CrossSectionKeyType.moment]: 'number',
    [CrossSectionKeyType.shear]: 'number',
    [CrossSectionKeyType.normal]: 'number',
    rebarConfiguration: 'RebarConfiguration',
    crossSectionCategory: 'CrossSectionCategory',
};