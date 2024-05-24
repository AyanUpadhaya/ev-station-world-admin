import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import ReviewsTable from '../../components/tables/reviews/ReviewsTable';
import SearchBar from '../../components/shared/searchbar/SearchBar';

function Reviews() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
    const data=[
        {
            _id:"review_one",
            name:"Robert Fox",
            rating:"4.5",
            description:"I love my car its perfect for me.",
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:"review_two",
            name:"Robert James",
            rating:"4.5",
            description:"I love my car its perfect for me.",
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:"review_three",
            name:"Anita Fox",
            rating:"4.5",
            description:"I love my car its perfect for me.",
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:"review_four",
            name:"Robert Clive",
            rating:"4.5",
            description:"I love my car its perfect for me.",
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:'review_five',
            name:'First Albert of North stark',
            rating:"4.8",
            description:"I love my car its perfect for me.",
            imgUrl:`${profileDummy}`,
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
        <ReviewsTable data={newData} setIsAscending={setIsAscending}></ReviewsTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Reviews"
            path=""
            value={searchValue}
            onChange={onChange}
            isNotAddable={true}
            modalId ={'uploadPopUp'}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-75px)] overflow-auto flex flex-col justify-between flex-wrap">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default Reviews;
  
