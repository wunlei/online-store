import React, { useEffect, useState } from "react";
import { useDebounce } from "src/hooks";
import { useAppDispatch } from "src/store/hooks";
import { getSearchQuery } from "src/store/thunks/apiThunks";
import SearchIcon from "../../assets/icons/search.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import classes from "./styles.module.css";

type SearchBarProps = {
  handleSearchOpen: (value: boolean) => void;
};

function SearchBar(props: SearchBarProps) {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleInputState(open: boolean) {
    setIsOpen(open);
    props.handleSearchOpen(open);
  }

  function handleInputFocus() {
    setSearchValue("");
  }

  function handleFetch(val: string) {
    dispatch(getSearchQuery({ query: val }));
  }
  const handleFetchDebounce = useDebounce(handleFetch);

  useEffect(() => {
    if (searchValue.length >= 3) {
      handleFetchDebounce(searchValue);
    }
  }, [dispatch, handleFetchDebounce, searchValue]);

  return (
    <div
      className={`${classes["search-bar-container"]} ${isOpen && classes["search-bar-container-open"]}`}
    >
      <button
        className={classes["search-btn"]}
        onClick={() => {
          handleInputState(true);
        }}
      >
        <SearchIcon />
      </button>
      <label
        className={`${classes["search-label"]} ${isOpen && classes["search-label-open"]}`}
        htmlFor="search"
      >
        <input
          className={`${classes["search-input"]} text-m`}
          type="text"
          name="search"
          id="search"
          onChange={handleInput}
          onFocus={handleInputFocus}
          value={searchValue}
          placeholder="Search..."
        />
      </label>
      <button
        className={`${classes["btn-input-close"]} ${isOpen && classes["btn-input-close-open"]}`}
        onClick={() => {
          handleInputState(false);
        }}
      >
        <CrossIcon />
      </button>
    </div>
  );
}

export default SearchBar;
