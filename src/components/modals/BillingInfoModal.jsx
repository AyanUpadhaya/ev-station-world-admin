import React from "react";

const BillingInfoModal = ({ modalClose, billingData }) => {
  return (
    <section>
      <input type="checkbox" id="billingInfoPopUp" className="modal-toggle" />
      <div className="modal  modal-middle">
        <div className=" w-[550px] bg-white px-8 py-8 rounded-xl">
          <div className="flex flex-col gap-2">

            <h4 className=" text-blackMediumEmp text-xl font-bold ">{billingData?.fullName}</h4>
            <p className=" text-blackMediumEmp text-lg font-bold ">{billingData?.email}</p>
           <div className="grid grid-cols-1 gap-1 ">
           <p className=" text-blackMediumEmp text-base">
                <strong>Company</strong>: {billingData?.companyName}
            </p>
            <p className=" text-blackMediumEmp text-base">
                <strong>Country</strong>: {billingData?.country}
            </p>
            <p className=" text-blackMediumEmp text-base">
                <strong>Town</strong>: {billingData?.town}
            </p>
            <p className=" text-blackMediumEmp text-base">
                <strong>Address</strong>: {billingData?.streetAddress}, {billingData?.state},{billingData?.zipCode}
            </p>
            <p className=" text-blackMediumEmp text-base">
                <strong>Phone</strong>: {billingData?.phone}
            </p>
            <p className=" text-blackMediumEmp text-base">
                <strong>Payment Method</strong>:{billingData?.paymentMethod}
            </p>
           </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="billingInfoPopUp"
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

export default BillingInfoModal;

