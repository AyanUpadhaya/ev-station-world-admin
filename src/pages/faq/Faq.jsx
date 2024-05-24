import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import FaqTable from '../../components/tables/faq/FaqTable';

function Faq() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
    const data=[
          {
            _id:"faq_one",
            question:"What is Redux",
            answer:'Redux is a state management library',
            timestamp:1699270440,
          },
          {
            _id:"faq_two",
            question:"What is React",
            answer:'React is a javascript UI library',
            timestamp:1699270440,
          },
          {
            _id:"faq_three",
            question:"What is Typescript",
            answer:'Typescript is a superset of javascript',
            timestamp:1699270440,
          },
          {
            _id:"faq_four",
            question:"What is CSS",
            answer:'CSS stands for cascading style sheet',
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
        return data?.question?.toLowerCase().includes(searchValue?.toLowerCase());
       
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
        <FaqTable data={newData} setIsAscending={setIsAscending}></FaqTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Faq"
            path="/faq-add"
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
  
  export default Faq;
  
