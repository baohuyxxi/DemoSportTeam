import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Filter.scss";
import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";

export default function Filter({ loadFilter, setLoadFilter }) {
  const [expandedPanels, setExpandedPanels] = useState(["category"]);
  const [category] = useState(["Clothes", "Blazer", "Shoes", "Sleeve"]);
  const [tags] = useState([
    "Heels",
    "Skirts",
    "Hat",
    "Jacket",
    "Blazer",
    "shoes",
    "Dress",
    "Indoor",
    "Outdoor",
    "Sleeve",
  ]);
  const [price, setPrice] = useState({ from: "", to: "" });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const handleChange = (panel) => {
    if (expandedPanels.includes(panel)) {
      setExpandedPanels(expandedPanels.filter((p) => p !== panel));
    } else {
      setExpandedPanels([...expandedPanels, panel]);
    }
  };

  const isPanelExpanded = (panel) => expandedPanels.includes(panel);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPrice({ ...price, [name]: value });
  };
  const handleTypeProduct = (value) => {
    if (selectedCategory.includes(value)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== value));
    } else {
      setSelectedCategory([...selectedCategory, value]);
    }
  };
  const handleTagsProduct = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((item) => item !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
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

  const handleClearAll = () => {
    setPrice({ from: "", to: "" });
    setSelectedCategory([]);
    setSelectedTags([]);
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState(null, "", newUrl);
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
        <div className="filter__item accordion">
          <div
            className="filter__item-accordionSummary"
            onClick={() => handleChange("category")}
          >
            <div className="filter__item-accordionTitle">Category</div>
            <FontAwesomeIcon
              icon={isPanelExpanded("category") ? faChevronUp : faChevronDown}
              className="filter__item-accordionIcon"
            />
          </div>
          <div
            className={`filter__item-accordionDetails ${
              isPanelExpanded("category") ? "active" : ""
            }`}
          >
            {category.map((item, index) => (
              <Checkbox
                key={index}
                id={`category-${index}`}
                label={item}
                checked={selectedCategory.includes(item)}
                onChange={() => handleTypeProduct(item)}
              />
            ))}
          </div>
        </div>
        <div className="filter__item accordion">
          <div
            className="filter__item-accordionSummary"
            onClick={() => handleChange("tags")}
          >
            <div className="filter__item-accordionTitle">Tags</div>
            <FontAwesomeIcon
              icon={isPanelExpanded("tags") ? faChevronUp : faChevronDown}
              className="filter__item-accordionIcon"
            />
          </div>
          <div
            className={`filter__item-accordionDetails ${
              isPanelExpanded("tags") ? "active" : ""
            }`}
          >
            {tags.map((item, index) => (
              <Checkbox
                key={index}
                id={`tags-${index}`}
                label={item}
                checked={selectedTags.includes(item)}
                onChange={() => handleTagsProduct(item)}
              />
            ))}
          </div>
        </div>
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
