import React from 'react'
import BackToPrev from '../../components/shared/back/BackToPrev'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const NewsAddForm = () => {
    const { state } = useLocation();
    const { payload,type } = state || {};
    const [imagePreview, setImagePreview] = useState(payload?.imgUrl || "");
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);
    const [typeError, setTypeError] = useState(false);
    const [news, setNews] = useState({
        title: payload?.title ||"",
        description: payload?.description || "",
        imgUrl: payload?.imgUrl || "",
      });


  const navigate = useNavigate();

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
      fileRef.current.value = "";

    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
      fileRef.current.value = "";
    }
  };
  const handleFileDelete = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    fileRef.current.value = "";
  };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNews({
          ...news,
          [name]: type === 'checkbox' ? checked : value,
        });
    };


  return (
    <section className="p-6">
  <div className='w-full'>
    <BackToPrev path="/news" title={`Back`}></BackToPrev>

    <div className="bg-white  w-full h-full overflow-y-scroll relative no-scrollbar">
      <div className="">
        <form>
          <div className="mb-4">
            <label className="font-bold text-base font-poppins text-blackMediumEmp">
              Title:
            </label>
            <input
              type="text"
              name="title"
              defaultValue={news?.title}
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
              defaultValue={news?.description}
              onChange={handleInputChange}
              className="h-60 w-full font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
            />
          </div>

          {/* image  */}
        <div className="flex flex-col gap-1">
          {!imagePreview && <div>
          <span className="text-base font-poppins font-bold text-blackMediumEmp">Image</span>
            <div className="w-full relative">
              <input
                type="file"
                id="imageId"
                className="absolute opacity-0"
                onChange={(e) => handleFileChange(e)}
                required
                ref={fileRef}
                // className="font-poppins border border-neutralColorTwoHundrea px-2 py-[9px] w-full rounded-lg outline-none"
              />
              <label
                htmlFor="imageId"
                className="mb-5 w-2/4 flex items-center gap-2 py-[10px] px-2 font-poppins border border-neutralColorTwoHundrea rounded-lg cursor-pointer"
              >
                <span className="inline-block px-4 py-2 bg-maincolor text-white text-sm rounded-lg">
                  Chose File
                </span>
                <span className="text-xs text-blackSemi">Upload Image</span>
              </label>
            </div>
            {typeError && (
              <p className="text-xs text-errorColor mt-1 font-medium">
                Only JPG, JPEG or PNG file are supported
              </p>
            )}
          </div>}
        </div>
        {/* image preview */}
        {imagePreview && (
          <div className="flex flex-col gap-1">
            <span className="text-base font-poppins font-bold text-blackMediumEmp">Image Preview</span>
            <div className="w-fit font-poppins border border-neutralColorTwoHundrea rounded-lg outline-none p-2 flex items-center justify-between">
              <div className="flex items-start gap-2">
                <div>
                    <img
                    src={imagePreview}
                    alt=""
                    className="w-full h-[350px] rounded-sm bg-center object-cover"
                    />
                    <p className="text-blackSemi text-base">
                    {file?.name?.length > 35
                        ? file?.name?.slice(0, 35) + "..."
                        : file?.name}
                    </p>
                </div>
                <div>
                <button
                  className="flex items-center justify-center"
                  onClick={handleFileDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                      fill="#FF6B6B"
                      stroke="#FF6B6B"
                    />
                  </svg>
                </button>
              </div>
              </div>
              
            </div>
          </div>
        )}

          
          {type === 'edit' ?<button
            type="submit"
            className={`mx-auto w-52 h-14 bg-primary py-[20px] px-4 rounded-lg text-white capitalize flex justify-center items-center`}
          >
            Update News
          </button> :
          <button
          type="submit"
          className={`mx-auto w-52 h-14 bg-primary py-[20px] px-4 rounded-lg text-white capitalize flex justify-center items-center`}
        >
          Add News
        </button>}
        </form>
      </div>
    </div>
  </div>
</section>

  )
}

export default NewsAddForm