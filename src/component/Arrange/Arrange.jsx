import "./Arrange.scss";

export default function Arrange({ sortBy, setSortBy }) {
  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };
  return (
    <select className="arrange col l-2 m-3 c-4"  value={sortBy} onChange={handleSortBy}>
      <option value="default">Default</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="priceHighToLow">Price: High to Low</option>  
    </select>
  );
}
