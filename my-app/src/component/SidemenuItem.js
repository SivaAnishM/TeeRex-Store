import "./productPage.css";
import { Stack } from "@mui/material";

const MenuItems = ({ filtersmenu, SelectedFilterProduct, handleFilters }) => {
  console.log(filtersmenu, SelectedFilterProduct, handleFilters);
  return (
    <div>
      <Stack
        style={{ boxShadow: "2px 3px 12px grey" }}
        className="filter-item"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <div>
          <p>Color</p>
          {filtersmenu.color.map(function (value) {
            return (
              <div style={{ padding: "5px" }}>
                <input
                  type={"checkbox"}
                  key={value}
                  name="color"
                  value={value}
                  onChange={handleFilters}
                  checked={SelectedFilterProduct.color.includes(value)}
                />
                {value}
              </div>
            );
          })}
        </div>
        <div>
          <p>Gender</p>
          {filtersmenu.gender.map(function (value) {
            return (
              <div style={{ padding: "5px" }}>
                <input
                  type={"checkbox"}
                  key={value}
                  name="gender"
                  value={value}
                  onChange={handleFilters}
                  checked={SelectedFilterProduct.gender.includes(value)}
                />
                {value}
              </div>
            );
          })}
        </div>
        <div>
          <p>Price</p>
          {filtersmenu.priceRange.map(function (value) {
            return (
              <div style={{ padding: "5px" }}>
                <input
                  type={"checkbox"}
                  key={value}
                  name="priceRange"
                  value={value}
                  onChange={handleFilters}
                  checked={SelectedFilterProduct.priceRange.includes(value)}
                />
                $ {value}
              </div>
            );
          })}
        </div>
        <div>
          <p>Type</p>
          {filtersmenu.type.map(function (value) {
            return (
              <div style={{ padding: "5px" }}>
                <input
                  type={"checkbox"}
                  key={value}
                  name="type"
                  value={value}
                  onChange={handleFilters}
                  checked={SelectedFilterProduct.type.includes(value)}
                />
                {value}
              </div>
            );
          })}
        </div>
      </Stack>
    </div>
  );
};

export default MenuItems;
