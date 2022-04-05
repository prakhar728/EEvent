import React, { useEffect, useState } from 'react'
import './Organise.css';
import { create } from 'ipfs-http-client';
import Loading from '../Loading/Loading';
const client = create('https://ipfs.infura.io:5001/api/v0');

const Organise = ({nftContract,eventsContract}) => {
    const [loading, setloading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [eventName, seteventName] = useState('');
    const [eventDetails, seteventDetails] = useState('');
    const [ticketNumber, setticketNumber] = useState(0);
    const [currentdate, setdate] = useState(null);
    const [hostAddress, sethostAddress] = useState('');
    const [ticketPrice, setticketPrice] = useState('');
    const [loadingMessage, setloadingMessage] = useState('')
    
    const uploadToIPFS = async (event) => {
        setloadingMessage('Uploading to IPFS');
        setloading(true);
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                console.log(result)
                setImageFile(`https://ipfs.io/ipfs/${result.path}`)
                setloading(false);
                setloadingMessage('');
            } catch (error) {
                console.log("ipfs image upload error: ", error);
                setloading(false);
            }
        }

    }
    const handleSubmit = async(e) =>{
        setloadingMessage('Setting it up');
        setloading(true);
        e.preventDefault();
        try{
            const result = await client.add(JSON.stringify({imageFile,eventName,eventDetails,currentdate}));
            console.log(result);
            setloading(false);
            setloadingMessage('');
            listEvent(result);
        }
        catch(err){
            console.log(err);
        }
    }
    const listEvent = async(result) =>{
        setloadingMessage('Creating Event on the Blockchain');
        setloading(true);

        const uri = `https://ipfs.io/ipfs/${result.path}`;
        try{
            await( await eventsContract.createEvent(uri,ticketNumber,0,hostAddress,ticketPrice)).wait();
            setloading(false);
            setloadingMessage('');
        }
        catch(err){
            console.log(err);
            setloading(false);
        }
    }
    return (
        <>
        {loading && <Loading message={loadingMessage}/>}
        {<div className='organiseWrapper'>
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
                    <input type='text' className='ticketPrice' placeholder='Enter price of each ticket' value={ticketPrice} 
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