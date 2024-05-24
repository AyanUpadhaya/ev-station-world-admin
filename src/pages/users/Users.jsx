import React, { useState,useEffect } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import { useSelector,useDispatch } from "react-redux";
// import { getAllUsers } from "../../features/users/usersSlice";
import { ToastContainer } from "react-toastify";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import UserTable from "../../components/tables/users/UsersTable";
import { profileDummy } from "../../assets/getAssets";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
function Users() {
  const dispatch = useDispatch()
  const isLoading =false;
  const isError = false;
  const [isAscending,setIsAscending] = useState(false)
  const data = [
    {
    _id:"user_one",
    imgUrl:profileDummy,
    fullName:'Jhon Wick',
    email:'jhonwick@gmail.com',
    phone:'+8801516166485',
    gender:'male',
    timestamp:1699270440,
  },
    {
    _id:"user_two",
    imgUrl:profileDummy,
    fullName:'Jhon Doe',
    email:'jhondoe@gmail.com',
    phone:'+8801516166486',
    gender:'male',
    timestamp:1699270440,
  },
    {
    _id:"user_three",
    imgUrl:profileDummy,
    fullName:'Jhon Smith',
    email:'jhonsmith@gmail.com',
    phone:'+8801516166488',
    gender:'male',
    timestamp:1699270440,
  },
  {
    _id:'user_four',
    imgUrl:profileDummy,
    fullName:'Jhon Mayers',
    email:'jhonmayers@gmail.com',
    phone:'+8801516166488',
    gender:'male',
    timestamp:1699679562,

  },
  {
    _id:'user_five',
    imgUrl:profileDummy,
    fullName:'Peter Parker',
    email:'peterparker@gmail.com',
    phone:'+8801516166488',
    gender:'male',
    timestamp:1699679562,
  },
  {
    _id:'user_six',
    imgUrl:profileDummy,
    fullName:'Bill Clinton',
    email:'billclinton@gmail.com',
    phone:'+8801516166470',
    gender:'male',
    timestamp:1699679562,
  },
  {
    _id:'user_seven',
    imgUrl:profileDummy,
    fullName:'Ken Mayers',
    email:'kenmyers@gmail.com',
    phone:'+8801516166488',
    gender:'male',
    timestamp:1699679562,

  },
  {
    _id:'user_eight',
    imgUrl:profileDummy,
    fullName:'Mary Parker',
    email:'maryparker@gmail.com',
    phone:'+8801516166488',
    gender:'female',
    timestamp:1699679562,
  },
  {
    _id:'user_nine',
    imgUrl:profileDummy,
    fullName:'Henry Clinton',
    email:'henryclinton@gmail.com',
    phone:'+8801516166470',
    gender:'male',
    timestamp:1699679562,
  },
  {
    _id:'user_ten',
    imgUrl:profileDummy,
    fullName:'Ben Parker',
    email:'benparker@gmail.com',
    phone:'+8801516166488',
    gender:'male',
    timestamp:1699679562,
  },
  {
    _id:'user_eleven',
    imgUrl:profileDummy,
    fullName:'Tony stark',
    email:'tonystark@gmail.com',
    phone:'+8801516166470',
    gender:'male',
    timestamp:1699679562,
  },
  {
    _id:'user_tweleve',
    imgUrl:profileDummy,
    fullName:'First Albert of North stark',
    email:'albert@gmail.com',
    phone:'+8801516166470',
    gender:'male',
    timestamp:1699679562,
  },
    
]
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    if(isAscending){
      return a.timestamp - b.timestamp;

    }else{
      return b.timestamp - a.timestamp;

    }
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.fullName?.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };


  let content = null;
  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading &&isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data.length > 0) {
    const newData = [...data]?.sort(sortByTime)?.filter(filterBySearch);
    content = <UserTable data={newData} setIsAscending={setIsAscending}></UserTable>;
  }

  return (
    <section className="h-full w-full px-4 md:px-6 py-6 overflow-auto">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Users"
          path=""
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        ></SearchBar>
        
        <div className="h-[calc(100%-78px)] ">{content}</div>
      </div>
    </section>
  );
}

export default Users;
