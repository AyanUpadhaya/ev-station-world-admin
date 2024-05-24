import React from "react";

const ContactModals = ({ modalClose, contactData }) => {
  return (
    <section>
      <input type="checkbox" id="contactPopUp" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-[550px] flex flex-col justify-start gap-6 bg-white px-8 py-8">
          <div className="flex flex-col gap-3 ">
            <h4 className=" text-blackMediumEmp text-2xl font-bold ">{contactData?.name}</h4>
            <p className=" text-blackMediumEmp text-lg font-bold ">{contactData?.email}</p>
            <p className=" text-blackMediumEmp text-base">
                {contactData?.msg}
            </p>
          </div>
          <div className="modal-action">
            <label
              htmlFor="contactPopUp"
              className="w-40 text-center cursor-pointer p-4 normal-case rounded-lg bg-primary text-white font-semibold"
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

export default ContactModals;
