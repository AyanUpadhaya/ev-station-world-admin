import React, { useState } from "react";
import { circle } from "../../assets/getAssets";
import { useEffect } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Pagination } from "../shared/pagination/Pagination";
import NoData from "../shared/ui/NoData";
import ShowToolTip from "../../util/ShowToolTip";

function GalleriesCards({ data, handler }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const [isLoading,setIsLoading] = useState(false)
  const [selectedItem,setSelectedItem]= useState(null)
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsLoading(false)
  //   },500)
  // },[])

  const handleDelete = ()=>{
    handler({id:selectedItem})
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="w-full h-[calc(100%-75px)] overflow-auto relative no-scrollbar">
        {currentRows?.length === 0 && (
          <div className="w-full flex items-center justify-center">
            {" "}
            <NoData></NoData>
          </div>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 p-6">
          {currentRows?.map((item, i) => (
            <div className="bg-white rounded-md overflow-hidden" key={item?._id}>
             {isLoading?<div><img src={circle} className="h-64 w-full object-cover bg-center "
                  loading="lazy"/></div>: <div>
                <img
                  src={item.imgUrl}
                  alt=""
                  className="h-64 w-full object-cover bg-center "
                  loading="lazy"
                />
              </div>}
              
              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-blackHigh w-2/4 ">
                <ShowToolTip name={item?.wallpaperName}>{item?.wallpaperName?.length > 10
                    ? item?.wallpaperName?.slice(0, 10) + "..."
                    : item?.wallpaperName}</ShowToolTip>
                </span>
                <label

                    htmlFor="confirmationPopup"
                    className="cursor-pointer bg-fadeColor rounded-md py-2 px-4 text-white text-sm"
                    onClick={()=>setSelectedItem(item?._id)}
                  >
                    Remove
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.length}
        ></Pagination>
        <ConfirmationModal title="Wallpaper" handleStatus={handleDelete}></ConfirmationModal>
      </div>
    </div>
  );
}

export default GalleriesCards;
