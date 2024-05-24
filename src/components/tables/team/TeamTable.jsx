import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { Pagination } from "../../shared/pagination/Pagination";
import NoData from "../../shared/ui/NoData";
import UpDownArrow from "../../Svg/UpDownArrow";
import MemberViewModal from "../../modals/MemberViewModal";



function TeamTable({ data,setIsAscending }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const [memberId,setMemberId] = useState(null)
  const [selectedItem,setSelectedItem] = useState(null)
  const [isLoading,setIsLoading] = useState(false)


  const handleDelete=()=>{
    console.log(reviewId)
  }

  const handleNavigate=(item)=>{
    navigate("/member-edit", {
        state: {
          payload: item,
          type: "edit",
        },
      });
  }

  return (
    
    <div className="h-full flex flex-col justify-between">
      <div className=" overflow-x-auto">
        <table className="table w-full table-pin-rows table-pin-cols">
          <thead className=" p-0">
            <tr className="font-bold  text-3xl text-blackHigh">
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Sl.</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Image</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Name</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Position</th>
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5">Email</th>
              
              {/* date */}
              <th className="bg-tablenav text-base text-blackMediumEmp font-poppins font-semibold py-5 flex gap-2 cursor-pointer" onClick={()=>setIsAscending(prev=>!prev)}>
                Date
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
              {currentRows?.map((member, i) => (
                <tr className=" bg-white text-blackSemi" key={i}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                  <img
                  src={member.imgUrl}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                  </td>
                  
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">
                  {member?.name?.length>16?member?.name.slice(0,16)+"...":member?.name}
                  </td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">{member?.position}</td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">{member?.email}</td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins">
                  {new Date(member?.timestamp*1000).toLocaleDateString({
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                  })}
                  </td>
                  <td className="py-3 text-blackLowEmp text-base font-normal font-poppins flex items-center justify-end gap-4">
                    {/* label to view */}
                    <label htmlFor="memberPopUp"
                      className="cursor-pointer"
                      onClick={()=>setSelectedItem(member)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.8283 9.4186L20.8282 9.41843C18.5878 5.89788 15.3515 3.92999 12 3.92999C10.3204 3.92999 8.68041 4.42003 7.17256 5.34551C5.66421 6.2813 4.29615 7.65444 3.17172 9.4186H20.8283ZM20.8283 9.4186C21.2661 10.1059 21.5 11.0397 21.5 11.9987C21.5 12.958 21.266 13.8885 20.8291 14.5702L20.8284 14.5713C19.7039 16.3355 18.3358 17.7087 16.8273 18.6445C15.3195 19.57 13.6796 20.06 12 20.06C8.64787 20.06 5.41201 18.1015 3.17217 14.5721L3.17172 14.5714M20.8283 9.4186L3.17172 14.5714M3.17172 14.5714C2.7338 13.8838 2.5 12.9525 2.5 11.995M3.17172 14.5714L2.5 11.995M2.5 11.995C2.5 11.0375 2.73377 10.1063 3.17164 9.41873L2.5 11.995ZM7.46 12C7.46 14.5053 9.48305 16.54 12 16.54C14.5169 16.54 16.54 14.5053 16.54 12C16.54 9.49466 14.5169 7.45999 12 7.45999C9.48305 7.45999 7.46 9.49466 7.46 12Z" fill="#54A0FF" stroke="#54A0FF"></path><path d="M9.65039 12C9.65039 10.695 10.7077 9.64001 12.0004 9.64001C13.2942 9.64001 14.3604 10.7062 14.3604 12C14.3604 13.2916 13.2965 14.35 12.0004 14.35C10.7065 14.35 9.65039 13.2939 9.65039 12Z" stroke="#54A0FF"></path></svg>
                    </label>

                    {/* button to edit */}
                    <button type="button" onClick={() => handleNavigate(member)}>
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
                        />
                        <path
                          d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008L11.8901 5.05078Z"
                          fill="#FF9F43"
                        />
                        <path
                          d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008"
                          stroke="#FF9F43"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 22H21"
                          stroke="#FF9F43"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    {/* label to delete */}
                    <label
                      htmlFor="confirmationPopup"
                      className="cursor-pointer"
                      onClick={()=>setMemberId(member._id)}
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
        <MemberViewModal memberData={selectedItem}></MemberViewModal>
      <ConfirmationModal title={'Member'} handleStatus={handleDelete} ></ConfirmationModal>
      </div>
    </div>
  );
}

export default TeamTable;
