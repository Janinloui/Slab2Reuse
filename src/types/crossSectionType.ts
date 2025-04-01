import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { ValueType } from './valueType';

export type CrossSectionType = {
    id: string,
    crossSectionCategory: CrossSectionCategory,
    width: number,
    height: number,
    rebarConfigurationId: string,
    moment: number,
    shear: number,
    normal: number
}

export const CrossSectionTypeValueMap: Record<keyof CrossSectionType, ValueType> = {
    id: 'string',
    crossSectionCategory: 'enum',
    width: 'number',
    height: 'number',
    rebarConfigurationId: 'string',
    moment: 'number',
    shear: 'number',
    normal: 'number',
};