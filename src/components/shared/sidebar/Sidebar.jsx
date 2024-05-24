/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logo, logoicon, logotext } from "../../../assets/getAssets";
import DashboardActive from "../../Svg/DashboardActive";
import UsersSvg from "../../Svg/UsersSvg";
import useGetActivePath from "../../../hooks/useGetActivePath";
import "./sidebar.css";
import { useEffect } from "react";
import ServicesSvg from "../../Svg/ServicesSvg";
import ProductsSvg from "../../Svg/ProductsSvg";
import NewsSvg from "../../Svg/NewsSvg";
import GalleriesSvg from "../../Svg/GalleriesSvg";
import FaqSvg from "../../Svg/FaqSvg";
import ContactsSvg from "../../Svg/ContactsSvg";
import CategoriesSvg from "../../Svg/CategoriesSvg";
import BillingsSvg from "../../Svg/BillingsSvg";
function Sidebar({ showSidebar,toggleSidebar }) {
  const { handleLocalstore, activePath } = useGetActivePath();
  const [navitem,setNavitem] = useState('');
  const [showNestedLinks, setShowNestedLinks] = useState(false);
  const [usersActive, setUsersActive] = useState(false);
  const [isArrowUp,setIsArrowUp] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const submenuRef = useRef({});

  const handleDropdown = (menu, submenuOpen) => {
    if (!submenuOpen) {
      setIsSubmenuOpen((prev) => ({
        [menu]: !prev[menu],
      }));
      setIsArrowUp(prev=>!prev)
    }
  };
  //close users nested links if show sidebar is false
  useEffect(()=>{
    if(showSidebar === false){
      setShowNestedLinks(false)
    }
  },[showSidebar])

  const handleShowNestedLinks = ()=>{
    if(showSidebar===false){
      // handleDropdown({"users":true})
      toggleSidebar(prev=>!prev)
    }
  }

  const handleUsersActive =()=>{
    handleShowNestedLinks()
    handleDropdown("users")
    setUsersActive(true);
    setNavitem('users');
    
    localStorage.setItem('navitem','users')

  }
 
  const handleOtherLinkClick = () => {
    setUsersActive(false);
    setShowNestedLinks(false);
    setNavitem('');
    setIsArrowUp(false)
    setIsSubmenuOpen({'users':false})
    localStorage.removeItem('navitem')
  };

  useEffect(()=>{
    const item = localStorage.getItem('navitem')
    if(item){
      handleUsersActive()
      
    }
  },[])



  return (

      <div
      className={`${showSidebar? "w-72" : "w-[88px]"} sidebar bg-primary h-full  relative duration-300 no-scrollbar overflow-auto `}
    >
      <div className="w-full px-4 py-6 whitespace-nowrap shrink-0">
        {/* dashboard logo */}
        <div className="h-12 mb-6">
        <Link to={'/'} className="flex items-center">
          <img src={logoicon} alt="" className="flex-shrink-0" />
          <img src={logotext} alt="" className={`${!showSidebar && 'scale-0' }`}/>
        </Link>
        </div>

        {/* nav items  */}

        <div className="mt-6">

        
          <ul className="flex flex-col gap-1">
            {/* dashboard  */}

            <li>
              <Link
                to="/"
                className={`dashboard ${activePath === "/" && navitem !== "users"  ? "active" : "text-white"
                  } flex items-center  gap-4 w-full rounded-lg p-4 group`}
                  onClick={() => {
                    handleLocalstore("/");
                    handleOtherLinkClick()
                  }}
              >
                <span className="shrink-0">
                  <DashboardActive />
                </span>

                <span
                  className={`${showSidebar ? "block" : "hidden"} duration-300 font-poppins shrink-0 `}
                >
                  Dashboard
                </span>
              </Link>
            </li>

            {/* users */}

            <li  className="w-full overflow-hidden capitalize shrink-0 ">
              <div onClick={()=>{
                handleUsersActive()
                
              }}
                className={`navlink ${usersActive && navitem === "users" ? "active" : "text-white"
              } font-poppins flex items-center gap-4 w-full p-4 cursor-pointer font-bold `}>
               <span className="shrink-0">
                <UsersSvg/>
               </span>
                <span className={` ${!showSidebar ? 'hidden' : 'block'} origin-left duration-200 flex justify-between items-center w-full`}>
                  Users
                  <i  style={{color:`${navitem === "users" ? 'black':'white'}`}} className={`${isArrowUp? 'rotate-180 duration-300':'rotate-0 duration-300'} fa-solid fa-chevron-down`}></i>
                </span>
              </div>
              {/* nested submenu */}
              {showSidebar && (<ul ref={(ref) => (submenuRef.current["users"] = ref)}
                  className={`flex flex-col gap-1 duration-300 dropdown-menu pl-10`}
                  style={{
                    maxHeight: isSubmenuOpen["users"]
                      ? `${submenuRef.current["users"]?.scrollHeight}px`
                      : "0",
                  }}>
                {/* users  */}

            <li>
              <Link
                to="/users"
                className={`nested ${usersActive && activePath === "users" ? "active" : "text-white"
              } font-poppins flex items-center gap-4 w-full p-4 cursor-pointer `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocalstore("users");
                  }}
              >
              
                

                <span
                  className={` ${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                 All Users
                </span>
              </Link>
            </li>

            {/* Team */}

            <li>
            <Link
                to="/team"
                className={`nested ${usersActive && activePath === "teams" ? "active" : "text-white"
              } font-poppins flex items-center gap-4 w-full p-4 cursor-pointer `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocalstore("teams");
                  }}
              >
              
                

                <span
                  className={` ${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                 Teams
                </span>
              </Link>
            </li>

            {/* Subscribers */}
            <li>
              <Link
                to="/subscribers"
                className={`nested ${usersActive && activePath === "subscribers"? "active" : "text-white"
                  } flex items-center  gap-4 w-full rounded-lg p-4  group`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocalstore("subscribers");
                  
                  }}
              >
               
                <span
                  className={` ${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Subscribers
                </span>
              </Link>
              <Link
                to="/reviews"
                className={`nested ${usersActive && activePath === "reviews"? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocalstore("reviews");
                  }}
              >
               

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Reviews
                </span>
              </Link>
            </li>
              </ul>)}
            </li>
    

  

            {/* Products */}
            <li>
              <Link
                to="/products"
                className={`navlink ${activePath === "products" && navitem!=='users' ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("products");
                    handleOtherLinkClick()
                  }}
              >
                <span className="shrink-0">
                  <ProductsSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Products
                </span>
              </Link>
            </li>
            
            {/* Categories */}
            <li>
              <Link
                to="/categories"
                className={`navlink ${activePath === "categories" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("categories");
                    handleOtherLinkClick()
                  }}
              >
                <span className="shrink-0">
                  <CategoriesSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Categories
                </span>
              </Link>
            </li>

            {/* Services */}
            <li>
              <Link
                to="/services"
                className={`navlink ${activePath === "services" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("services");
                    handleOtherLinkClick();
                  }}
              >
                <span className="shrink-0">
                  <ServicesSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Services
                </span>
              </Link>
            </li>

            {/* Galleries */}
            <li>
              <Link
                to="/galleries"
                className={`navlink ${activePath === "galleries" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("galleries");
                    handleOtherLinkClick()
                  }}
              >
                <span className="shrink-0">
                  <GalleriesSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Galleries
                </span>
              </Link>
            </li>
            {/* News */}
            <li>
              <Link
                to="/news"
                className={`navlink ${activePath === "news" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("news");
                    handleOtherLinkClick();
                  }}
              >
                <span className="shrink-0">
                  <NewsSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  News
                </span>
              </Link>
            </li>
            {/* Faq */}
            <li>
              <Link
                to="/faq"
                className={`navlink ${activePath === "faq" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("faq");
                    handleOtherLinkClick();
                  }}
              >
                <span className="flex-shrink-0">
                  <FaqSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Faq
                </span>
              </Link>
            </li>
            {/* contact */}
            <li>
              <Link
                to="/contacts"
                className={`navlink ${activePath === "contacts" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("contacts");
                    handleOtherLinkClick();
                  }}
              >
                <span className="flex-shrink-0">
                  <ContactsSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Contacts
                </span>
              </Link>
            </li>

            {/* billings */}
            <li className="h-full">
              <Link
                to="/billings"
                className={`navlink ${activePath === "billings" && navitem !== "users" ? "active" : "text-white"} flex items-center gap-4 w-full p-4 group`}
                  onClick={() => {
                    handleLocalstore("billings");
                    handleOtherLinkClick();
                  }}
              >
                <span className="flex-shrink-0">
                  <BillingsSvg />
                </span>

                <span className={`${showSidebar ? "block" : "hidden"} origin-left duration-300 font-poppins`}
                >
                  Billings
                </span>
              </Link>
            </li>
           
            
          </ul>
        </div>
      </div>
    </div>

  );
}

export default Sidebar;
