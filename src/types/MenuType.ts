import { FoodType } from "./FoodType";

export type MenuType = {
    title:string;
    id: string;
    description:string;
    price:number;
    meal:FoodType;
    dessert:FoodType;
  };  