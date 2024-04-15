import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";
import Account from "./components/Account/Account";
import Orders from "./components/Orders/Orders";
import MyComponent from "./components/Sample";
import Explore from "./components/Explore/Explore";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import Extra from "./components/Extra";
import FirstSubCategory from "./components/FirstSubCategory/FirstSubCategory";
import AllSubCategories from "./components/AllSubCategories/AllSubCategories";
import Addresses from "./components/Addresses/Addresses";
import Profile from "./components/Profile/Profile";
import Wallet from "./components/Wallet/Wallet";
import Transactions from "./components/Transactions/Transactions";
import CustomerSupport from "./components/CustomerSupport/CustomerSupport";
import CustomerSupportSubFAQS from "./components/CustomerSupportSubFAQS/CustomerSupportSubFAQS";
import CustomerSupportSubFAQ from "./components/CustomerSupportSubFAQ/CustomerSupportSubFAQ";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Carousel from "./components/Carousel/Carousel";
import ForYouProductsLink from "./components/ForYouProductsLink/ForYouProductsLink";
import ManageReferrals from "./components/ManageReferrals/ManageReferrals";
import DetailedProduct from "./components/DetailedProduct/DetailedProduct";
import Search from "./components/Search/Search";
import Carousel2 from "./components/Carousel2/Carousel2";
import MyCarousel from "./components/Carousel2/Carousel2";
import MySlider from "./components/MySlider/MySlider";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />}>
          <Route path="" element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/transactions" element={<Transactions />} />
          <Route path="support" element={<CustomerSupport />} />
          <Route path="support/:faqId" element={<CustomerSupportSubFAQS />} />
          <Route
            path="support/:faqId/details/:subFaqId"
            element={<CustomerSupportSubFAQ />}
          />
          <Route path="referrals" element={<ManageReferrals />} />
        </Route>
        <Route path="/categories" element={<Explore />} />
        <Route path="/categories/:categoryId" element={<CategoryDetails />}>
          <Route index element={<FirstSubCategory />} />
          <Route
            path="subcategories/:subCategoryId"
            element={<AllSubCategories />}
          />
          <Route
            path="subcategories/:subCategoryId/product/:productId"
            element={<DetailedProduct />}
          />
        </Route>
        <Route path="/products-for-you" element={<ForYouProductsLink />} />
        <Route path="/search" element={<Search />} />
        <Route path="/autofill" element={<MyComponent />} />
        <Route path="/asdf" element={<Carousel />} />
        <Route path="/carousel" element={<MyCarousel />} />
        <Route path="/slider" element={<MySlider />} />
      </Routes>
    </>
  );
}

export default App;
