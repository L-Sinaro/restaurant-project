import { CartContext } from "../context/cart-context";
import { useContext } from "react";
import { useState } from "react";

export const MenuCard = ({ menu, foodList }) => {
  const [cart, setCart] = useContext(CartContext);
  const [meal, setMeal] = useState(null);
  const [dessert, setDessert] = useState(null);
  var mealsCheckbox = foodList
    .filter((food) => food.category === "PLAT" && food.menuId === menu.id)
    .map((food) => (
      <MenuCardCheckbox key={`selectedMenu-${Math.random()}`} menu={menu} food={food} setChecked={setMeal} />
    ));
  var dessertsCheckbox = foodList
    .filter((food) => food.category === "DESSERT")
    .map((food) => (
      <MenuCardCheckbox key={`selectedMenu-${Math.random()}`} menu={menu} food={food} setChecked={setDessert} />
    ));
  return (
    <div className="card w-25 mx-3 mb-4">
      <div className="card-header">
        <h4 className="card-title">{menu.title}</h4>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <h6>Choisir un plat :</h6>
          <div>{mealsCheckbox}</div>
        </div>
        <div className="mt-3">
          <h6>Choisir un dessert :</h6>
          <div>{dessertsCheckbox}</div>
        </div>
        <div className="d-flex mt-3">
          <span className="fw-bold">{menu.price}€</span>
          <button
            disabled={!meal || !dessert}
            className="btn btn-primary mx-3"
            onClick={() => addMenuToCart(menu, cart, setCart, meal, dessert)}
          >
            Ajouter à ma commande
          </button>
        </div>
      </div>
    </div>
  );
};

export const MenuCardCheckbox = ({ menu, food, setChecked }) => {
  return (
    <div key={food.id} className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name={`menu-${menu.id}-${food.category}`}
        id={`menu-${menu.id}-${food.id}`}
        onChange={() => setChecked(food)}
      />
      <label
        className="form-check-label"
        htmlFor={`menu-${menu.id}-${food.id}`}
      >
        {food.title}
      </label>
    </div>
  );
};

export const Menu = ({ foodList, menuList }) => {
  const menuCards = menuList.map((menu) => (
    <MenuCard key={`menu-${menu.id}`} menu={menu} foodList={foodList} />
  ));
  return <div className="d-flex flex-wrap">{menuCards}</div>;
};

const addMenuToCart = (menu, cart, setCart, meal, dessert) => {
  // console.log('addMenuToCart', food);
  const newCart = {
    ...cart,
  };
  menu.meal = meal;
  menu.dessert = dessert;
  newCart.selectedMenus.push(menu);
  setCart(newCart);
  // Cart.selectedMenus.push(food); //on ne fait pas cela car il y a des effets de bord indésirables
  // setCart((oldCart) => {
  //   const newCart = {...oldCart};
  //   newCart.selectedMenus.push(food);
  //   return newCart;
  // });
};
