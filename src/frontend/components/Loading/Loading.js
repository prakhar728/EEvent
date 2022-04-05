import React from 'react'
import './Loading.css';
import loadingGif from '../../Assets/loading.gif';
const Loading = ({message}) => {
  return (
    <div className='loadingDiv'>
       <div className='loadingWrapper'>
        <div className='loadingImageWrapper'><img src={loadingGif} className='loadingGIF' alt='Loading GIFT' /></div>
        <div className='loadingTextWrapper'>Loading ...</div>
        {message && <div className='loadingMessage'>{message}</div>}
    </div>
    </div>
   
  )
}

export default Loading