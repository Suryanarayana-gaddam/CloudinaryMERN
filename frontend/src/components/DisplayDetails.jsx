import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const DisplayDetails = () => {
  const [url,setUrl] = useState("");
  const {data} = useFetch(url);
  const [details,setDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [videoId,setVideoId] = useState(null);
  useEffect(() => {
    setUrl("https://cloudinarymernapi.onrender.com/getDetails");
    setIsLoading(true);
    setTimeout(() =>{
      setDetails(data);
      setIsLoading(false);
    },1000)

  },[url])

  if(isLoading){
    return <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2'>
      {data && data.map((item,index) => (
        <div key={item._id} className='ml-1 border-2 border-green-300 shadow-xl hover:shadow-red-200'>
          <div className=' text-blue-500 font-bold'>
            <h1 className='text-center'>{index+1}</h1>
            <Link to={`/play/video/${String(item.video.public_id).slice(String(item.video.public_id).lastIndexOf("/")+1)}*${item.video.version}`} className='ml-2'>
              <span>{item.title}</span>
            </Link>
          </div>
          <div className='m-2'>
            <Link to={`/play/video/${String(item.video.public_id).slice(String(item.video.public_id).lastIndexOf("/")+1)}*${item.video.version}`} >
              <img src={item.image.url || `https://res.cloudinary.com/dh4kugkxx/${item.image.public_id}`} alt="" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayDetails
