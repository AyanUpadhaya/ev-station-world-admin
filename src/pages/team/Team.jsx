import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import TeamTable from '../../components/tables/team/TeamTable';

function Team() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] =useState(false)
    const data=[
          {
            _id:"team_one",
            name:"Theresa Web",
            position:'CEO',
            email:'theresa@gmail.com',
            facebook:'https://www.facebook.com/theresa',
            instagram:'https://www.instagram.com/theresa',
            linkedin:'https://www.linkedin.com/theresa',
            phone:'+8801516166485',
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:"team_two",
            name:"Katherin Murphy",
            position:'CFO',
            email:'katherin@gmail.com',
            facebook:'https://www.facebook.com/katherin',
            instagram:'https://www.instagram.com/katherin',
            linkedin:'https://www.linkedin.com/katherin',
            phone:'+8801516166485',
            imgUrl:`${profileDummy}`,
            timestamp:1699270440,
          },
          {
            _id:"team_three",
            name:"Devon Lane",
            position:'CTO',
            email:'devon@gmail.com',
            facebook:'https://www.facebook.com/theresa',
            instagram:'https://www.instagram.com/theresa',
            linkedin:'https://www.linkedin.com/theresa',
            phone:'+8801516166485',
            imgUrl:`${profileDummy}`,
            timestamp:1699679562,
          },
          {
            _id:'team_four',
            name:'First Albert of North stark',
            position:'Staff',
            email:'albert@gmail.com',
            phone:'+8801516166470',
            gender:'male',
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
    };
  
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
        <TeamTable data={newData} setIsAscending={setIsAscending}></TeamTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Team"
            path="/team-add"
            value={searchValue}
            onChange={onChange}
            isNotAddable={false}
            modalId ={'uploadPopUp'}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-78px)]">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default Team;
  
