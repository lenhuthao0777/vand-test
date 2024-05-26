import { PokemonType } from '../enums/type.enum';

export function removeEmptyValues(obj: any) {
  const filteredObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      // Optimized check
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export const getColor = (type: string) => {
  return PokemonType[type as keyof typeof PokemonType];
};
