import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"


const Jobs = () => {

    const {allJobs,searchedQuery}=useSelector(state=>state.job);
    const [filteredJobs,setFilteredJobs]=useState(allJobs);

    useEffect(()=>{
        if(searchedQuery){
            const filteredJobs=allJobs.filter((job)=>{
                // Text search
                const matchesText = job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.company.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase());
                
                // Location filter
                const matchesLocation = job.location.toLowerCase().includes(searchedQuery.toLowerCase());
                
                // Job Type filter
                const matchesJobType = job.jobType.toLowerCase().includes(searchedQuery.toLowerCase());
                
                // Salary filter (assuming salary is stored as number)
                let matchesSalary = false;
                if(searchedQuery.includes('-')) {
                    const [min, max] = searchedQuery.split('-').map(s => parseInt(s));
                    if(max) {
                        matchesSalary = job.salary >= min && job.salary <= max;
                    } else if(searchedQuery.includes('+')) {
                        matchesSalary = job.salary >= min;
                    }
                }
                
                // Experience filter
                let matchesExperience = false;
                if(searchedQuery.includes('-')) {
                    const [minExp, maxExp] = searchedQuery.split('-').map(s => parseInt(s));
                    if(maxExp) {
                        matchesExperience = job.experienceLevel >= minExp && job.experienceLevel <= maxExp;
                    } else if(searchedQuery.includes('+')) {
                        matchesExperience = job.experienceLevel >= minExp;
                    }
                }
                
                return matchesText || matchesLocation || matchesJobType || matchesSalary || matchesExperience;
            })
            setFilteredJobs(filteredJobs);
        }else{
            setFilteredJobs(allJobs)
        }
    },[allJobs,searchedQuery])

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
            <div className="w-20%">
                <FilterCard />
            </div>
            
        
        {
            filteredJobs.length<=0?<span>job not found</span>:(
                <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            filteredJobs.map((job)=>(
                                <motion.div 
                                initial={{opacity:0,x:100}}
                                animate={{opacity:1,x:0}}
                                exit={{opacity:0,x:-100}}
                                transition={{duration:0.3}}
                                key={job?._id}>
                                    <Job job={job}/>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            )
        }

        </div>

      </div>
    </div>
  );
};

export default Jobs;
