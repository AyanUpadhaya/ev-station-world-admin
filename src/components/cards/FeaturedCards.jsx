import React, { useState } from "react";
import { avatar } from "../../../assets/getAssets";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { Pagination } from "../pagination/Pagination";
import NoData from "../ui/NoData";

function FeaturedCards({ data, handler }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="w-full h-[calc(100%-75px)] overflow-auto">
        {currentRows?.length === 0 && (
          <div className="w-full flex items-center justify-center">
            {" "}
            <NoData></NoData>
          </div>
        )}
        <div className="w-full grid grid-cols-5 gap-6 p-6">
          {currentRows?.map((item, i) => (
            <div className="bg-white rounded-md overflow-hidden" key={i}>
              <div>
                <img
                  src={avatar}
                  alt=""
                  className="h-64 w-full object-cover bg-center "
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="font-semibold text-blackHigh">
                  {item?.name?.length > 18
                    ? item?.name?.slice(0, 18) + "..."
                    : item?.name}
                </p>
                {!item?.isTrending ? (
                  <button
                    type="button"
                    className="bg-primaryColor rounded-md py-2 px-4 text-white text-sm"
                    onClick={() => handler(item?.id)}
                  >
                    Set
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-fadeColor rounded-md py-2 px-4 text-white text-sm"
                    onClick={() => handler(item?.id)}
                  >
                    Remove
                  </button>
                )}
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
        <ConfirmationModal title="wallpaper request"></ConfirmationModal>
      </div>
    </div>
  );
}

export default FeaturedCards;
