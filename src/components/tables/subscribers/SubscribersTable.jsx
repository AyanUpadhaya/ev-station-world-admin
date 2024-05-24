import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { Pagination } from "../../shared/pagination/Pagination";
import NoData from "../../shared/ui/NoData";
import UpDownArrow from "../../Svg/UpDownArrow";
import { useDispatch, useSelector } from "react-redux";
import { profileDummy } from "../../../assets/getAssets";
import { useEffect } from "react";

// import { deletesubscriberById, getAllsubscribers } from "../../../features/subscribers/subscribersSlice";
function SubscribersTable({ data,setIsAscending }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const dispatch = useDispatch()
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const [subscriberid,setsubscriberId] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const subscribers = useSelector(state=>state.subscribers)
  
  const handleNavigate = (item) => {
    navigate("/subscriber-edit", {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };
  const handleDelete=()=>{
    dispatch(deletesubscriberById(subscriberid))
  }

  useEffect(()=>{
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },1500)
  },[])
 

  return (
    
    <div className="h-full flex flex-col justify-between">
      <div className=" overflow-x-auto">
        <table className="table w-full table-pin-rows table-pin-cols">
          <thead className=" p-0">
            <tr className="font-bold  text-3xl text-blackHigh">
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Sl.</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Photo</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Name</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Email</th>
              
              {/* date */}
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5 flex gap-2 cursor-pointer" onClick={()=>setIsAscending(prev=>!prev)}>
                Subscribed
                <UpDownArrow/>
              </th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          {currentRows?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="10" className="">
                  <NoData></NoData>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="">
              {currentRows?.map((subscriber, i) => (
                <tr className=" bg-white text-blackSemi" key={i}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                  <img
                  src={subscriber.imgUrl}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                  </td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">
                  {subscriber?.fullName.length>16?subscriber?.fullName.slice(0,16)+"...":subscriber?.fullName}
                    </td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">{subscriber?.email}</td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">
                  {new Date(subscriber?.timestamp*1000).toLocaleDateString({
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                  })}
                  </td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins flex items-center justify-end gap-4">
                    {/* label to delete */}
                    <label
                      htmlFor="confirmationPopup"
                      className="cursor-pointer"
                      onClick={()=>setsubscriberId(subscriber._id)}
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
                        />
                      </svg>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.length}
        ></Pagination>
      <ConfirmationModal title={'Subscriber'} handleStatus={handleDelete} ></ConfirmationModal>
        
      </div>
    </div>
  );
}

export default SubscribersTable;
