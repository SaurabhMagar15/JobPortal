import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import AppliedTable from './AppliedTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setAllApplicant} from "../../redux/applicationSlice"

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.application);
  
  useEffect(() => {
    const fetchAllApplicant = async () => {
      try {
        console.log('Fetching applicants for job ID:', params.id);
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true,
        });
        
        console.log('API Response:', res.data);
        console.log('Job data:', res.data.job);
        console.log('Applications:', res.data.job?.applications);

        dispatch(setAllApplicant(res.data.job))
        
      } catch (error) {
        console.log('Error fetching applicants:', error)
      }
    }
    fetchAllApplicant();
  }, [params.id])

  console.log('Current applicants state:', applicants);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-xl font-bold my-10'>
          Applicants: {applicants?.applications?.length || 0}
        </h1>
        <AppliedTable/>
      </div>
    </div>
  )
}

export default Applicants
