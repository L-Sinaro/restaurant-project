import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Header } from "./header/header";
import { Home } from "./pages/home";
import { Menu } from "./pages/menu";
import { Order } from "./pages/order";
import { Food } from "./pages/food";
import { Admin } from "./pages/admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "./context/cart-context";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FoodType } from "./types/FoodType";
import { MenuType } from "./types/MenuType";
import { CartType } from "./types/CartType";

function App() {
  const [foodList, setFoodList] = useState<FoodType[]>([]); //pour faire des variables globales
  useEffect(() => {
    fetch("http://cabe0232.odns.fr/webdev-api/food") // faire ctrl shift c et aller dans network et en dessous de filter XHR/fetch
      .then((response) => response.json())
      .then((json) => setFoodList(json));
  }, []);

  const [menuList, setMenuList] = useState<MenuType[]>([]); //pour faire des variables globales
  useEffect(() => {
    fetch("http://cabe0232.odns.fr/webdev-api/menu") // faire ctrl shift c et aller dans network et en dessous de filter XHR/fetch
      .then((response) => response.json())
      .then((json) => setMenuList(json));
  }, []);

  const [cart, setCart] = useState<CartType>({
    selectedFoods: [],
    selectedMenus: [],
  });
  console.log("cart", cart);

  return (
    <BrowserRouter>
      <CartContext.Provider value={[cart, setCart]}>
        <Header />
        <main className="w-75 mx-auto p-5">
          <Routes>
            <Route>
              <Route path="*" element={<Home />} />
              <Route
                path="menu"
                element={<Menu foodList={foodList} menuList={menuList} />}
              />
              <Route path="order" element={<Order />} />
              <Route path="food" element={<Food foodList={foodList} />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </main>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
