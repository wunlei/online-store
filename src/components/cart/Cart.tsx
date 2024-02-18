import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { cartSelector } from "src/store/selectors/selectors";
import { updateCartFromLS } from "src/store/slices/appSlice";
import CartItem from "./CartItem";
import CartIcon from "../../assets/icons/cart.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import classes from "./styles.module.css";

type CartProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

function Cart(props: CartProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartSelector);
  const [isClosing, setIsClosing] = useState(false);

  let positionsCount = 0;
  let sum = 0;

  cartItems.forEach((el) => {
    positionsCount += el.count;
    sum += el.count * el.price;
  });

  function beforeClose() {
    setIsClosing(true);
    setTimeout(() => {
      props.setIsOpen(false);
    }, 200);
  }

  useEffect(() => {
    function handleLSTabUpdate(e: StorageEvent) {
      if (e.key === "cart" && e.newValue) {
        const cart = JSON.parse(e.newValue);
        dispatch(updateCartFromLS(cart));
      }
    }

    window.addEventListener("storage", handleLSTabUpdate);

    return () => {
      window.removeEventListener("storage", handleLSTabUpdate);
    };
  }, [dispatch]);

  return (
    <>
      <div
        className={`${classes["overlay"]} ${props.isOpen && classes["overlay-open"]} ${isClosing && classes["overlay-closing"]}`}
        onClick={() => {
          beforeClose();
        }}
      ></div>
      <div
        className={`${classes["cart"]} ${props.isOpen && classes["cart-open"]} ${isClosing && classes["cart-closing"]}`}
      >
        <div className={classes["cart-header"]}>
          <div className={`${classes["btn-cart"]} text-m`}>
            <CartIcon />
            cart
          </div>
          <button
            className={classes[`btn-cart-close`]}
            onClick={() => {
              beforeClose();
            }}
          >
            <CrossIcon />
          </button>
        </div>
        <div className={classes["cart-items"]}>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((el) => <CartItem key={el.id} {...el} />)
          )}
        </div>
        <div className={classes["cart-footer"]}>
          {cartItems.length === 0 ? (
            <button
              className={`btn btn_accent text-l ${classes["btn-cart_footer"]} text-l`}
              onClick={() => {
                beforeClose();
              }}
            >
              back to products
            </button>
          ) : (
            <>
              <div className={`${classes["cart-total-count"]} text-xs`}>
                {positionsCount} positions
              </div>
              <div className={"cart-total-sum text-xl"}>${sum}</div>

              <button
                className={`btn btn_accent text-l ${classes["btn-cart_footer"]} text-l`}
              >
                place an order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
