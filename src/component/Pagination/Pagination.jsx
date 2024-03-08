import React from "react";
import "./Pagination.scss";

const Pagination = ({ count, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(count / 12); 
  let startPage = Math.max(1, currentPage - 4);
  let endPage = Math.min(pageCount, startPage + 9); 

  if (endPage - startPage < 9) {
    startPage = Math.max(1, endPage - 9);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i); // Mảng các số trang từ startPage đến endPage

  return (
    <div className="pagination">
      {pages.map((page) => (
        <div
          key={page}
          className={`page ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
