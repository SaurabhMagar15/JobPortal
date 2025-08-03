import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                console.log('Fetching admin jobs...');
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true,
                });
                console.log('Admin jobs response:', res.data);
                
                if (res.data.success) {
                    console.log('Setting admin jobs:', res.data.jobs);
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log('Error fetching admin jobs:', error);
            }
        }
        fetchAllAdminJobs();
    }, [dispatch])
}

export default useGetAllAdminJobs

