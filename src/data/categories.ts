import categoriesData from './categories.json';

import tablewareImage from "../assets/common/category-tableware.png";
import stationeryImage from "../assets/common/category-stationery.png";
import lightingImage from "../assets/common/category-lighting.png";
import fabricsImage from "../assets/common/category-fabrics.png";
import plantsImage from "../assets/common/category-plants.png";

const imageMap = {
    tableware: tablewareImage,
    stationery: stationeryImage,
    lighting: lightingImage,
    fabrics: fabricsImage,
    plants: plantsImage,
};

const categories = categoriesData.map((category) => ({
  ...category,
  image: imageMap[category.id as keyof typeof imageMap],
}));

export default categories;
