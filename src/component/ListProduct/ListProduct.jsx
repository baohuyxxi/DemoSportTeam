import "./ListProduct.scss";
import CardProduct from "../CardProduct/CardProduct";
import Pagination from "../Pagination/Pagination";
import productAPI from "~/services/apis/productAPI";
import SkeletonListProduct from "../SkeletonListProduct/SkeletonListProduct";
import Arrange from "../Arrange/Arrange";

import { useEffect, useState } from "react";
export default function ListProduct({ loadFilter, setLoadFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);
  const [countProduct, setCountProduct] = useState(0);
  const [listProducts, setListProducts] = useState([]);
  const [listProductFilter, setListProductFilter] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.allProducts().then((data) => {
      setListProducts(data.products);
    });
  }, []);

  useEffect(() => {
    let sortedList = [...listProductFilter];
    sortProducts(sortedList);
    setListProductFilter(sortedList);
  }, [sortBy, loadFilter]);

  const sortProducts = (sortedList) => {
    const timer = setTimeout(() => {
      if (sortBy === "priceLowToHigh") {
        sortedList.sort((a, b) => a.variants[0].price - b.variants[0].price);
      }
      if (sortBy === "priceHighToLow") {
        sortedList.sort((a, b) => b.variants[0].price - a.variants[0].price);
      }
    }, 200);
  };
  useEffect(() => {
    if (loadFilter === true && listProducts.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const from = params.get("from");
        const to = params.get("to");
        const category = params.get("category")
          ? params.get("category").split(",")
          : [];
        const tags = params.get("tags") ? params.get("tags").split(",") : [];

        let list = listProducts.filter((item) => {
          if (!from && !to && !tags && !category) {
            return item;
          } else {
            if (
              from &&
              to &&
              (item.variants[0].price < parseInt(from) ||
                item.variants[0].price > parseInt(to))
            ) {
              return false;
            }
            if (tags.length === 0 && category.length === 0) {
              return item;
            } else {
              if (
                tags.find((r) => {
                  return item.tags.toLowerCase() === r.toLowerCase();
                })
              ) {
                return item;
              }
              if (
                category.find((r) => {
                  return item.product_type.toLowerCase() === r.toLowerCase();
                })
              ) {
                return item;
              }
              return false;
            }
          }
        });
        if (sortBy !== "default") {
          sortProducts(list);
        }
        setCurrentPage(1);
        setListProductFilter(list);
        setCountProduct(list.length);
        setLoading(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loadFilter, listProducts]);
  useEffect(() => {
    const startIndex = (currentPage - 1) * productPerPage;
    const endIndex = Math.min(startIndex + productPerPage, countProduct);
    setCurrentProducts(listProductFilter.slice(startIndex, endIndex));
  }, [listProductFilter, currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
  };
  return (
    <div className="page__list-product col l-9 m-8 c-12">
      {loading === true && loadFilter=== true ? (
        <SkeletonListProduct />
      ) : (
        <>
          <div className="header__list-product row">
            <div className="product-count col l-10 m-9 c-12">
              Showing {countProduct} product
            </div>
            <Arrange sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <div className="container__list-product row">
            {currentProducts.map((item, index) => (
              <CardProduct key={index} product={item} />
            ))}
          </div>
          <div className="container__pagination">
            <Pagination
              count={countProduct}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
