import "./ProductsPage.scss";
import React, { useState } from "react";
import FramePage from "~/component/FramePage/FramePage";
import ListProduct from "~/component/ListProduct/ListProduct";
import Filter from "~/component/Filter/Filter";
export default function ProductsPage() {
  const [loadFilter, setLoadFilter] = useState(false);
  return (
    <FramePage>
      <Filter loadFilter={loadFilter} setLoadFilter={setLoadFilter} />
      <ListProduct loadFilter={loadFilter} setLoadFilter={setLoadFilter} />
    </FramePage>
  );
}
