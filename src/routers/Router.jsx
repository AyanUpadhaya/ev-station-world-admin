import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Layout from "../layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import Profile from "../pages/profile/Profile";
import Users from "../pages/users/Users";
import UserProfileForm from "../pages/forms/UserProfileForm";
import Subscribers from "../pages/subscribers/Subscribers";
import Products from "../pages/products/Products";
import ProductAddForm from "../pages/forms/ProductAddForm";
import Reviews from "../pages/reviews/Reviews";
import Categories from "../pages/categories/Categories";
import CategoryForm from "../pages/forms/CategoryForm";
import Galleries from "../pages/galleries/Galleries";
import TeamMemberAddForm from "../pages/forms/TeamMemberAddForm";
import Team from "../pages/team/Team";
import Services from "../pages/services/Services";
import ServiceAddForm from "../pages/forms/ServiceAddForm";
import ForgetPasword from "../pages/forms/ForgotPassword";
import AdminReset from "../pages/forms/AdminReset";
import Faq from "../pages/faq/Faq";
import FaqAddForm from "../pages/forms/FaqAddForm";
import News from "../pages/news/News";
import NewsAddForm from "../pages/forms/NewsAddForm";
import Contact from "../pages/contact/Contact";
import BillingInfo from "../pages/billing/BillingInfo";
import NotFound from "../pages/NotFound/NotFound";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/users",
        element: <Users></Users>,
      },
      {
        path:'/subscribers',
        element:<Subscribers></Subscribers>
      },
      {
        path:'/products',
        element:<Products></Products>
      },
      {
        path:'/reviews',
        element:<Reviews></Reviews>
      },
      {
        path:'/categories',
        element:<Categories></Categories>
      },
      {
        path:'/galleries',
        element:<Galleries></Galleries>
      },
      {
        path:'/team',
        element:<Team></Team>
      },
      {
        path:'/services',
        element:<Services></Services>
      },
      {
        path:'/faq',
        element:<Faq></Faq>
      },
      {
        path:'/news',
        element:<News></News>
      },
      {
        path:'/contacts',
        element:<Contact></Contact>
      },
      {
        path:'/billings',
        element:<BillingInfo></BillingInfo>
      },
      
      // forms
    
      {
        path: "/users-edit",
        element: <UserProfileForm></UserProfileForm>,
      },
      {
        path:'/member-edit',
        element:<TeamMemberAddForm></TeamMemberAddForm>
      },
      {
        path:'/service-edit',
        element:<ServiceAddForm></ServiceAddForm>
      },
      {
        path: "/product-edit",
        element: <ProductAddForm></ProductAddForm>,
      },
      {
        path:'/category-edit',
        element:<CategoryForm></CategoryForm>
      },
      {
        path:'/faq-edit',
        element:<FaqAddForm></FaqAddForm>
      },
      {
        path:'/news-edit',
        element:<NewsAddForm></NewsAddForm>
      },

      //add
      {
        path: "/product-add",
        element: <ProductAddForm></ProductAddForm>,
      },
      {
        path:'/category-add',
        element:<CategoryForm></CategoryForm>
      },
      {
        path:'/team-add',
        element:<TeamMemberAddForm></TeamMemberAddForm>
      },
      {
        path:'/service-add',
        element:<ServiceAddForm></ServiceAddForm>
      },
      {
        path:'/faq-add',
        element:<FaqAddForm></FaqAddForm>
      },
      {
        path:'/news-add',
        element:<NewsAddForm></NewsAddForm>
      }

     
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path:'/forgot_password',
    element:<ForgetPasword></ForgetPasword>
  },
  {
    path:'/admin_reset/:email',
    element:<AdminReset></AdminReset>
  },
  
  {
    path: "*",
    element: (<NotFound></NotFound>),
  },
]);
