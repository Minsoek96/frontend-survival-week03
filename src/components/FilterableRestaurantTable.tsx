import { useState } from "react";

import restaurantsData from "../../restaurants.json";
import RestaurantTable from "./RestaurantTable";
import SearchAndFilter from "./SearchAndFilter";

import { FoodType } from "../types/FoodType";
import { filterCartegories } from "../utils/filterCartegories";
import { filterRestaurants } from "../utils/filterRestaurahts";
import { Restaurants } from "../types/Restaurants";

const { restaurants } = restaurantsData;

const FilterableRestaurantTable = () => {
  const [query, setQuery] = useState<string>("");
  const [foodType, setFoodType] = useState<FoodType>("전체");

  const handleFoodTypes = (foodType: FoodType) => {
    setFoodType(foodType);
  };

  const filterFoodTypes = restaurants.reduce(
    (acc: string[], restaurant) =>
      acc.includes(restaurant.category) ? acc : [...acc, restaurant.category],
    []
  );

  const filteredRestaurants: Restaurants[] = filterRestaurants({
    restaurants,
    query,
  });

  const filteredCategories = filterCartegories({
    foodType,
    filteredRestaurants,
  });
  return (
    <>
      <SearchAndFilter
        query={query}
        setQuery={setQuery}
        handleFoodTypes={handleFoodTypes}
        filterFoodTypes={filterFoodTypes}
      />
      <RestaurantTable filteredCategories={filteredCategories} />
    </>
  );
};

export default FilterableRestaurantTable;