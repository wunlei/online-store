import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { categoriesSelector } from "src/store/selectors/selectors";
import { updateCategory, updatePageNumber } from "src/store/slices/appSlice";
import { getCategoryFromUrl } from "src/utils";
import classes from "./styles.module.css";

const allCategoriesValue = "all";

type CategoriesProps = {
  isOpen: boolean;
};

function Categories(props: CategoriesProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesSelector);

  const [pickedValue, setPickedValue] = useState(() => {
    const urlCategory = getCategoryFromUrl();
    if (urlCategory) {
      return urlCategory;
    }
    return allCategoriesValue;
  });

  function handleCategoryUpdate(category: string) {
    setPickedValue(category);
    window.history.pushState({}, "", `?category=${category}`);
    dispatch(updateCategory(category));
    dispatch(updatePageNumber(0));
  }

  return (
    <div
      className={`${classes["categories-container"]} ${props.isOpen && classes["categories-container-hidden"]}`}
    >
      <label
        className={`${classes["categories-btn"]} ${pickedValue === allCategoriesValue ? classes["categories-btn-active"] : ""}`}
        htmlFor={allCategoriesValue}
      >
        <input
          className={`${classes["categories-btn-input"]} ${
            pickedValue === allCategoriesValue
              ? classes["categories-btn-input-active"]
              : ""
          }`}
          type="radio"
          name="category"
          value={allCategoriesValue}
          id={allCategoriesValue}
          onChange={() => handleCategoryUpdate(allCategoriesValue)}
          checked={pickedValue === allCategoriesValue}
        />
        all
      </label>
      {categories.map((el) => (
        <label
          className={`${classes["categories-btn"]} ${pickedValue === el ? classes["categories-btn-active"] : ""}`}
          key={el}
          htmlFor={el}
        >
          <input
            className={`${classes["categories-btn-input"]} ${pickedValue === el ? classes["categories-btn-input-active"] : ""}`}
            type="radio"
            name="category"
            value={el}
            id={el}
            checked={pickedValue === el}
            onChange={() => handleCategoryUpdate(el)}
          />
          {el}
        </label>
      ))}
    </div>
  );
}

export default Categories;
