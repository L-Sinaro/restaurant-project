import logo from "./Logo.png";
import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import { Link } from "react-router-dom";

const menus = [
  {
    name: "Accueil",
    url: "/home",
  },
  {
    name: "Carte",
    url: "/food",
  },
  {
    name: "Menus",
    url: "/menu",
  },
  {
    name: "Commande",
    url: "/order",
  }
];

const navItems = menus.map((menu) => {
  return (
    <li className="nav-item mx-3" key={menu.url}>
      <Link className="nav-link active" aria-current="page" to={menu.url}>
        {menu.name}
      </Link>
    </li>
  );
});

export const Header = () => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <nav className="navbar navbar-light bg-light w-100 d-flex walign-items-center">
      <img
        src={logo}
        alt="logo"
        width="120"
        className="navbar-brand mx-5"
        href="#"
      />
      <ul className="navbar-nav flex-grow-1 d-flex flex-row justify-content-end mx-5 mb-2">
        {navItems}
        <i className="bi-basket position-relative fs-3">
          <span
            className="position-absolute badge rounded-pill bg-primary"
            style={{ fontSize: "0.4em" }}
          >
            {cart.selectedFoods.length + cart.selectedMenus.length}
          </span>
        </i>
      </ul>
    </nav>
  );
};
