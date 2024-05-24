import React, { useState } from "react";
import { circle } from "../../assets/getAssets";
import { useEffect } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Pagination } from "../shared/pagination/Pagination";
import NoData from "../shared/ui/NoData";
import { useNavigate } from "react-router-dom";
import ShowToolTip from "../../util/ShowToolTip";

function ServiceCards({ data, handler }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsLoading(false)
  //   },500)
  // },[])

  function handleNavigate(item) {
    navigate("/service-edit", {
      state: {
        payload: item,
        type: "edit",
      },
    });
  }

  const handleDelete = () => {
    handler({ id: selectedItem });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="w-full h-[calc(100%-75px)] overflow-auto relative no-scrollbar">
        {currentRows?.length === 0 && (
          <div className="w-full flex items-center justify-center">
            {" "}
            <NoData></NoData>
          </div>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {currentRows?.map((item, i) => (
            <div
              className="bg-white rounded-md overflow-hidden"
              key={item?._id}
            >
              {isLoading ? (
                <div className="h-60 w-full">
                  <img
                    src={circle}
                    className=" object-cover bg-center "
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="h-60 w-full flex justify-center items-center">
                  <img
                    src={item.imgUrl}
                    alt=""
                    className="object-cover bg-center "
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-4 flex justify-between">
                <span className="font-semibold text-blackHigh flex-1" >
                  <ShowToolTip name={item?.title}>
                    {item?.title?.length > 12
                    ? item?.title?.slice(0, 12) + "..."
                    : item?.title}
                  </ShowToolTip>
                
              
                  
                </span>

                <div className="flex items-center gap-1">
                  {/* label to delete */}
                  <label
                    htmlFor="confirmationPopup"
                    className="cursor-pointer bg-white rounded-md   text-white text-sm"
                    onClick={() => setSelectedItem(item?._id)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                        fill="#FF6B6B"
                        stroke="#FF6B6B"
                      ></path>
                    </svg>
                  </label>

                  {/* label to view */}
                  <button
                    className="cursor-pointer bg-white rounded-md px-2 text-white text-sm"
                    onClick={() => handleNavigate(item)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2599 3.59924L5.04985 12.2892C4.73985 12.6192 4.43985 13.2692 4.37985 13.7192L4.00985 16.9592C3.87985 18.1292 4.71985 18.9292 5.87985 18.7292L9.09985 18.1792C9.54985 18.0992 10.1799 17.7692 10.4899 17.4292L18.6999 8.73924C20.1199 7.23924 20.7598 5.52924 18.5499 3.43924C16.3499 1.36924 14.6799 2.09924 13.2599 3.59924Z"
                        fill="#FF9F43"
                        stroke="#FF9F43"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008L11.8901 5.05078Z"
                        fill="#FF9F43"
                      ></path>
                      <path
                        d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008"
                        stroke="#FF9F43"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M3 22H21"
                        stroke="#FF9F43"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
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
        <ConfirmationModal
          title="Service"
          handleStatus={handleDelete}
        ></ConfirmationModal>
      </div>
    </div>
  );
}

export default ServiceCards;
