import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch=useDispatch();
    const {searchedQuery}=useSelector(state=>state.job);
    
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/get?keywords=${searchedQuery || ''}`,{
                    withCredentials:true,
                });
                console.log('Fetching jobs with query:', searchedQuery);
                console.log('Jobs response:', res.data);
                
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    },[searchedQuery, dispatch])
}

export default useGetAllJobs
