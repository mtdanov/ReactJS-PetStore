import "./App.css"
import { Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import Path from "./path";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Cart from "./components/cart/Cart";
import NotFound from "./components/not-found/NotFound";
import Logout from "./components/logout/Logout";
import Food from "./components/food/Food";
import ArticleDetails from "./components/blog/article-details/ArticleDetails";
import AdminPanel from "./components/admin/AdminPanel";
import AdminGuard from "./guards/AdminGuard";
import CreateProduct from "./components/admin/create-product/CreateProduct";
import ProductDetails from "./components/product/product-details/ProductDetails";
import EditProduct from "./components/admin/edit-product/EditProduct";
import Service from "./components/service/Service";
import Profile from "./components/profile/Profile";
import Orders from "./components/orders/Orders";
import Order from "./components/orders/order/Order";
import Contact from "./components/contact/Contact";
import DogCategory from "./components/dog/DogCategory";
import CatCategory from "./components/cat/CatCategory";
import Adoption from "./components/adoption/Adoption";
import AdoptionDetails from './components/adoption/post-details/PostDetails'
import ProfileInfo from "./components/profile/profile-info/ProfileInfo";
import ThankYou from "./components/thank-you/ThankYou";
import EditPost from "./components/adoption/edit-post/EditPost";
import Toys from "./components/toys/Toys";
import Treats from "./components/treats/Treats";
import Messages from "./components/profile/messages/Messages";
import CreatePost from "./components/adoption/create-post/CreatePost";
import CreateArticle from "./components/admin/create-article/CreateArticle";
import EditArticle from "./components/admin/edit-article/EditArticle";
import UserGuard from "./guards/UserGuard";
// import Select from "./components/admin/select/Select";
import CreateCategory from "./components/admin/create-category/CreateCategory";
import GuestGuard from "./guards/GuestGuard";
function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <>
          <Header />
          <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path={Path.About} element={<About />} />
            <Route path={Path.Contact} element={<Contact />} />
            <Route path={Path.Service} element={<Service />} />

            <Route path={Path.Adoption} element={<Adoption />} />
            <Route path={Path.PostDetails} element={<AdoptionDetails />} />

            <Route path={Path.Blog} element={<Blog />} />
            <Route path={Path.ArticleDetails} element={<ArticleDetails />} />

            <Route path={Path.CatCategory} element={<CatCategory />} />
            <Route path={Path.CatFood} element={<Food />} />
            <Route path={Path.CatToys} element={<Toys />} />
            <Route path={Path.CatTreats} element={<Treats />} />

            <Route path={Path.DogCategory} element={<DogCategory />} />
            <Route path={Path.DogFood} element={<Food />} />
            <Route path={Path.DogToys} element={<Toys />} />
            <Route path={Path.DogTreats} element={<Treats />} />
            <Route path={Path.ProductDetails} element={<ProductDetails />} />

            <Route element={<GuestGuard />}>
              <Route path={Path.Register} element={<Register />} />
              <Route path={Path.Login} element={<Login />} />
            </Route>

            <Route element={<UserGuard />}>
              <Route path={Path.Logout} element={<Logout />} />
              <Route path={Path.Profile} element={<Profile />} />
              <Route path={Path.CreatePost} element={<CreatePost />} />
              <Route path={Path.EditPost} element={<EditPost />} />
              <Route path={Path.ProfileInfo} element={<ProfileInfo />} />
              <Route path={Path.Orders} element={<Orders />} />
              <Route path={Path.Order} element={<Order />} />
              <Route path={Path.Messages} element={<Messages />} />
              <Route path={Path.Cart} element={<Cart />} />
              <Route path={Path.ThankYou} element={<ThankYou />} />
            </Route>

            <Route element={<AdminGuard />}>
              <Route path={Path.AdminPanel} element={<AdminPanel />} />
              <Route path={Path.CreateArticle} element={<CreateArticle />} />
              <Route path={Path.EditArticle} element={<EditArticle />} />
              <Route path={Path.CreateProduct} element={<CreateProduct />} />
              <Route path={Path.EditProduct} element={<EditProduct />} />
              {/* <Route path={'/selection'} element={<Select />} /> */}
              <Route path={Path.CreateCategory} element={<CreateCategory />} />
            </Route>

            <Route path={Path.NotFound} element={<NotFound />} />

          </Routes>
          <Footer />
        </>
      </ProductsProvider>
    </AuthProvider >
  );
}

export default App;
