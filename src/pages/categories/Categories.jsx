import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import CategoriesTable from '../../components/tables/categories/CategoriesTable';

function Categories() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
    const data=[
          {
            _id:"category_one",
            name:"Home Chargers",
            timestamp:1699270440,
          },
          {
            _id:"category_two",
            name:"Cars",
            timestamp:1699270440,
          },
          {
            _id:"category_three",
            name:"Stations",
            timestamp:1699270440,
          },
          {
            _id:"category_four",
            name:"64Ah 12v Battery Tesla Motors Inventions",
            timestamp:1699686941,
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
        <CategoriesTable data={newData} setIsAscending={setIsAscending}></CategoriesTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Categories"
            path="/category-add"
            value={searchValue}
            onChange={onChange}
            isNotAddable={false}
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
  
  export default Categories;
  
