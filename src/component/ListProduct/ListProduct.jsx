import "./ListProduct.scss";
import CardProduct from "../CardProduct/CardProduct";
import Pagination from "../Pagination/Pagination";
import productAPI from "~/services/apis/productAPI";
import SkeletonListProduct from "../SkeletonListProduct/SkeletonListProduct";
import Arrange from "../Arrange/Arrange";

import { useEffect, useState } from "react";

function ListProduct({ loadFilter, setLoadFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(12);
  const [listProducts, setListProducts] = useState([]);
  const [listProductFilter, setListProductFilter] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    productAPI.allProducts().then((data) => {
      setListProducts(data.products);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || listProducts.length === 0) return;
    let filteredList = [...listProducts];
    filteredList = filteredList.filter(filterProducts);
    sortProducts(filteredList);
    setCurrentPage(1);
    setListProductFilter(filteredList);
    setLoadFilter(false);
  }, [loading, listProducts, sortBy, loadFilter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productPerPage;
    const endIndex = Math.min(
      startIndex + productPerPage,
      listProductFilter.length
    );
    setCurrentProducts(listProductFilter.slice(startIndex, endIndex));
  }, [currentPage, productPerPage, listProductFilter]);

  const filterProducts = (item) => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const category = params.get("category")
      ? params.get("category").split(",")
      : [];
    const tags = params.get("tags") ? params.get("tags").split(",") : [];

    if (!from && !to && tags.length === 0 && category.length === 0) {
      return true;
    }
    let check = true;
    if (from && to) {
      const price = item.variants[0].price;
      if (price < parseInt(from) || price > parseInt(to)) {
        check = true;
      } else {
        check = false;
      }
    }
    if (tags.length > 0 && !tags.includes(item.tags.toLowerCase())) {
      check = false;
    }

    if (
      category.length > 0 &&
      !category.includes(item.product_type.toLowerCase())
    ) {
      check = false;
    }
    return check;
  };

  const sortProducts = (sortedList) => {
    if (sortBy === "priceLowToHigh") {
      sortedList.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "priceHighToLow") {
      sortedList.sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page__list-product col l-9 m-8 c-12">
      {loading ? (
        <SkeletonListProduct />
      ) : (
        <>
          <div className="header__list-product row">
            <div className="product-count col l-10 m-9 c-12">
              Showing {listProductFilter.length} product
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
              count={listProductFilter.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ListProduct;
