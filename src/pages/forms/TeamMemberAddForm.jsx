import React, { useState, useEffect } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { profileDummy } from "../../assets/getAssets";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { ToastContainer,toast } from "react-toastify";
// import { getAllUsers, resetPassword, updateUserById, updateUserPasswordByOldPassword } from "../../features/users/usersSlice";
import { useDispatch,useSelector } from "react-redux";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import showPassword from "../../util/showPassword";
import checkStrong from "../../util/CheckStrong";

dayjs.extend(customParseFormat);

function TeamMemberAddForm() {
  const { state } = useLocation();
  const { payload,type } = state || {};
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [gender, setGender] = useState("male");
  const [phoneValue, setPhoneValue] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowNewIcon, setIsShowNewIcon] = useState(true);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowCurrentIcon, setIsShowCurrentIcon] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [imgLoading,setImgLoading] = useState(false)
  const [myUser,setMyUser] = useState(
    {
      imgUrl:payload?.imgUrl || "",
      name:payload?.name||"",
      position:payload?.position || '',
      email:payload?.email||"",
      phone:payload?.phone || phoneValue,
      facebook:payload?.facebook||"",
      instagram:payload?.instagram||"",
      linkedin:payload?.linkedin ||"",
     });

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setTypeError(false);

    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
    }
  };

  const notify =()=>{
    toast.error("No valid data changes to update.",{
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    setIsButtonDisabled(true)
    setTimeout(()=>{
      const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if(password === confirmPassword){
      dispatch(resetPassword({ email:myUser?.email,newPassword:confirmPassword}))
      setIsLoading(false)
      setIsButtonDisabled(false)
      navigate("/users")
    }else{
      setIsLoading(false)
      setIsButtonDisabled(false)
      toast.error("Passwords don't match",{
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
 
    }
    },1000)
    
    
  };

  useEffect(() => {
    if (payload?._id) {
      setImagePreview(payload?.imgUrl);
      setPhoneValue(payload?.phone?.toString());
      setTimeLoading(false);
    }
  }, [payload]);

  useEffect(()=>{
    setMyUser((prev)=>({...prev,phone:phoneValue}));
  },[])

  return timeLoading ? (
    <div>Loading...</div>
  ) : (
    <section className="px-8 py-6 h-full overflow-auto">
      <BackToPrev path="/team" title="Back"></BackToPrev>
      <div className="bg-white p-6 rounded-2xl">
        <div>
          <form action="" onSubmit={handleSubmit}>
          <div className="relative max-w-max mb-6">
              <div className="">
                {imgLoading?<img
                  src={circle}
                  alt=""
                  className="w-32 h-32 rounded-full bg-center object-cover"
                />:<img
                src={imagePreview? imagePreview :  profileDummy }
                alt=""
                className="w-32 h-32 rounded-full bg-center object-cover"
              />}
                
              </div>
              <input
                type="file"
                id="profileImage"
                className="absolute opacity-0 w-0.5 h-0.5"
                onChange={handleFileChange}
              />
              <div className="max-w-max absolute right-0 bottom-0 rounded-full">
                <label
                  htmlFor="profileImage"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#75BFC0]  cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                  >
                    <path
                      d="M10.6045 0.0866487C10.9312 0.0866225 11.2522 0.171961 11.5358 0.334209C11.8194 0.496457 12.0556 0.729983 12.2212 1.01165L12.8995 2.16748H14.6253C15.3435 2.16748 16.0322 2.45271 16.5401 2.96044C17.048 3.46817 17.3334 4.15683 17.3337 4.87498V12.7916C17.3337 13.1473 17.2636 13.4995 17.1275 13.8281C16.9914 14.1567 16.7919 14.4552 16.5404 14.7067C16.2889 14.9582 15.9904 15.1577 15.6618 15.2938C15.3332 15.4299 14.981 15.5 14.6253 15.5H3.37533C2.65703 15.5 1.96816 15.2146 1.46024 14.7067C0.952334 14.1988 0.666992 13.5099 0.666992 12.7916V4.87498C0.666992 4.15669 0.952334 3.46781 1.46024 2.9599C1.96816 2.45199 2.65703 2.16665 3.37533 2.16665H5.10866L5.83783 0.979982C6.00548 0.706832 6.24036 0.481217 6.52003 0.324677C6.7997 0.168138 7.11483 0.0859002 7.43533 0.0858154H10.6045V0.0866487ZM10.6045 1.33665H7.43533C7.34413 1.33672 7.25406 1.35675 7.17142 1.39533C7.08879 1.43392 7.0156 1.49011 6.95699 1.55998L6.90283 1.63498L5.99199 3.11832C5.93614 3.20942 5.85786 3.28468 5.76464 3.33691C5.67141 3.38914 5.56635 3.41659 5.45949 3.41665H3.37616C3.18458 3.41654 2.99485 3.45418 2.81782 3.52742C2.64079 3.60066 2.47993 3.70806 2.34442 3.84349C2.20892 3.97892 2.10142 4.13972 2.02808 4.31671C1.95474 4.4937 1.91699 4.6834 1.91699 4.87498V12.7916C1.91699 13.5966 2.57033 14.25 3.37533 14.25H14.6253C15.0121 14.25 15.383 14.0963 15.6565 13.8228C15.93 13.5494 16.0837 13.1784 16.0837 12.7916V4.87498C16.0837 4.48821 15.93 4.11728 15.6565 3.84378C15.383 3.57029 15.0121 3.41665 14.6253 3.41665H12.542C12.433 3.41671 12.326 3.38828 12.2314 3.3342C12.1368 3.28011 12.058 3.20224 12.0028 3.10832L11.1428 1.64415C11.0877 1.55034 11.009 1.47255 10.9146 1.41847C10.8202 1.3644 10.7133 1.3359 10.6045 1.33582V1.33665ZM9.00033 4.66665C9.99489 4.66665 10.9487 5.06174 11.652 5.765C12.3552 6.46826 12.7503 7.42209 12.7503 8.41665C12.7503 9.41121 12.3552 10.365 11.652 11.0683C10.9487 11.7716 9.99489 12.1666 9.00033 12.1666C8.00577 12.1666 7.05194 11.7716 6.34868 11.0683C5.64541 10.365 5.25033 9.41121 5.25033 8.41665C5.25033 7.42209 5.64541 6.46826 6.34868 5.765C7.05194 5.06174 8.00577 4.66665 9.00033 4.66665V4.66665ZM9.00033 5.91665C8.67202 5.91665 8.34693 5.98131 8.04362 6.10695C7.7403 6.23259 7.46471 6.41673 7.23256 6.64888C7.00041 6.88103 6.81626 7.15663 6.69063 7.45994C6.56499 7.76325 6.50033 8.08834 6.50033 8.41665C6.50033 8.74495 6.56499 9.07004 6.69063 9.37336C6.81626 9.67667 7.00041 9.95227 7.23256 10.1844C7.46471 10.4166 7.7403 10.6007 8.04362 10.7263C8.34693 10.852 8.67202 10.9166 9.00033 10.9166C9.66337 10.9166 10.2993 10.6533 10.7681 10.1844C11.2369 9.71557 11.5003 9.07969 11.5003 8.41665C11.5003 7.75361 11.2369 7.11772 10.7681 6.64888C10.2993 6.18004 9.66337 5.91665 9.00033 5.91665V5.91665Z"
                      fill="white"
                    />
                  </svg>
                </label>
              </div>
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  required
                  name="name"
                  defaultValue={myUser?.name}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    fullName:e.target.value
                  }))}
                  disabled={isDisabled ? true : false}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>
              {/* Position */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Position</span>
                <input
                  type="text"
                  placeholder="Position"
                  required
                  name="fullname"
                  defaultValue={myUser?.position}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    fullName:e.target.value
                  }))}
                  disabled={isDisabled ? true : false}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>
              {/* Mobile Number */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Mobile Number</span>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  disabled={isDisabled ? true : false}
                  className={`w-full ${isDisabled?'bg-[#f4f4f4]':'bg-white'} border border-neutralColorTwoHundread  p-4  outline-none rounded-lg flex items-center gap-2`}
                ></PhoneInput>
              </div>
              {/* Email Address */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Your Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  defaultValue={myUser?.email}
                  disabled={isDisabled ? true : false}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    email:e.target.value
                  }))}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread   rounded-lg outline-none p-4`}
                />
              </div>
              {/* Facebook */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Facebook</span>
                <input
                  type="text"
                  placeholder="Facebook"
                  required
                  name="fullname"
                  defaultValue={myUser?.facebook}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    fullName:e.target.value
                  }))}
                  disabled={isDisabled ? true : false}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Instagram</span>
                <input
                  type="text"
                  placeholder="Instagram"
                  required
                  name="fullname"
                  defaultValue={myUser?.instagram}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    fullName:e.target.value
                  }))}
                  disabled={isDisabled ? true : false}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>

              {/* Linkedin */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Linkedin</span>
                <input
                  type="text"
                  placeholder="Linkedin"
                  required
                  name="fullname"
                  defaultValue={myUser?.linkedin}
                  onChange={(e)=>setMyUser(prev=>({
                    ...prev,
                    fullName:e.target.value
                  }))}
                  disabled={isDisabled ? true : false}
                  className={`${isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"} w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>
         
             
              
            </div>
            <div className="mt-8">
              {
                type === 'edit'? <button
                type="submit"
                  className={`w-[200px] h-[59px] ${isButtonDisabled?'bg-disabledColor':'bg-primary'} text-white capitalize px-4 py-5 font-semibold flex justify-center items-center rounded-lg cursor-pointer`}
                  disabled={isButtonDisabled}
                >
                  {isLoading?<span className="loading loading-dots loading-sm"></span>:'Update'}
                </button>
                :
                <button
              type="submit"
                className={`w-[200px] h-[59px] ${isButtonDisabled?'bg-disabledColor':'bg-primary'} text-white capitalize px-4 py-5 font-semibold flex justify-center items-center rounded-lg cursor-pointer`}
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

export default TeamMemberAddForm;
