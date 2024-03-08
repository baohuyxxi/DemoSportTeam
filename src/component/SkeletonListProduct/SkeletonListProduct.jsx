import "./SkeletonListProduct.scss";

export default function SkeletonListProduct() {
  const skeletonCards = Array.from({ length: 12 }, (_, index) => (
    <div className="col l-4 m-6 c-12" key={index}>
      <div className="skeleton__product-card">
        <div className="skeleton__product-img"></div>
        <div className="skeleton__product-info">
          <div className="skeleton__product-name"></div>
          <div className="skeleton__product-type"></div>
          <div className="skeleton__product-vendor"></div>
          <div className="skeleton__product-price"></div>
          <div className="skeleton__product-btn"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="skeleton__list-product">
      <div className="skeleton__list-product-header">
        <div className="skeleton__list-product-count"></div>
        <div className="skeleton__list-product-arrange"></div>
      </div>
      <div className="skeleton__list-product-container row">
        {skeletonCards}
      </div>
      {/* <div className="skeleton__list-product-container"></div> */}
      <div className="skeleton__list-product-pagination"></div>
    </div>
  );
}
