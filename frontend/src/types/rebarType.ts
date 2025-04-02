import { RebarConfiguration } from '../enums/rebarConfiguration';
import { ValueType } from './valueType';

export type HomogeneusRebarType = {
    id: string,
    RebarConfiguration: RebarConfiguration.Homogeneus,
    rebarConfigurationId: string,
    rebarDiameter: number,
    rebarAmount: number,   
}

export type TwoTypesRebarType = {
    id: string,
    RebarConfiguration: RebarConfiguration.TwoTypes,
    rebarConfigurationId: string,
    rebarDimaeter1: number,
    rebarAmount1: number,
    rebarDimaeter2: number,
    rebarAmount2: number,
}

export type ThreeTypesRebarType = {
    id: string,
    RebarConfiguration: RebarConfiguration.ThreeTypes,
    rebarConfigurationId: string,
    rbarDiameter1: number,
    rebarAmount1: number,
    rebarDiameter2: number,
    rebarAmount2: number,
    rebarDiameter3: number,
    rebarAmount3: number,
}

export type FourTypesRebarType = {
    id: string,
    RebarConfiguration: RebarConfiguration.FourTypes,
    rebarConfigurationId: string,
    rebarDiameter1: number,
    rebarAmount1: number,
    rebarDiameter2: number,
    rebarAmount2: number,
    rebarDiameter3: number,
    rebarAmount3: number,
    rebarDiameter4: number,
    rebarAmount4: number,
}

