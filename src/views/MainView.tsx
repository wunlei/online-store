import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  totalSelector,
  currentCategorySelector,
  currentPageSelector,
  isProductsLoadingSelector,
  productsSelector,
} from "src/store/selectors/selectors";
import {
  getProductsFromCategory,
  getAllCategories,
} from "src/store/thunks/apiThunks";
import { updatePageNumber } from "src/store/slices/appSlice";
import { useThrottle } from "src/hooks";
import ProductCard from "src/components/product-card/ProductCard";
import Header from "src/components/header/Header";

function MainView() {
  const dispatch = useAppDispatch();
  const totalProductsCount = useAppSelector(totalSelector);
  const currentCategory = useAppSelector(currentCategorySelector);
  const currentPage = useAppSelector(currentPageSelector);
  const isLoading = useAppSelector(isProductsLoadingSelector);
  const products = useAppSelector(productsSelector);

  const isAllProductsLoaded = products.length === totalProductsCount;

  function loadMoreProducts() {
    const nextPage = currentPage + 1;
    dispatch(updatePageNumber(nextPage));
    dispatch(
      getProductsFromCategory({ category: currentCategory, page: nextPage }),
    );
  }

  function scrollHandler() {
    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.offsetHeight;
    const currentPosition = window.scrollY;

    const isBottom =
      Math.ceil(viewportHeight + currentPosition) >= pageHeight - 5;

    if (isAllProductsLoaded) {
      return;
    }

    if (isBottom && !isLoading) {
      loadMoreProducts();
    }
  }
  const scrollHandlerThrottle = useThrottle(scrollHandler, 1000);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandlerThrottle);

    return () => {
      window.removeEventListener("scroll", scrollHandlerThrottle);
    };
  }, [scrollHandlerThrottle]);

  useEffect(() => {
    dispatch(getProductsFromCategory({ category: currentCategory }));
  }, [currentCategory, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <main className="main">
      <Header />
      <div>
        {products.length === 0 ? (
          <div className="text-info text-xl">
            Ничего не найдено, попробуйте изменить запрос
          </div>
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
