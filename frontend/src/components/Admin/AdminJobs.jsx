import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
// import { setSearchCompanyByText } from '../../redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import {setSearchJobByText } from '../../redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    // useGetAllCompanies();
    const [input,setInput]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(setSearchJobByText(input))

    },[input])
    return (
        <div>
            <Navbar />
            <div >
                <div className='flex items-center justify-between max-w-6xl mx-auto my-10'>
                <Input
                    className='w-fit'
                    placeholder="filter by Company Name or Role"
                    onChange={(e)=>{setInput(e.target.value)}}
                />
                <Button onClick={()=>{navigate('/admin/job/create')}}>Create New Job </Button>
                </div>
                <AdminJobsTable />


            </div>
        </div>
    )
}

export default AdminJobs