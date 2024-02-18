import { useState } from "react";
import { createPortal } from "react-dom";
import Categories from "../categories/Categories";
import SearchBar from "../search/Search";
import CartIcon from "../../assets/icons/cart.svg?react";
import classes from "./styles.module.css";
import Cart from "../cart/Cart";
import { useAppSelector } from "src/store/hooks";
import { cartSelector } from "src/store/selectors/selectors";

function Header() {
  const cart = useAppSelector(cartSelector);
  const itemsCount = cart.reduce((acc, curr) => acc + curr.count, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleSearchOpen(open: boolean) {
    setIsSearchOpen(open);
  }

  function handleCartOpen(open: boolean) {
    if (open) {
      document.body.classList.add("hide_scroll");
    } else {
      document.body.classList.remove("hide_scroll");
    }
    setIsCartOpen(open);
  }

  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <SearchBar handleSearchOpen={handleSearchOpen} />
        <Categories isOpen={isSearchOpen} />
        <button
          className={`btn btn_white text-m ${classes["btn-cart"]}`}
          onClick={() => {
            handleCartOpen(true);
          }}
        >
          <CartIcon />
          cart
          {itemsCount > 0 && (
            <div className={classes["btn-cart-icon"]}>{itemsCount}</div>
          )}
        </button>
      </div>
      {isCartOpen &&
        createPortal(
          <Cart isOpen={isCartOpen} setIsOpen={handleCartOpen} />,
          document.body,
        )}
    </div>
  );
}

export default Header;
