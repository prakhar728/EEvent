import React from 'react'
import './Loading.css';
import loadingGif from '../../Assets/loading.gif';
const Loading = () => {
  return (
    <div className='loadingWrapper'>
        <div className='loadingImageWrapper'><img src={loadingGif} className='loadingGIF' alt='Loading GIFT' /></div>
        <div className='loadingTextWrapper'>Loading ...</div>
    </div>
  )
}

export default Loading