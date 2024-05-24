import React from 'react'
import { profileDummy } from '../../assets/getAssets';
import { useState } from 'react';
import SearchLoader from '../../components/loaders/SearchLoader';
import SomethingWrong from '../../components/shared/ui/SomethingWrong';
import NoData from '../../components/shared/ui/NoData';
import SearchBar from '../../components/shared/searchbar/SearchBar';
import BillingInfoTable from '../../components/tables/billing/BillingInfoTable';



function BillingInfo() {
    const isLoading = false;
    const isError = false;
    const [isAscending,setIsAscending] = useState(false)
    const data=[
        {
            "_id":"info_one",
            "fullName": "John Doe",
            "companyName": "Acme Corporation",
            "phone": "+1 555-555-5555",
            "email": "john.doe@example.com",
            "country": "United States",
            "town": "San Francisco",
            "streetAddress": "123 Main Street",
            "state": "CA",
            "zipCode": "94105",
            "paymentMethod": "PayPal",
            "timestamp":1699270440,
          },
          {
            "_id":"info_two",
            "fullName": "Jane Doe",
            "companyName": "Acme Corporation",
            "phone": "+1 555-555-5556",
            "email": "jane.doe@example.com",
            "country": "United States",
            "town": "New York",
            "streetAddress": "456 Broadway",
            "state": "NY",
            "zipCode": "10013",
            "paymentMethod": "MasterCard",
            "timestamp":1699270440,
          },
          {
            "_id":"info_three",
            "fullName": "Peter Parker",
            "companyName": "Daily Bugle",
            "phone": "+1 555-555-5557",
            "email": "peter.parker@example.com",
            "country": "United States",
            "town": "Los Angeles",
            "streetAddress": "789 Hollywood Boulevard",
            "state": "CA",
            "zipCode": "90028",
            "paymentMethod": "Visa",
            "timestamp":1699270440,
          },
          {
            "_id":"info_four",
            "fullName": "Harry Marry James Parker",
            "companyName": "Daily News of North Carolina",
            "phone": "+1 555-555-5557",
            "email": "peter.parker@example.com",
            "country": "United States",
            "town": "Los Angeles",
            "streetAddress": "789 Hollywood Boulevard",
            "state": "CA",
            "zipCode": "90028",
            "paymentMethod": "Visa",
            "timestamp":1699270440,
          },
          {
            "_id":"info_five",
            "fullName": "James Parker",
            "companyName": "Daily News of North Carolina",
            "phone": "+8801516199568",
            "email": "james.parker@example.com",
            "country": "United States",
            "town": "Los Angeles",
            "streetAddress": "789 Hollywood Boulevard",
            "state": "CA",
            "zipCode": "90028",
            "paymentMethod": "Visa",
            "timestamp":1699944611,
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
        return data?.fullName?.toLowerCase().includes(searchValue?.toLowerCase());
       
      } else {
        return data;
      }
    };
    
    let content = null;
  
    if (isLoading) {
      content = <SearchLoader></SearchLoader>;
    } else if (!isLoading && isError) {
      content = <SomethingWrong></SomethingWrong>;
    } else if (!isLoading && !isError && data?.length === 0) {
      content = <NoData></NoData>;
    } else if (!isLoading && !isError && data?.length > 0) {
      const newData = [...data].sort(sortByTime)?.filter(filterBySearch);
      content = (
        <BillingInfoTable data={newData} setIsAscending={setIsAscending} ></BillingInfoTable>
      );
    }
  
  
   
    return (
      <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
        <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
          <SearchBar
            title="Billing Info"
            path=""
            value={searchValue}
            onChange={onChange}
            isNotAddable={true}
          >
  
          </SearchBar>
   
          <div className="h-[calc(100%-78px)]">
            {content}
          </div>
        </div>
        
      </section>
    );
  }
  
  export default BillingInfo
;
  
