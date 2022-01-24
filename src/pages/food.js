import { CartContext } from "../context/cart-context";
import { useContext } from "react";

export const Card = ({ food }) => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div key={food.id} className="card w-25 mx-3 mb-4">
      <img src={food.photo} className="card-img-top" alt={food.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title flex-grow-1">{food.title}</h5>
        <p className="card-text flex-grow-1">{food.description}</p>
        <div className="d-flex">
          <span className="fw-bold">{food.price}€</span>
          <a
            href="#"
            className="btn btn-primary mx-3"
            onClick={() => addFoodToCart(food, cart, setCart)}
          >
            Ajouter à ma commande
          </a>
        </div>
      </div>
    </div>
  );
};
// flex grow prend toute la place en haut

export const Food = ({ foodList }) => {
  const mealCards = foodList
    .filter((food) => food.category === "PLAT")
    .map((food) => <Card key={food.id} food={food} />);

  const dessertCards = foodList
    .filter((food) => food.category === "DESSERT")
    .map((food) => <Card key={food.id} food={food} />); //programmation fonctionnelle à l'exam

  return (
    <section>
      <h2>PLATS</h2>
      <div className="d-flex flex-wrap"> {mealCards} </div>
      <h2>DESSERTS</h2>
      <div className="d-flex flex-wrap"> {dessertCards} </div>
    </section>
  );
};

const addFoodToCart = (food, cart, setCart) => {
  // console.log('addMenuToCart', food);
  const newCart = {
    ...cart,
  };
  newCart.selectedFoods.push(food);
  setCart(newCart);
  // Cart.selectedMenus.push(food); //on ne fait pas cela car il y a des effets de bord indésirables
  // setCart((oldCart) => {
  //   const newCart = {...oldCart};
  //   newCart.selectedMenus.push(food);
  //   return newCart;
  // });
};
