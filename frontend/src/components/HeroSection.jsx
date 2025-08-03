import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  
  return (
    <div className='text-center'>
        
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2.5 rounded-full bg-gray-100 text-[#F83002] font-medium'>No .1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold'>Search , Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quo vero earum odit deserunt.</p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input 
                    type="text" 
                    placeholder='Find Your Dream Jobs'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    className='outline-none border-none w-full'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchJobHandler();
                        }
                    }}
                />
                <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                    <Search className='h-5 w-5'/>
                </Button>
            </div>

        </div>
    </div>
  )
}

export default HeroSection;
