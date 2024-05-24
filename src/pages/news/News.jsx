import React from 'react'
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import { newsOne } from '../../assets/getAssets';
import NewsTable from '../../components/tables/news/NewsTable';

function News() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
   
    const data=[
        {
          _id:"news_one",
          title:"Consequat vestibulum enim",
          description:"Etiam accumsan turpis ultrics felis rutrum, feugiat iaculis porttitor.",
          imgUrl:`${newsOne}`,
          timestamp:1699270440,
        },
        {
          _id:"news_two",
          title:"Vibranium worlds strongest metal",
          description:"Etiam accumsan turpis ultrics felis rutrum, feugiat iaculis porttitor.",
          imgUrl:`${newsOne}`,
          timestamp:1699270440,
        },
        {
          _id:"news_three",
          title:"Consequat vestibulum enim",
          description:"Etiam accumsan turpis ultrics felis rutrum, feugiat iaculis porttitor.",
          imgUrl:`${newsOne}`,
          timestamp:1699270440,
        },
        {
          _id:"news_four",
          title:"Constantine of romarn empire got slaves",
          description:"Etiam accumsan turpis ultrics felis rutrum, feugiat iaculis porttitor.",
          imgUrl:`${newsOne}`,
          timestamp:1699944611,
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
        return data?.title?.toLowerCase().includes(searchValue?.toLowerCase());
       
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
        <NewsTable data={newData} setIsAscending={setIsAscending}></NewsTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="News"
            path="/news-add"
            value={searchValue}
            onChange={onChange}
            isNotAddable={false}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-75px)]">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default News;
  
