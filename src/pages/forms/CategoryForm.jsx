import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'

function CategoryForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setIsLoading(true)
    setIsButtonDisabled(false)
    const isDataUpdated = Object.keys(myCategories).some((key) => myCategories[key] !== payload[key]);
    if(isDataUpdated){
      const editedFields = {};
      // Compare each field with its original value and store the edited ones
      Object.keys(myCategories).forEach((key) => {
        const newValue = myCategories[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== '') {
          editedFields[key] = newValue;
        }
      });
      setIsButtonDisabled(true)

      setTimeout(()=>{
        dispatch(updateCategory({ data: editedFields, id: payload._id }))
        setIsLoading(false)
        setIsButtonDisabled(false)
        navigate('/categories')
      },1500)
    }else{
      notify()
      setIsLoading(false)
    }    
    
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const form = event.target;
    const categoryName = form.categoryName.value;
    //for update
    if(payload && type){
      if(payload.name!==categoryName){
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
    <section className="py-6 px-8">
      <div>
        <BackToPrev
          path="/categories"
          title={`Back`}
        ></BackToPrev>

        <div className="bg-white p-6 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp" >Category Name</span>
                <input
                  type="text"
                  name="categoryName"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Type Category Name"
                  defaultValue={payload?.name}
                  required
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

export default CategoryForm;
