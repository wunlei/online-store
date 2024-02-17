import { useState } from "react";
import Categories from "../categories/Categories";
import SearchBar from "../search/Search";
import CartIcon from "../../assets/icons/cart.svg?react";
import classes from "./styles.module.css";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchOpen(open: boolean) {
    setIsSearchOpen(open);
  }

  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <SearchBar handleSearchOpen={handleSearchOpen} />
        <Categories isOpen={isSearchOpen} />
        <button className="btn btn-cart text-m">
          <CartIcon />
          cart
        </button>
      </div>
    </div>
  );
}

export default Header;
