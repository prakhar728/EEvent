import React, { useEffect } from 'react'

const Home = ({nftContract,eventsContract}) => {

  const loadItems = async() =>{
    let events = [];
    const eventCount = await eventsContract.currentEventCount();
    console.log(parseInt(eventCount));
    for(let i=1;i<=eventCount;i++){
      const event = await eventsContract.events(i);

      if(event._ticketCount!=event._ticketsSold){
        console.log(event);
        console.log(event._eventDetails);
        const resultOfFetch = await fetch(event._eventDetails);
        const jsonResult = await resultOfFetch.json();
        console.log(jsonResult);
      }
    }
  }
  useEffect(() => {
    loadItems()
  }, [])
  
  return (
    <div>Home</div>
  )
}

export default Home