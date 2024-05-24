import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { useEffect } from "react";
// import { fetchAllCategory } from "../../features/categories/categoriesSlice";
import SearchLoader from "../../components/loaders/SearchLoader";
import { ToastContainer,toast } from "react-toastify";

function ProductAddForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
    const [product, setProduct] = useState({
        title: payload?.title || '',
        description: payload?.description || '',
        price: payload?.price || 0,
        qty: payload?.qty || 0,
        images: payload?.images || [],
      });

    const [showAddImageButton, setShowAddImageButton] = useState(true);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
          ...product,
          [name]: value,
        });
    };

    // const handleImageUpload = (e) => {
    //     const files = e.target.files;
    //     if (files.length > 0) {
    //       const newImages = [...product.images];
    //       for (let i = 0; i < files.length; i++) {
    //         if (newImages.length < 4) {
    //           newImages.push(URL.createObjectURL(files[i]));
    //         }
    //       }
    //       setProduct({ ...product, images: newImages });
    //       if (newImages.length >= 4) {
    //         setShowAddImageButton(false);
    //       }
    //     }
    //   };

      // const handleImageDelete = (index) => {
      //   const newImages = [...product.images];
      //   newImages.splice(index,1);
      //   setProduct({ ...product, images: newImages });
      //   setShowAddImageButton(true);
      // };

  const [selectedImages, setSelectedImages] = useState(payload?.images || []);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setProduct({...product,images:selectedImages})

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(e,image) 
  {
    e.preventDefault()
    setSelectedImages(selectedImages.filter((e) => e !== image));
    setProduct({...product,images:selectedImages})
    URL.revokeObjectURL(image);
  }

      


  return (

      <section className="p-6">
        <div className="w-full">
          <BackToPrev
            path="/products"
            title={`Back`}
          ></BackToPrev>

          <div className="bg-white p-6 rounded-2xl h-full overflow-y-scroll relative no-scrollbar">
          <div className="">
      <form>
      <div className="mb-4">
          <label className="font-bold text-base font-poppins text-blackMediumEmp">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="w-full font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold text-base font-poppins text-blackMediumEmp">
            Description:
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="h-60 w-full font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
          />
        </div>

        <div className="grid grid-cols-3">
          {/* price */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-base font-poppins text-blackMediumEmp">
                  Price:
              </label>
              <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  className="w-60 font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
              />
            </div>

    
          {/* Quantity */}
            <div className="flex flex-col gap-2">
                    <label className="font-bold text-base font-poppins text-blackMediumEmp">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        name="qty"
                        value={product.qty}
                        onChange={handleInputChange}
                        className="w-60 font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    />
            </div>

            {/* category */}

            <div className="flex flex-col gap-2">
                    <label className="font-bold text-base font-poppins text-blackMediumEmp ">Categroy:</label>
                    <Select
                        className="w-full font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting"
                        aria-required
                        defaultValue={'Home Chargers'}
                    >
                        <Select.Option value="Home Chargers" className="mb-[1px]"  ><span>Home Chargers</span></Select.Option>
                        <Select.Option value="Cars" ><span>Cars</span></Select.Option>
                        <Select.Option value="Station" ><span>Station</span></Select.Option>
                        <Select.Option value="64Ah 12v Battery Tesla Motors Inventions" ><span>64Ah 12v Battery Tesla Motors Inventions</span></Select.Option>
                    </Select>
            </div>


        </div>

        
        {/* <div className="inline-flex items-center gap-4">
            <span className="text-xl font-bold font-poppins text-blackMediumEmp">Enable</span>
            <input
              type="checkbox"
              name="isAvailable"
              className="toggle toggle-error"
              checked={product.isAvailable}
              onChange={handleInputChange}
            />
           
        </div> */}

        <div className="my-5">
            {type !== 'edit' ? (<div className="my-4">
            <label className="font-bold text-xl font-poppins text-blackMediumEmp pb-3">
                Add Images
            </label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={onSelectFile}
                className="form-input"
                hidden
            />
            </div>):(<div className="my-4">
            <label className="font-bold text-xl font-poppins text-blackMediumEmp pb-3">
                Update Images
            </label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={onSelectFile}
                className="form-input"
                hidden
            />
            </div>)}

            <div className="flex flex-wrap items-center py-5 ">
            {selectedImages &&
          selectedImages.map((image, index) => (
                <div key={index} className="w-1/4 px-2 mb-2 rounded-full relative">
                <button
                    onClick={(e) => deleteHandler(e,image)}
                    className="p-2 absolute -top-5 left-0 z-20 bg-red-500 text-white text-sm h-10 w-10 rounded-full"
                >
                    X
                </button>
                <img src={image} alt={`Product Image ${index}`} className="relative z-10 w-[200px] h-[200px] rounded-md" />
                
                </div>
            ))}
            {selectedImages.length<4 && (
                <div className="w-20 h-20 mb-2 border border-neutralColorTwoHundread rounded-xl flex justify-center items-center bg-base-300">
                <label className="p-2 bg-primary text-white text-4xl font-extrabold w-16 h-16 flex flex-col justify-center items-center rounded-full cursor-pointer">
                    <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onSelectFile}
                    className="hidden"
                    />
                    +
                </label>
                </div>
            )}
            </div>
        </div>

        {type !== 'edit' ? <button type="submit"
        className={`mx-auto w-52 h-14 bg-primary py-[20px] px-4 rounded-lg text-white capitalize flex justify-center items-center`}>
          Add Product
        </button> : <button type="submit"
        className={`mx-auto w-52 h-14 bg-primary py-[20px] px-4 rounded-lg text-white capitalize flex justify-center items-center`}>
          Update Product
        </button>}
    </form> 
    </div>
          </div>
        </div>
      </section>
  );
}

export default ProductAddForm;
