import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { cartSelector } from "src/store/selectors/selectors";
import { addItemToCart } from "src/store/slices/appSlice";
import { Product } from "src/api/Api.types";
import StarIcon from "../../assets/icons/star.svg?react";
import CartIcon from "../../assets/icons/cart.svg?react";
import classes from "./styles.module.css";

function ProductCard(props: Product) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    thumbnail,
    images,
    id,
  } = props;
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(cartSelector).find((el) => el.id === id);
  const initPrice = Math.floor((price * 100) / (100 - discountPercentage));

  function handleAddToCart() {
    dispatch(addItemToCart({ count: 1, id, price, stock, title, thumbnail }));
  }

  return (
    <div className={classes["card"]}>
      <div className={"badge badge_white text-s"}>
        <span className="text_accent">{discountPercentage}%</span> off-sale
      </div>
      <img className={classes["card-img"]} src={images[0]} alt="" />

      <div className={classes["card-content"]}>
        <div className="badge badge_white text-s">
          <StarIcon />
          {rating}
        </div>
        <h2 className="text-s">{title}</h2>
        <div className={`${classes["card-description"]} text-xs gray-main}`}>
          <p className={classes["text-hidden"]}>{description}</p>
          <span className="text_accent">Read more</span>
        </div>
        <div className={classes["card-price"]}>
          {isInCart ? (
            <button className={`btn ${classes["btn-price"]}`}>
              <CartIcon /> added to cart
            </button>
          ) : (
            <button
              className={`btn ${classes["btn-price"]}`}
              onClick={handleAddToCart}
            >
              <CartIcon />${price}
            </button>
          )}
          <span className="text_stroke text-s">${initPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
