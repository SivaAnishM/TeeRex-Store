import "./productPage.css";
import axios from "axios";
import { config } from "../App";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Badge,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MenuItems from "./SidemenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ProductCard from "./productCart";

const ProductPage = () => {
  const [productPages, setProductPages] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [filtersmenu, setfiltersmenu] = useState({
    color: [],
    type: [],
    gender: ["Men", "Women"],
    priceRange: ["0-250", "250-450", "450"],
  });

  const [SelectedFilterProduct, setSelectedFilterProduct] = useState({
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
    setfiltersmenu({ ...filtersmenu, color: tempColor, type: tempType });
  };

  //store the filtered products in SelectedFilterProduct
  const handleFilters = (val) => {
    const { name, value } = val.target;
    let temp;
    if (name === "priceRange") {
      if (SelectedFilterProduct[name][0] === value) {
        temp = [""];
      } else temp = [value];
    } else {
      if (!SelectedFilterProduct[name].includes(value)) {
        temp = [...SelectedFilterProduct[name], value];
      } else {
        temp = [...SelectedFilterProduct[name]];
        let index = temp.indexOf(value);
        temp.splice(index, 1);
      }
    }

    setSelectedFilterProduct({ ...SelectedFilterProduct, [name]: temp });
  };

  const [debounceTimeout, setDebounceTimeout] = useState(0);

  const performSearch = (value) => {
    let filtered = products.filter((item) => {
      return (
        item.name.toLowerCase().includes(value) ||
        item.type.toLowerCase().includes(value) ||
        item.color.toLowerCase().includes(value)
      );
    });
    setFilteredProducts(filtered);
  };

  const debounceSearch = (event, debounceTimeout) => {
    let value = event.target.value;

    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(() => performSearch(value), 800));
  };

  // updateing the filtersmenu options
  const updateFilteredProducts = () => {
    let { color, type, gender, priceRange } = SelectedFilterProduct;
    let price = priceRange[0].split("-");

    let temp = products.filter((product) => {
      return (
        (color.length === 0 || color.includes(product.color)) &&
        (type.length === 0 || type.includes(product.type)) &&
        (gender.length === 0 || gender.includes(product.gender)) &&
        (price.length === 1 ||
          (product.price >= price[0] && product.price <= price[1])) &&
        (price.length !== 1 ||
          price[0].length === 0 ||
          product.price === price[0])
      );
    });
    setFilteredProducts(temp);
  };

  const [cartProduct, setcartProduct] = useState([]);

  // find products quantity
  const getCartQty = (id) => {
    let qty = 0;
    if (cartProduct.length) {
      cartProduct.forEach((value) => {
        if (value.id === id) {
          qty = value.qty;
        }
      });
    }
    return qty;
  };

  //Delete products from the cartProduct list
  const deleteCartItem = (prodId) => {
    let cartValue = [...cartProduct];
    let index = cartValue.findIndex((pd) => pd.id === prodId);
    cartValue.splice(index, 1);
    setcartProduct(cartValue);
  };

  // Add a product to cartProduct page for product page
  const addToCart = async (product, qty) => {
    let { id, name, imageURL, price, quantity } = product;
    if (qty > quantity) {
      alert("Maximum quantity reached");
    } else if (qty === 0) {
      deleteCartItem(id);
    } else {
      let cartValue = [...cartProduct];
      let removeItem = cartValue.find((product) => {
        if (product.id === id) return true;
      });
      if (removeItem !== undefined) {
        let prodIndex = cartValue.indexOf(removeItem);
        cartValue.splice(prodIndex, 1);
      }
      let temp = [
        ...cartValue,
        { id: id, name: name, imageURL: imageURL, qty: qty, price: price },
      ];
      setcartProduct(temp);
    }
  };

  //set the toal cartProduct price in cartProduct page
  const [cartprice, setCartprice] = useState(0);
  const CartPrice = () => {
    let sum = 0;
    cartProduct.forEach((product) => {
      var temp = product.price * product.qty;
      sum += temp;
    });
    console.log(sum);
    setCartprice(sum);
  };

  useEffect(() => {
    getProductsFromAPI();
  }, []);

  useEffect(() => {
    updateFilter();
  }, [products]);

  useEffect(() => {
    updateFilteredProducts();
  }, [SelectedFilterProduct]);

  useEffect(() => {
    CartPrice();
  }, [cartProduct]);

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
                <Badge badgeContent={cartProduct.length}>
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </Button>
            </div>
          </div>
          <Grid container>
            <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
              <MenuItems
                filtersmenu={filtersmenu}
                SelectedFilterProduct={SelectedFilterProduct}
                handleFilters={handleFilters}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="product-item">
                <Box
                  className="product-desktop"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={2} direction="row" position="center">
                    <TextField
                      className="search-field"
                      size="normal"
                      variant="standard"
                      sx={{ width: "45vh" }}
                      placeholder="Search for products..."
                      name="search"
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        debounceSearch(event, debounceTimeout);
                      }}
                    />
                    <Button variant="contained" color="inherit">
                      <SearchIcon />
                    </Button>
                    <Button
                      className="filter-button"
                      variant="contained"
                      color="inherit"
                    >
                      <FilterAltIcon />
                    </Button>
                  </Stack>
                  {filteredProducts.length ? (
                    <Grid
                      container
                      spacing={7}
                      padding="3rem 4rem"
                      direction="row"
                      alignItems="center"
                    >
                      {filteredProducts.map((product) => {
                        return (
                          <Grid item sm={6} lg={4} xs={12} key={product.id}>
                            <ProductCard
                              product={product}
                              cartQty={getCartQty(product.id)}
                              handleAddToCart={addToCart}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <div className="zero-product">No products found...</div>
                  )}
                </Box>
              </div>
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
                  <Badge badgeContent={cartProduct.length}>
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
          <div className="shopping-box ">
            <p>ShoppingCart</p>

            {cartProduct.length > 0 ? (
              <div>
                <div className="shopping-Line">
                  {cartProduct.map((product) => {
                    return (
                      <div key={product.id}>
                        <Box
                          display="flex"
                          alignItems="center"
                          padding="1rem"
                          className="shopingcart"
                        >
                          <Box className="image-shoppingcart">
                            <img
                              src={product.imageURL}
                              alt={product.name}
                              width="100%"
                              height="100%"
                            />
                          </Box>
                          <Box padding={"1rem"}>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="subtitle">
                              Rs {product.price}
                            </Typography>
                          </Box>
                          <Box>
                            <Button variant="outlined" disabled>
                              Qty: {product.qty}
                            </Button>
                            <Button
                              color="inherit"
                              variant="outlined"
                              onClick={() => deleteCartItem(product.id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                      </div>
                    );
                  })}
                </div>
                <a className="total-amount">Total amouth ₹ {cartprice}</a>
              </div>
            ) : (
              <div className="no-shopingcart">NO PRODUCT IN cartProduct!!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
