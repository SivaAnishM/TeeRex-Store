import ProductPage from "./component/productPage";

export const config = {
  endpoint:
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
};

function App() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}

export default App;
