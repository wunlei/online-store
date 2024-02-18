import { useAppDispatch } from "src/store/hooks";
import {
  updateCartItemCount,
  removeItemFromCart,
} from "src/store/slices/appSlice";
import { CartProduct } from "src/store/slices/appSlice.types";
import TrashcanIcon from 'src/assets/icons/trashcan.svg?react';
import classes from "./styles.module.css";

function CartItem(props: CartProduct) {
  const dispatch = useAppDispatch();

  function handleCountUpdate(value: number) {
    const newCount = props.count + value;
    if (newCount < 1 || newCount > props.stock) {
      return;
    }

    dispatch(updateCartItemCount({ id: props.id, count: newCount }));
  }

  function handleDeleteItem() {
    dispatch(removeItemFromCart(props.id));
  }

  return (
    <div className={classes["cart-item"]}>
      <img className={classes["cart-item-img"]} src={props.thumbnail} alt="" />
      <div className={classes["cart-item-content"]}>
        <div className="text-s">{props.title}</div>
        <div className={`${classes["cart-item-counter"]} text-xs`}>
          <button
            className={classes["counter-btn"]}
            disabled={props.count === 0}
            onClick={() => handleCountUpdate(-1)}
          >
            -
          </button>
          <div className={classes["counter-number"]}>{props.count}</div>
          <button
            className={classes["counter-btn"]}
            disabled={props.count === props.stock}
            onClick={() => handleCountUpdate(1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={`${classes["cart-price"]} text-s`}>${props.price}</div>
      <button
        className={`${classes["btn-delete"]} text-s`}
        onClick={handleDeleteItem}
      >
        <TrashcanIcon/>
      </button>
    </div>
  );
}

export default CartItem;
