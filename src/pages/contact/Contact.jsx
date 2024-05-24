import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import ContactRequestTable from '../../components/tables/contact/ContactRequestTable';


function Contact() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
    const data=[
          {
            _id:"contact_one",
            name:"Emily Becket",
            email:'emily@gmail.com',
            msg:'Hi I would like to purchase this chargers',
            timestamp:1699270440,
          },
          {
            _id:"contact_two",
            name:"Jhon Becket",
            email:'jhon@gmail.com',
            msg:'Hi I would like to purchase this chargers',
            timestamp:1699270440,
          },
          {
            _id:"contact_three",
            name:"Jimmy Becket",
            email:'jImmy@gmail.com',
            msg:'Hi I would like to purchase this chargers',
            timestamp:1699270440,
          },

          {
            _id:'user_tweleve',
            name:'First Albert of North stark',
            email:'albert@gmail.com',
            msg:'Hi I would like to purchase this chargers',
            timestamp:1699679562,
          },
          
          
    ];
  
  
 
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
    }
    const filterBySearch = (data) => {
      if (searchValue.trim().length > 0) {
        return data?.name?.toLowerCase().includes(searchValue?.toLowerCase());
       
      } else {
        return data;
      }
    };
    
    let content = null;
  
    if (isLoading) {
      content = <SearchLoader></SearchLoader>;
    } else if (!isLoading && isError) {
      content = <SomethingWrong></SomethingWrong>;
    } else if (!isLoading && !isError && data.length === 0) {
      content = <NoData></NoData>;
    } else if (!isLoading && !isError && data.length > 0) {
      const newData = [...data].sort(sortByTime)?.filter(filterBySearch);
      content = (
        <ContactRequestTable data={newData} setIsAscending={setIsAscending}></ContactRequestTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Contact Request"
            path=""
            value={searchValue}
            onChange={onChange}
            isNotAddable={true}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-75px)]">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default Contact
;
  
