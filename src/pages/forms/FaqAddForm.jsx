import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'

function FaqAddForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [myFaq,setMyFaq] = useState({
    question: payload?.question || '',
    answer: payload?.answer ||""
  })
  const handleUpdateFaq = (e) => {
    e.preventDefault();
    setIsLoading(true)
    setIsButtonDisabled(false)
    const isDataUpdated = Object.keys(myFaq).some((key) => myFaq[key] !== payload[key]);
    if(isDataUpdated){
      const editedFields = {};
      // Compare each field with its original value and store the edited ones
      Object.keys(myFaq).forEach((key) => {
        const newValue = myFaq[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== '') {
          editedFields[key] = newValue;
        }
      });
      setIsButtonDisabled(true)

      setTimeout(()=>{
        dispatch(updateFaq({ data: editedFields, id: payload._id }))
        setIsLoading(false)
        setIsButtonDisabled(false)
        navigate('/faq')
      },1500)
    }else{
      notify()
      setIsLoading(false)
    }    
    
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const form = event.target;
    const faqQuestion = form.faqQuestion.value;
    //for update
    if(payload && type){
      if(payload.faqQuestion!==question){
        toast.success('Updated')
      }else{
        toast.error('nothing has changed')
      }
    }else{
      //for submit
      toast.success('Submitted')
    }
    
  }
  



  return (
    <section className="p-6">
      <div>
        <BackToPrev
          path="/faq"
          title={`Back`}
        ></BackToPrev>

        <div className="bg-white  w-full h-full overflow-y-scroll relative no-scrollbar">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp" >Question</span>
                <input
                  type="text"
                  name="faqTitle"
                  defaultValue = {payload?.question}
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Type Faq Title " 
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp" >Answer</span>
                
                 <textarea
            name="description"
            defaultValue = {payload?.answer}
            className="h-60 w-full font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
          />
              </div>
              
            </div>

            {/* submit button  */}
            <div className="mt-6">
              {
                type === "edit" ?
                  <button
                  type="submit"
                    className={`w-52 h-14 ${isButtonDisabled?'bg-disabledColor':'bg-primary'} py-[20px] px-4 rounded-lg capitalize flex justify-center items-center text-white font-semibold`}
                    disabled={isButtonDisabled}
                  >
                   {isLoading
                   ?<span className="loading loading-dots loading-sm"></span>:'Update'}
                  </button>
                  :
                  <button
                  type="submit"
                    className={`w-52 h-14 ${isButtonDisabled?'bg-disabledColor':'bg-primary'} py-[20px] px-4 rounded-lg capitalize flex justify-center items-center text-white font-semibold`}
                    disabled={isButtonDisabled}
                  >
                    {isLoading?<span className="loading loading-dots loading-sm"></span>:'Add'}
                  </button>
              }

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FaqAddForm;
