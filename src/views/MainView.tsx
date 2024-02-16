import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { currentCategorySelector, productsSelector } from "src/store/selectors/selectors";
import { getProductsFromCategory } from "src/store/thunks/apiThunks";
import ProductCard from "src/components/product-card/ProductCard";

function MainView() {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(currentCategorySelector);
  const products = useAppSelector(productsSelector);

  useEffect(() => {
    dispatch(getProductsFromCategory({ category: currentCategory }));
  }, [currentCategory, dispatch]);

  return (
    <main className="main">
      <div>
        {products.length === 0 ? (
          <div>Ничего не найдено, попробуйте изменить запрос</div>
        ) : (
          <div className="products-container">
            {products.map((el) => (
              <ProductCard key={el.id} {...el} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MainView;
