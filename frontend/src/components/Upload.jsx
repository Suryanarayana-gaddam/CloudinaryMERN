import React, { useEffect, useState } from 'react'

const Upload = () => {
    const [errors,setErrors] = useState({});
    const [img,setImg] = useState("");
    const [video,setVideo] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const handlePicCollect = (e) => {
        e.preventDefault();
        setIsLoading(true);
        var reader = new FileReader();
        reader.onloadend = function () {
            setImg(reader.result);
        }
        reader.readAsDataURL(e.target.files[0])
        setIsLoading(false);
    }

    const handleVideoCollect = (e) => {
        e.preventDefault();
        setIsLoading(true);
        var reader = new FileReader();
        reader.onloadend = function () {
            setVideo(reader.result);
        }
        reader.readAsDataURL(e.target.files[0])
        setIsLoading(false);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        const form = e.target;
        const validate = () => {
            const newErrors = {};

            if(form.title.value.length !== 50){newErrors.title = "Title should be 50 chars exactly!"}

            if(form.description.value.length !== 200){newErrors.title = "Title should be 200 chars exactly!"}

            const imgExtention = String(form.image.value).slice((form.image.value.lastIndexOf(".")+1));
            if(!["jpg","png"].includes(imgExtention)){newErrors.image = "Only .jpg and .png formats allowed!"}

            const fileExtention = String(form.video.value).slice((form.video.value.lastIndexOf(".")+1));
            if(!["mpg","avi","mp4"].includes(fileExtention)){newErrors.video = "Only .mp4 MPG AVI formats allowed!"}

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
        if(!validate()){return}

        const data =  {
            title : form.title.value,
            description : form.description.value,
            image : img,
            video : video
        }
        fetch("https://cloudinarymernapi.onrender.com/upload",{
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data)
        }).then(response => {return response.json()})
        .then(res =>{
            form.reset();
            setIsLoading(false);
            setImg("");
            alert(res.message)
        }).catch(error =>{
            setIsLoading(false);
            console.log(error.message)
        })
    }

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
    <div className='grid place-items-center justify-center h-screen'>
        <div className='h-fit border-4 border-rose-300 p-4'>
            <div className='bg-amber-200 w-full h-10'>
               <h1 className='text-2xl font-bold text-rose-500 text-center '>Upload Details :</h1>
            </div>
            <form onSubmit={handleSubmit} className='w-full gap-4 grid justify-center border-2 h-full border-none'>
                <div>
                    <label htmlFor="title" className='font-semibold text-xl text-red'>Title : </label>
                    <input type="text" name='title' id='title' minLength={50} maxLength={50} autoFocus className='rounded border-zinc-400 border-2 ml-10 text-center w-5/6 '/>
                    {errors.title && <span className='text-red-500'>{errors.title}</span>}
                </div>
                <div>
                    <label htmlFor="description" className='font-semibold text-xl'>Description : </label>
                    <textarea name="description" id="description" className='rounded border-zinc-400 border-2 text-center w-5/6 ml-10 mt-1' minLength={200} maxLength={200}></textarea>
                    {errors.description && <span className='text-red-500 '>{errors.description}</span>}
                </div>
                <div className='relative'>
                    <label htmlFor="image" className='font-semibold text-xl'>Image : </label><br />
                    <input type="file"  name='image' onChange={handlePicCollect} id='image' accept='.jpg,.png' className='border-zinc-400 border-2 text-center w-5/6 ml-10 mt-1 rounded cursor-pointer'/>
                    {img && <img src={img} alt=""  width={100} height={80} className={`ml-20 mt-4 `}/>}
                    {errors.image && <span className='text-red-500 absolute left-10 bottom-[-20px]'>{errors.image}</span>}
                </div>
                <div className='relative'>
                    <label htmlFor="video" className='font-semibold text-xl'>Video : </label><br />
                    <input type="file" name='video' id='video' onChange={handleVideoCollect} accept='.mpg,.avi,.mp4' className='border-zinc-400 border-b-2 border-spacing-1 ml-10 rounded cursor-pointer'/>
                    {/* {video && <video src={video} alt=""  width={100} height={100} className={`ml-20 mt-4 `}/>} */}
                    {errors.video && <span className='text-red-500 absolute left-10 bottom-[-20px]'>{errors.video}</span>}
                </div>  
                <div className='grid place-items-center mt-2'>
                    <button className='bg-blue-500 w-full h-8 rounded-xl hover:bg-blue-100 hover:text-blue-950 hover:font-bold'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Upload
