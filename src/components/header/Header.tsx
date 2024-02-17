import { useState } from "react";
import { createPortal } from "react-dom";
import Categories from "../categories/Categories";
import SearchBar from "../search/Search";
import CartIcon from "../../assets/icons/cart.svg?react";
import classes from "./styles.module.css";
import Cart from "../cart/Cart";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleSearchOpen(open: boolean) {
    setIsSearchOpen(open);
  }

  function handleCartOpen(open: boolean) {
    setIsCartOpen(open);
  }

  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <SearchBar handleSearchOpen={handleSearchOpen} />
        <Categories isOpen={isSearchOpen} />
        <button
          className="btn btn-cart text-m"
          onClick={() => {
            handleCartOpen(true);
          }}
        >
          <CartIcon />
          cart
        </button>
      </div>
      {createPortal(
        <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />,
        document.body,
      )}
    </div>
  );
}

export default Header;
