import React, { useState,useRef,useEffect } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import UploadModal from "../../components/modals/UploadModal";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { battery, car, homeChargers } from "../../assets/getAssets";
import ProductsTable from "../../components/tables/products/productsTable";
function Products() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [isAscending,setIsAscending] = useState(false)
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchWallpapers())
  // },[dispatch])
  //data
  // const wallpapers = useSelector(state=>state.wallpapers);
  // const wallpapersData = wallpapers?.allWallpapers || [];
  const [isButtonDisabled,setIsButtonDisabled] = useState(true);
  const isLoading = false;
  const isError = false;
  const data=[
    {
      _id:"product_one",
      title:"Model S Tesla",
      price:250000,
      description:"The EVX1 is a sustainable and practical electric car that offers a thrilling driving experience without compromising on performance or features. This eco-friendly vehicle is designed for environmentally conscious drivers who want a clean and efficient driving experience. Equipped with advanced features and cutting-edge technology, the EVX1 delivers quick and smooth acceleration, making it perfect for city driving. Its low-rolling resistance tires and regenerative braking system maximize energy efficiency and range. The car's spacious and comfortable interior, along with a range of features such as a touchscreen infotainment system, rearview camera, and premium sound system, ensure a luxurious and enjoyable ride. With Level 2 charging, the EVX1 can be charged in just a few hours and also supports DC fast charging for quick top-ups on the go.",
      images:[
        `${car}`,
        `${car}`,
        `${car}`,
        `${car}`,
      ],
      ratings:"4.5",
      qty:10,
      timestamp:1699270440,
    },
    {
      _id:"product_two",
      title:"Model X Tesla",
      price:250000,
      description:"The EVX1 is a sustainable and practical electric car that offers a thrilling driving experience without compromising on performance or features. This eco-friendly vehicle is designed for environmentally conscious drivers who want a clean and efficient driving experience. Equipped with advanced features and cutting-edge technology, the EVX1 delivers quick and smooth acceleration, making it perfect for city driving. Its low-rolling resistance tires and regenerative braking system maximize energy efficiency and range. The car's spacious and comfortable interior, along with a range of features such as a touchscreen infotainment system, rearview camera, and premium sound system, ensure a luxurious and enjoyable ride. With Level 2 charging, the EVX1 can be charged in just a few hours and also supports DC fast charging for quick top-ups on the go.",
      images:[
        `${car}`,
        `${car}`,
        `${car}`,
        `${car}`,
      ],
      ratings:"4.5",
      qty:10,
      timestamp:1699270440,
    },
    {
      _id:"product_three",
      title:"Charging Station",
      price:250000,
      description:"The EVX1 is a sustainable and practical electric car that offers a thrilling driving experience without compromising on performance or features. This eco-friendly vehicle is designed for environmentally conscious drivers who want a clean and efficient driving experience. Equipped with advanced features and cutting-edge technology, the EVX1 delivers quick and smooth acceleration, making it perfect for city driving. Its low-rolling resistance tires and regenerative braking system maximize energy efficiency and range. The car's spacious and comfortable interior, along with a range of features such as a touchscreen infotainment system, rearview camera, and premium sound system, ensure a luxurious and enjoyable ride. With Level 2 charging, the EVX1 can be charged in just a few hours and also supports DC fast charging for quick top-ups on the go.",
      images:[
        `${homeChargers}`,
        `${homeChargers}`,
        `${homeChargers}`,
        `${homeChargers}`,
      ],
      ratings:"4.5",
      qty:10,
      timestamp:1699270440,
    },
    {
      _id:"product_four",
      title:"64Ah 12V Battery Tesla Motors Invention",
      price:20000,
      description:"The EVX1 is a sustainable and practical electric car that offers a thrilling driving experience without compromising on performance or features. This eco-friendly vehicle is designed for environmentally conscious drivers who want a clean and efficient driving experience. Equipped with advanced features and cutting-edge technology, the EVX1 delivers quick and smooth acceleration, making it perfect for city driving. Its low-rolling resistance tires and regenerative braking system maximize energy efficiency and range. The car's spacious and comfortable interior, along with a range of features such as a touchscreen infotainment system, rearview camera, and premium sound system, ensure a luxurious and enjoyable ride. With Level 2 charging, the EVX1 can be charged in just a few hours and also supports DC fast charging for quick top-ups on the go.",
      images:[
        `${battery}`,
        `${battery}`,
        `${battery}`,
        `${battery}`,
      ],
      ratings:"4.6",
      qty:5,
      timestamp:1699270440,
    },
    {
      _id:"product_five",
      title:"Tesla Model X - Genuine OEM CR2354 Replacement Battery (with Opening Tool Included)",
      price:20000,
      description:"The EVX1 is a sustainable and practical electric car that offers a thrilling driving experience without compromising on performance or features. This eco-friendly vehicle is designed for environmentally conscious drivers who want a clean and efficient driving experience. Equipped with advanced features and cutting-edge technology, the EVX1 delivers quick and smooth acceleration, making it perfect for city driving. Its low-rolling resistance tires and regenerative braking system maximize energy efficiency and range. The car's spacious and comfortable interior, along with a range of features such as a touchscreen infotainment system, rearview camera, and premium sound system, ensure a luxurious and enjoyable ride. With Level 2 charging, the EVX1 can be charged in just a few hours and also supports DC fast charging for quick top-ups on the go.",
      images:[
        `${battery}`,
        `${battery}`,
        `${battery}`,
        `${battery}`,
      ],
      ratings:"4.6",
      qty:5,
      timestamp:1699942317,
    },
  ];

  //actions
  const handleFileChange = (event) => {
    const file = event.target.files[0];   
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setTypeError(false);
    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
      fileRef.current.value = "";
    }
  };
  const handleFileUpload = ()=>{
    dispatch(addWallpaper({wallpaperName,file}));
    setFile("");
    setImagePreview("");
    setTypeError(true);
    setIsButtonDisabled(true)
    fileRef.current.value = "";
  }

  const handleFileDelete = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    fileRef.current.value = "";
  };

  const [searchValue, setSearchValue] = useState("");
  
  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    if(isAscending){
      return a.timestamp - b.timestamp;

    }else{
      return b.timestamp - a.timestamp;

    }
  }

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.title?.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return data;
    }
  };
  
  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data?.length > 0) {
    const newData = [...data].sort(sortByTime)?.filter(filterBySearch);
    content = (
      <ProductsTable data={newData} setIsAscending={setIsAscending}></ProductsTable>
    );
  }
 
  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Products"
          path="/product-add"
          value={searchValue}
          onChange={onChange}
          isNotAddable={false}
          modalId ={'uploadPopUp'}
        >

        </SearchBar>
 
        <div className="h-[calc(100%-75px)] overflow-auto flex flex-col justify-between flex-wrap">
          {content}
        </div>
      </div>
      
    </section>
  );
}

export default Products;
