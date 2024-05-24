import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

import checkStrong from "../../util/CheckStrong";
import { baseUrl } from "../../util/api";
import PasswordInput from "../../components/shared/ui/PasswordInput";

function AdminReset() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();
  const handleInputTwo = (event) => {
    setIsShowConfirmIcon(event.target.value.trim().length > 0);
  };

  const { email } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const form = event.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
      setIsLoading(false)
      return;
    }
    const data = {
      email: email,
      newPassword,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const config = {
        method: 'PATCH',
        body: formData,
      };
    const response = await fetch(`${baseUrl}/admins/reset`, config);
    if (response.ok) {
      const responseData = response.json();
      setIsLoading(false)
      toast.success('Password Changed Successfully')
      navigate(`/login`);
    } else {
      const errorData = await response.json();
      setIsLoading(false)
      return errorData;
    }
  };
  return (
    <section className="min-h-screen w-full bg-authBg bg-cover bg-center object-cover flex items-center justify-center overflow-auto px-6">
      <div className="w-[30rem] max-w-[30rem] py-12 px-10 rounded-lg bg-whiteHigh shadow-md mx-auto">
        <div className="w-full max-w-[400px] mx-auto ">
          <div className="text-center">
            <div className="text-center flex items-center justify-center lg:text-left mb-6"></div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold mt-2">
              Reset Password
            </h1>
          </div>
          <form action="" className="w-full mt-10" onSubmit={handleSubmit}>
            {/* NEW PASSWORD  */}
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">New Password</span>
              <div className="w-full">
                <PasswordInput
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                  isShowIcon={isShowIcon}
                  onInput={(e) => checkStrong(setIsShowIcon, setIsStrong, e)}
                  name="newPassword"
                  placeholder={"Enter new password"}
                ></PasswordInput>
                {!isStrong && (
                  <p className="text-[10px] text-fadeColor md:mt-1">
                    Must contain more than 7 character with uppercase,
                    lowercase, symble and number
                  </p>
                )}
              </div>
            </div>
            {/* CONFIRM PASSWORD  */}
            <div className="flex flex-col gap-1 mt-6">
              <span className="text-blackHigh">Confirm Password</span>
              <div className="w-full">
                <PasswordInput
                  isShowPassword={isShowConfirmPassword}
                  setIsShowPassword={setIsShowConfirmPassword}
                  isShowIcon={isShowConfirmIcon}
                  onInput={(e) => handleInputTwo(e)}
                  name="confirmPassword"
                  placeholder={"Confirm password"}
                ></PasswordInput>
              </div>
            </div>
            <div className="mt-8 w-full">
              <button
                className="cursor-pointer py-4 normal-case mt-4 mb-6 w-full rounded-lg bg-primary text-white font-semibold"
                type="submit"
              >
                {isLoading?<span className="loading loading-dots loading-sm"></span>:'Reset'}
              </button>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </section>
  );
}
export default AdminReset;
