import React, { useState,useRef,useEffect } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";

import UploadModal from "../../components/modals/UploadModal";
import { useNavigate } from "react-router-dom";
import { avatar } from "../../assets/getAssets";
import GalleriesCards from "../../components/cards/GalleriesCards";
import { useDispatch } from "react-redux";
function Galleries() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);
  const [wallpaperName,setWallpaperName] = useState('')
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const fileRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const isLoading =false;
  const isError = false;
  //data
  const data =[
    {
        _id:'wallpaper_one',
        wallpaperName:'Australia',
        imgUrl:`${avatar}`
    },
    {
        _id:'wallpaper_two',
        wallpaperName:'Finland',
        imgUrl:`${avatar}`
    },
    {
        _id:'wallpaper_three',
        wallpaperName:'Newzeland',
        imgUrl:`${avatar}`
    },
    {
        _id:'wallpaper_four',
        wallpaperName:'America',
        imgUrl:`${avatar}`
    },
    {
        _id:'wallpaper_five',
        wallpaperName:'Japan',
        imgUrl:`${avatar}`
    },
    {
        _id:'wallpaper_six',
        wallpaperName:'Ukrane',
        imgUrl:`${avatar}`
    },
  ]
  const [isButtonDisabled,setIsButtonDisabled] = useState(true)
  
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
    setImagePreview(null);
    inputRef.current.value="";
    fileRef.current.value="";
  }

  const handleFileDelete = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    fileRef.current.value ="";
  };
  const handleCloseWindow = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    inputRef.current.value ="";
    fileRef.current.value ="";
  };
  const handleFileRemove = (id)=>{
    dispatch(deleteWallpaper(id))

  }


  const [searchValue, setSearchValue] = useState("");
  
  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  
  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.wallpaperName?.toLowerCase().includes(searchValue?.toLowerCase());
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
      <GalleriesCards data={newData} handler={handleFileRemove}></GalleriesCards>
    );
  }

  useEffect(()=>{
    if(wallpaperName && file){
      setIsButtonDisabled(false)
    }
  },[wallpaperName,file])

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Galleries"
          path=""
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
          isWallpaperSearchBar={true}
          modalId ={'uploadPopUp'}
        >

        </SearchBar>

        <div className="h-[calc(100%-75px)] overflow-auto flex flex-col justify-between flex-wrap">
          {content}
        </div>
      </div>
      <UploadModal 
      modalClose={true} 
      handleStatus={handleFileChange} 
      file={file} 
      imagePreview={imagePreview} 
      handleFileDelete={handleFileDelete} 
      fileRef={fileRef} 
      inputRef={inputRef}
      handleWallPaperName={setWallpaperName} 
      handleFileUpload={handleFileUpload}
      isButtonDisabled={isButtonDisabled}
      handleCloseWindow={handleCloseWindow}
      />
    </section>
  );
}

export default Galleries;
