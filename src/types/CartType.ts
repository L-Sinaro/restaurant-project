import { FoodType } from "./FoodType";
import { MenuType } from "./MenuType";

export type CartType = {
    selectedFoods: FoodType[];
    selectedMenus: MenuType[];
  };  