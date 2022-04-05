import React, { useEffect, useState } from 'react'
import './Organise.css';
import { create } from 'ipfs-http-client';
import Loading from '../Loading/Loading';
const client = create('https://ipfs.infura.io:5001/api/v0');

const Organise = () => {
    const [loading, setloading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [eventName, seteventName] = useState('');
    const [eventDetails, seteventDetails] = useState('');
    const [ticketNumber, setticketNumber] = useState(null);
    const [currentdate, setdate] = useState(null);
    const [hostAddress, sethostAddress] = useState(null);
    const [ticketPrice, setticketPrice] = useState(null);
  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(imageFile, eventName, eventDetails, ticketNumber, currentdate);
    }
    const uploadToIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                const { cid } = result;
                console.log(cid);
                console.log(result)
                setImageFile(`https://ipfs.io/ipfs/${result.path}`)
                console.log(`https://ipfs.io/ipfs/${result.path}`);
            } catch (error) {
                console.log("ipfs image upload error: ", error)
            }
        }
    }

    return (
        <>
        {loading && <Loading />}
        {!loading && <div className='organiseWrapper'>
            <div className='inputAndNameWrapper'>
                <div className='inputImageWrapper'>
                    <input type='file' className='imageInput' onChange={uploadToIPFS} />
                </div>
                <div>
                    <input type='text' placeholder='Enter Name of Event' value={eventName}
                        onChange={e => seteventName(e.target.value)}
                        className='eventNameinput' /></div>
            </div>
            <div className='dateWrapper'>
                <div><input type='date' className='dateInput' onChange={e => {
                    setdate(e.target.value);
                    console.log(currentdate);
                }} /></div>
                <div><input className='eventHostAddress' value={hostAddress} onChange={e => sethostAddress(e.target.value)} type='text' placeholder='Address of the Performer' /></div>

            </div>
            <div>
                <div><textarea type='text' className='eventDetails' value={eventDetails}
                    onChange={e => seteventDetails(e.target.value)}
                /></div>
            </div>
            <div className='organiseAndTicketWrapper'>
                <div>
                    <input type='text' classname='ticketPrice' placeholder='Enter price of each ticket' value={ticketPrice} 
                    onChange={e=>setticketPrice(e.target.value)} />
                </div>
                <div><input type='number' className='ticketNumber' value={ticketNumber}
                    onChange={e => setticketNumber(e.target.value)} placeholder='Enter number of tickets'/></div>
                <div><button className='organiseButton' onClick={handleSubmit}>Organise!</button></div>
            </div>

        </div> }
        
        </>
    )
}

export default Organise