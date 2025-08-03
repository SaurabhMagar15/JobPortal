import axios from 'axios';
import { useEffect } from 'react';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import {setAllAppliedJobs} from ".././redux/jobSlice"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                console.log('Applied jobs API response:', res.data);
                
                if (res.data.success) {
                    console.log('Dispatching applications:', res.data.applications);
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log('Error fetching applied jobs:', error);
            }
        };
        fetchAppliedJobs();
    }, [dispatch]);
};

export default useGetAppliedJobs;
