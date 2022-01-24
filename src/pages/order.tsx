import { CartContext } from "../context/cart-context";
import { useContext } from "react";
import { FoodType } from "../types/FoodType";
import { MenuType } from "../types/MenuType";
import { CartType } from "../types/CartType";

type FoodPropsType = {
  food: FoodType;
};

type MenuPropsType = {
  menu: MenuType;
};

export const FoodRow = ({ food }: FoodPropsType) => {
  return (
    <tr>
      <td>{food.title}</td>
      <td>{food.price}</td>
    </tr>
  );
};

export const MenuRow = ({ menu }: MenuPropsType) => {
  return (
    <tr>
      <td>
        {menu.title}
        <ul>
          <li>{menu.meal.title}</li>
          <li>{menu.dessert.title}</li>
        </ul>
      </td>

      <td>{menu.price}</td>
    </tr>
  );
};

export const Order = () => {

  const [cart] = useContext<[CartType]>(CartContext);

  const foodOrder = cart.selectedFoods.map((article) => {
    <FoodRow  food={article} />;
  });

  const menuOrder = cart.selectedMenus.map((menu) => {
     <MenuRow menu={menu} />;
  });

  const sum = //privilégier des let ou const plutot que var
  (
    cart.selectedFoods.reduce((pv, cv) => pv + cv.price, 0) +
    cart.selectedMenus.reduce((pv, cv) => pv + cv.price, 0)
  ).toFixed(2);
  console.log(sum);
  const order = {
    id: Math.random() * 10000,
    description:
      cart.selectedFoods.reduce(
        (resultat, selected) =>
          resultat + selected.title + " (" + selected.price + " €)\n",
        ""
      ) +
      cart.selectedMenus.reduce(
        (resultat, selected) =>
          resultat +
          selected.title +
          " (" +
          selected.price +
          " €) : " +
          selected.meal.title +
          " , " +
          selected.dessert.title +
          "\n",
        ""
      ),
    price: sum,
    date: new Date(),
    client: "sinaro LY",
  };

  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  console.log(order);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Article</th>
            <th scope="col">Prix</th>
          </tr>
        </thead>
        <tbody>
          {foodOrder}
          {menuOrder}
        </tbody>
        <tfoot>
          <tr>
            <th scope="col">Total</th>
            <th scope="col">{sum}</th>
          </tr>
        </tfoot>
      </table>
      <div className="d-flex mt-3">
        <button
          disabled={
            cart.selectedMenus.length === 0 && cart.selectedFoods.length === 0
          }
          className="btn btn-primary mx-3"
          onClick={() =>
            fetch("http://cabe0232.odns.fr/webdev-api/order", options)
              .then(
                // rajouter un catch au cas où le serveur ne répond pas
                (res) => {
                  if (res.status >= 200 && res.status < 400) {
                    window.alert("Commande envoyée chakal");
                    console.log("sent");
                  } else {
                    window.alert("t'as déconné chakal");
                    console.log("error");
                  }
                }
              )
              .then(() => {
                console.log("le serveur ne répond pas");
              })
          }
        >
          Commander
        </button>
      </div>
    </>
  );
};
