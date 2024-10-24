import { RECIPE_ICONS } from './RECIPE_ICONS'

export const getPictureUrl = (mainIngredient) => {
  const icon = RECIPE_ICONS.find((icon) => icon.key === mainIngredient);
  return icon ? icon.url : "";
};
