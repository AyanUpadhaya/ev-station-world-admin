import React from 'react'
import { car, chargingStation, homeChargers, profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import SericeCards from '../../components/cards/ServiceCards';

function Services() {
    const isLoading = false;
    const isError = false;
    const data=[
          {
            _id:"service_one",
            title:"Eh Vehicles",
            description:"Our electric vehicles are designed to provide a sustainable, efficient, and comfortable driving experience. With cutting-edge technology, reliable performance, and zero-emission, our electric cars offer a smarter and cleaner way to travel. Whether you are commuting to work, running errands, or taking a road trip, our electric vehicles are the perfect choice for eco-conscious drivers who value comfort, style, and innovation.",
            imgUrl:`${car}`,
            timestamp:1699270440,
          },
          {
            _id:"service_two",
            title:"Charging Station",
            description:"Our electric vehicles are designed to provide a sustainable, efficient, and comfortable driving experience. With cutting-edge technology, reliable performance, and zero-emission, our electric cars offer a smarter and cleaner way to travel. Whether you are commuting to work, running errands, or taking a road trip, our electric vehicles are the perfect choice for eco-conscious drivers who value comfort, style, and innovation.",
            imgUrl:`${chargingStation}`,
            timestamp:1699270440,
          },
          {
            _id:"service_three",
            title:"Home Charging Multi Innovations",
            description:"Our electric vehicles are designed to provide a sustainable, efficient, and comfortable driving experience. With cutting-edge technology, reliable performance, and zero-emission, our electric cars offer a smarter and cleaner way to travel. Whether you are commuting to work, running errands, or taking a road trip, our electric vehicles are the perfect choice for eco-conscious drivers who value comfort, style, and innovation.",
            imgUrl:`${homeChargers}`,
            timestamp:1699270440,
          },
          {
            _id:"service_four",
            title:"VEVOR Level 1+2 EV Charger, 16 Amp 110-240V, Portable Electric Vehicle Charger with 25 ft",
            description:"Our electric vehicles are designed to provide a sustainable, efficient, and comfortable driving experience. With cutting-edge technology, reliable performance, and zero-emission, our electric cars offer a smarter and cleaner way to travel. Whether you are commuting to work, running errands, or taking a road trip, our electric vehicles are the perfect choice for eco-conscious drivers who value comfort, style, and innovation.",
            imgUrl:`${homeChargers}`,
            timestamp:1699270440,
          },
          
    ];
  
  
    const handleServiceDelete = (id)=>{
      console.log(id)
    }
  
    const [searchValue, setSearchValue] = useState("");
    
    const onChange = (e) => {
      const value = e.target.value;
      setSearchValue(value);
    };
  
    const sortByTime = (a, b) => {
      return b.timestamp - a.timestamp;
    };
  
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
        <SericeCards data={newData} handler={handleServiceDelete}></SericeCards>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Services"
            path="/service-add"
            value={searchValue}
            onChange={onChange}
            isNotAddable={false}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-75px)] overflow-auto flex flex-col justify-between flex-wrap">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default Services;
  
