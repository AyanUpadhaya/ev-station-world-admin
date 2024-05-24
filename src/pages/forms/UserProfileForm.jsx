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

function UserProfileForm() {
  const { state } = useLocation();
  const { payload } = state || {};
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [gender, setGender] = useState("male");
  const [phoneValue, setPhoneValue] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [timeLoading, setTimeLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state=>state.users);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowNewIcon, setIsShowNewIcon] = useState(true);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowCurrentIcon, setIsShowCurrentIcon] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [myUser,setMyUser] = useState(
    {
      fullName:payload?.fullName||"",
      phone:payload?.phone || phoneValue,
      email:payload?.email||"",
      gender:payload?.gender||gender,
     });
  console.log(myUser)

  const navigate = useNavigate();

  const handleChange = (value) => {
    setMyUser((prev)=>({...prev,gender:value}));
  };

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
      setImagePreview(payload?.fileUrl);
      setGender(payload?.gender);
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
      <BackToPrev path="/users" title="My Profile"></BackToPrev>
      <div className="bg-white p-6 rounded-2xl">
        <div>
          <form action="" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  name="fullname"
                  defaultValue={myUser?.fullName}
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
              {/* Gender */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Gender</span>
                <div className="w-full">
                  <Select
                    className="w-full h-full border border-neutralColorTwoHundread  rounded-lg outline-none adSetting"
                    value={myUser?.gender}
                    disabled={isDisabled ? true : false}
                    onChange={handleChange}
                    aria-required
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </div>
              </div>
              
              {/* Password */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Password</span>
                <PasswordInput
                isShowPassword={isShowPassword}
                setIsShowPassword={setIsShowPassword}
                isShowIcon={isShowCurrentIcon}
                onInput={(e) => showPassword(setIsShowCurrentIcon, e)}
                name="password"
                placeholder={"Enter password"}
                required
              ></PasswordInput>
                
              </div>
              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">Confirm Password</span>
                <PasswordInput
                isShowPassword={isShowNewPassword}
                setIsShowPassword={setIsShowNewPassword}
                isShowIcon={isShowNewIcon}
                onInput={(e) => checkStrong(setIsShowNewIcon, setIsStrong, e)}
                name="confirmPassword"
                placeholder={"Enter Confirm your password"}
                required
              ></PasswordInput>
                
              </div>
              {/* image picker */}
              <div className="flex flex-col gap-1">
                
                <div className="">
                  {
                  <img
                    src={imagePreview? imagePreview: myUser?.fileUrl?myUser?.fileUrl:profileDummy}
                    alt=""
                    className="w-[72px] h-[40] bg-center object-cover"
                  />
                  }
                  
                </div>
             
              </div>
            </div>
            <div className="mt-8">
              <button
              type="submit"
                className={`w-[200px] h-[59px] ${isButtonDisabled?'bg-disabledColor':'bg-primary'} text-white capitalize px-4 py-5 font-semibold flex justify-center items-center rounded-lg cursor-pointer`}
                disabled={isButtonDisabled}
              >
                {isLoading?<span className="loading loading-dots loading-sm"></span>:'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfileForm;
