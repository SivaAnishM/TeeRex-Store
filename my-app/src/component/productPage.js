import "./productPage.css";
import axios from "axios";
import { config } from "../App";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

const ProductPage = () => {
  const [productPages, setProductPages] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    color: [],
    type: [],
    gender: ["Men", "Women"],
    priceRange: ["$ 0-250", "$ 250-450", "$ 450 - above"],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    type: [],
    gender: [],
    priceRange: [""],
  });

  //Fetch products from the API and store them in products
  const getProductsFromAPI = async () => {
    try {
      const res = await axios.get(config.endpoint);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //update filtered menu items by using the products data
  const updateFilter = () => {
    let tempColor = [];
    let tempType = [];

    products.forEach((product) => {
      if (!tempColor.includes(product.color)) {
        tempColor.push(product.color);
      }
      if (!tempType.includes(product.type)) {
        tempType.push(product.type);
      }
    });
    setFilters({ ...filters, color: tempColor, type: tempType });
  };

  const handleFilters = (e) => {};
  useEffect(() => {
    getProductsFromAPI();
  }, []);

  useEffect(() => {
    updateFilter();
  }, [products]);

  return (
    <div>
      {productPages ? (
        <div>
          <div className="header-product">
            <div className="header-title">TeeRex Store</div>
            <div className="header-actions">
              <a>
                <div className="Line">Product</div>
              </a>
              <Button color="inherit" onClick={() => setProductPages(false)}>
                <Badge badgeContent="2">
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </Button>
            </div>
          </div>
          <Grid container>
            <Grid item sm={3} sx={{ display: { xs: "none", md: "block" } }}>
              <Stack
                style={{ boxShadow: "1px 2px 9px grey" }}
                className="filter-item"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <div>
                  <b>Color</b>
                  {filters.color.map(function (x) {
                    return (
                      <div style={{ padding: "5px" }}>
                        <input
                          type={"checkbox"}
                          key={x}
                          name="color"
                          value={x}
                          onChange={handleFilters}
                          checked={selectedFilters.color.includes(x)}
                        />
                        {x}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <b>Gender</b>
                  {filters.gender.map(function (x) {
                    return (
                      <div style={{ padding: "5px" }}>
                        <input
                          type={"checkbox"}
                          key={x}
                          name="gender"
                          value={x}
                          onChange={handleFilters}
                          checked={selectedFilters.gender.includes(x)}
                        />
                        {x}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <b>Price</b>
                  {filters.priceRange.map(function (x) {
                    return (
                      <div style={{ padding: "5px" }}>
                        <input
                          type={"checkbox"}
                          key={x}
                          name="priceRange"
                          value={x}
                          onChange={handleFilters}
                          checked={selectedFilters.priceRange.includes(x)}
                        />
                        {x}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <b>Type</b>
                  {filters.type.map(function (x) {
                    return (
                      <div style={{ padding: "5px" }}>
                        <input
                          type={"checkbox"}
                          key={x}
                          name="type"
                          value={x}
                          onChange={handleFilters}
                          checked={selectedFilters.type.includes(x)}
                        />
                        {x}
                      </div>
                    );
                  })}
                </div>
              </Stack>
            </Grid>
            <Grid item sm={9} xs={12}>
              <div className="product-item"></div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <div className="header-product">
            <div className="header-title">TeeRex Store</div>
            <div className="header-actions">
              <a>
                <div onClick={() => setProductPages(true)}>Product</div>
              </a>
              <div className="Line">
                <Button color="inherit">
                  <Badge badgeContent="2">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
