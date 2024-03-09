import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Filter.scss";
import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";

export default function Filter({ loadFilter, setLoadFilter }) {
  const [expandedPanels, setExpandedPanels] = useState(["category"]);
  const [category] = useState(["clothes", "blazer", "shoes", "sleeve"]);
  const [tags] = useState([
    "heels",
    "skirts",
    "hat",
    "jacket",
    "blazer",
    "shoes",
    "dress",
    "indoor",
    "outdoor",
    "sleeve",
  ]);
  const [price, setPrice] = useState({ from: "", to: "" });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPrice({ from: params.get("from") || "", to: params.get("to") || "" });
    setSelectedCategory(
      params.get("category") ? params.get("category").split(",") : []
    );
    setSelectedTags(params.get("tags") ? params.get("tags").split(",") : []);
  }, []);

  const handleChange = (panel) => {
    setExpandedPanels((prevPanels) =>
      prevPanels.includes(panel)
        ? prevPanels.filter((p) => p !== panel)
        : [...prevPanels, panel]
    );
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };

  useEffect(() => {
    if (price || selectedCategory || selectedTags) {
      const params = new URLSearchParams();
      if (price.from !== "" && price.to !== "") {
        params.set("from", price.from);
        params.set("to", price.to);
      }
      if (selectedCategory.length > 0) {
        params.set("category", selectedCategory.join(","));
      }
      if (selectedTags.length > 0) {
        params.set("tags", selectedTags.join(","));
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
      setLoadFilter(true);
    }
  }, [price, selectedCategory, selectedTags]);

  console.log(selectedTags, selectedCategory);
  const handleClearAll = () => {
    setPrice({ from: "", to: "" });
    setSelectedCategory([]);
    setSelectedTags([]);
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState(null, "", newUrl);
  };

  const renderCheckboxItems = (items, selectedItems, handleItemClick) => {
    const handleSelect = (value, selected, setSelected) => {
      if (selected.includes(value)) {
        setSelected(selected.filter((item) => item !== value));
      } else {
        setSelected([...selected, value]);
      }
    };
    return items.map((item, index) => (
      <Checkbox
        key={index}
        id={`${item}-${index}`}
        label={item}
        checked={selectedItems.includes(item)}
        onChange={() => handleSelect(item, selectedItems, handleItemClick)}
      />
    ));
  };
  return (
    <div className="filter__container col l-3 m-4 c-0">
      <div className="filter__header">
        <div className="filter__title">Filter</div>
        <div className="filter__clear" onClick={handleClearAll}>
          Clear All
        </div>
      </div>
      <div className="filter__content">
        {["category", "tags"].map((panel) => (
          <div className="filter__item accordion" key={panel}>
            <div
              className="filter__item-accordionSummary"
              onClick={() => handleChange(panel)}
            >
              <div className="filter__item-accordionTitle">
                {panel.charAt(0).toUpperCase() + panel.slice(1)}
              </div>
              <FontAwesomeIcon
                icon={
                  expandedPanels.includes(panel) ? faChevronUp : faChevronDown
                }
                className="filter__item-accordionIcon"
              />
            </div>
            <div
              className={`filter__item-accordionDetails ${
                expandedPanels.includes(panel) ? "active" : ""
              }`}
            >
              {panel === "category"
                ? renderCheckboxItems(
                    category,
                    selectedCategory,
                    setSelectedCategory
                  )
                : renderCheckboxItems(tags, selectedTags, setSelectedTags)}
            </div>
          </div>
        ))}
        <div className="filter__item">
          <div className="filter__item-title">Price range</div>
          <div className="filter__price row">
            <div className="input__price-container col l-6 m-6 c-6">
              <div className="filter__price-title">From:</div>
              <input
                className="from"
                value={price.from}
                onChange={handlePriceChange}
                name="from"
              />
            </div>
            <div className="input__price-container col l-6 m-6 c-6">
              <div className="filter__price-title">To:</div>
              <input
                className="to"
                value={price.to}
                onChange={handlePriceChange}
                name="to"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
