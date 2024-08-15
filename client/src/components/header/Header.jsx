import { Link } from "react-router-dom";
import { useContext } from "react";

import logo from "/images/logo.png";
import user from "/images/user.png";
import shopping_cart from "/images/shopping-cart.png";
import admin_icon from "../../../public/images/setting.png";
import exit from "../../../public/images/exit.png";

import "./Header.css";
import Path from "../../path";
import AuthContext from "../../context/AuthContext";
import ProductsContext from "../../context/ProductContext"

export default function Header() {
  const { isAuthenticated, role } = useContext(AuthContext);
  const { cart } = useContext(ProductsContext)

  return (
    <header className="navbar">
      <div className="logo">
        <Link to={Path.Home}>
          <img className="logo-icon" src={logo} alt="" />
        </Link>
        <p className="logo-name">ИгмаВет</p>
      </div>

      {role === 'admin' ? <div>
        <Link to={Path.AdminPanel}><img className="user-icon" src={admin_icon} alt="" /></Link>
      </div> : <></>}

      <div className="navbar-menu">
        <Link to={Path.Home} className="navbar-item">
          Начало
        </Link>
        <Link to={Path.DogCategory} className="navbar-item">
          Кучета
        </Link>

        <Link to={Path.CatCategory} className="navbar-item">
          Котки
        </Link>

        {/* <Link to={Path.Home} className="navbar-item">
          Гризачи
        </Link> */}

        <Link to={Path.Adoption} className="navbar-item">
          Осиновяване
        </Link>

        <Link to={Path.Service} className="navbar-item">
          Услуги
        </Link>

        <Link to={Path.Blog} className="navbar-item">
          Блог
        </Link>

        <Link to={Path.About} className="navbar-item">
          За нас
        </Link>

        <Link to={Path.Contact} className="navbar-item">
          Контакт
        </Link>
        <div className="icons">

          {isAuthenticated ? (
            <Link to={Path.Profile}>
              <img className="user-icon" src={user} alt="" />
            </Link>
          )
            : (< Link to={Path.Register}>
              <img className="user-icon" src={user} alt="" />
            </Link>)}
        </div>
        {isAuthenticated ? (
          <Link to={Path.Logout}>
            <img src={exit} className="logout-icon" alt="" />
          </Link>
        ) : (
          <></>
        )}

        {cart.length > 0 ? <div className='cart-counter'>{cart.length}</div> : <></>}
        <Link to={Path.Cart}>
          <img className="cart-icon" src={shopping_cart} alt="" />
        </Link>
      </div>
    </header>
  );
}
