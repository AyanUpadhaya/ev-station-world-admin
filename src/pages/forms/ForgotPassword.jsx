import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ForgetPasword = () => {
    const navigate = useNavigate()
    const [isButtonDisabled,setIsButtonDisabled] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const handleSubmit = async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      setIsLoading(true)
      setIsButtonDisabled(true)
      const formData = new FormData();
      formData.append("data", JSON.stringify({ email }));
      const config = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(`${baseUrl}/admins/reset`, config);
    if (response.ok) {
        const responseData = response.json();
        setIsLoading(false)
        setIsButtonDisabled(false)
        toast.success('Reset Link Send',{
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        navigate('/')
    } else {
        const errorData = await response.json();
        toast.error(errorData.message,{
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        setIsLoading(false)
        setIsButtonDisabled(false)

        return errorData
    }
      
    };
    return (
      <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi w-full px-6">
        <div className="w-full h-full px-6 flex items-center justify-center overflow-hidden ">
          <div className="">
            <div className="text-center mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold mt-2">
                Forgot Password
              </h1>
            </div>
            <div className=" w-[30rem] max-w-[30rem] py-12 px-10 rounded-lg bg-white shadow-md mx-auto">
              <form
                className="flex flex-col w-full gap-4 "
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-blackHigh">Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    name="email"
                    className={`w-full border border-slateLow  rounded-lg outline-none p-4`}
                  />
                </div>
                <button
                  className={`py-4 normal-case mt-4 mb-6 rounded-lg ${isButtonDisabled?'bg-disabledColor':'bg-primary'} text-white font-semibold`}
                  type="submit"
                >
                  {isLoading?<span className="loading loading-dots loading-sm"></span>:'Send'}
                </button>
                
              </form>
              ]-
            </div>
          </div>
        </div>
      </section>
    );
  };
  export default ForgetPasword;