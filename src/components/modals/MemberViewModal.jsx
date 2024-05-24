import React, { useState } from "react";

const MemberViewModal = ({ modalClose, memberData }) => {


  return (
    <section>
      <input type="checkbox" id="memberPopUp" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-[550px] flex flex-col justify-start gap-6 bg-white px-8 py-8">
          <div className="flex flex-col justify-between gap-2">
            <div className="space-y-3 py-3 rounded-xl flex-1 flex flex-col justify-between items-center border border-fadedColor">
              <img src={memberData?.imgUrl} alt="" className="w-40 h-40" />
              <h4 className=" text-blackMediumEmp text-2xl font-bold ">{memberData?.name}</h4>
              <p className=" text-blackMediumEmp text-base font-bold ">
                  {memberData?.position}
              </p>
            </div>
            <div className="flex-shrink-0">
          { memberData?.facebook || memberData?.instagram || memberData?.linkedin ? <p className=" text-blackMediumEmp font-semibold text-[1.2rem] mb-2 ">
                Social Profiles
            </p>:''}
            <div className="space-x-3">
                {memberData?.facebook &&
                  <a href={memberData?.facebook} className="text-3xl">
                  <i className="fa-brands fa-facebook text-3xl"></i>
                  </a> }
                {memberData?.instagram &&
                <a href={memberData?.instagram} className="text-3xl">
                  <i className="fa-brands fa-instagram text-3xl"></i>
                </a> }
                {memberData?.linkedin && 
                  <a href={memberData?.linkedin} className="text-3xl">
                    <i className="fa-brands fa-linkedin text-3xl"></i>
                  </a>
                }
            </div>
            </div>

          </div>
          <div className="modal-action">
            <label
              htmlFor="memberPopUp"
              className="w-40 text-center cursor-pointer py-4 px-4  normal-case rounded-lg bg-primary text-white font-semibold"
              data-hs-overlay={modalClose || ""} 
              
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberViewModal;
