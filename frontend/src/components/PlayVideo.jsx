import React from 'react'
import { BiX } from 'react-icons/bi';
import { FaBackward, FaBackwardStep, FaX } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router-dom'

const PlayVideo = () => {
  const { videoId } = useLoaderData();
  console.log("VId:",videoId)
  const Version = String(videoId.slice(String(videoId).lastIndexOf("*")+1))
  const VideoId = String(videoId.slice(0,String(videoId).lastIndexOf("*")))
  const videoUrl = `https://res.cloudinary.com/dh4kugkxx/video/upload/v${Version}/NeonFlakeTask/Videos/${VideoId}.mp4`;

  return (
    <div className='grid place-items-center relative'>
      <h1 className='absolute right-0 md:right-10 lg:right-28 top-4'><Link to="/display/details"><FaX/></Link></h1>
      <h1>Play Video</h1>
      <video width="840" height="360" controls muted autoPlay >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default PlayVideo
