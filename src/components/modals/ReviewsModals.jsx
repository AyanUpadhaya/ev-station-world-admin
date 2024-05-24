import React from "react";

const ReviewsModals = ({ modalClose, reviewData }) => {
  return (
    <section>
      <input type="checkbox" id="reviewPopUp" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-[550px] flex flex-col justify-start gap-6 bg-white px-8 py-8">
          <div className="border border-fadedColor p-4 rounded-xl">
            <img src={reviewData?.imgUrl} alt="" className="w-40 h-40" />
            <h4 className=" my-4 text-blackMediumEmp text-2xl font-bold ">{reviewData?.name}</h4>
            <p className=" text-blackMediumEmp text-lg">
                {reviewData?.description}
            </p>
          </div>
          <div className="modal-action">
            <label
              htmlFor="reviewPopUp"
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

export default ReviewsModals;
