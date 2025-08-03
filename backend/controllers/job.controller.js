import { Job } from "../models/job.model.js";
// recruiter
export const postJob = async (req, res) => {
    try {
        const {title, description, requirements,salary, location,jobType,experienceLevel, position, companyId} = req.body;

        const userId=req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const job=await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            createdBy: userId
        })
        return res.status(201).json({
            message: "new job created successfully",
            job,
            success: true
        });
        
    } catch (error) {
        console.log(error);
        
    }
}
//student
export const getAllJobs = async (req, res) => {
    try {
        const keywords=req.query.keywords || "";
        const query={
            $or:[
                {title:{$regex:keywords, $options:"i"}},
                {description:{$regex:keywords, $options:"i"}},

            ]
        }

        const jobs=await Job.find(query).populate({
            path:"company",
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "jobs found",
            jobs,
            success: true
        });

        
    } catch (error) {
        console.log(error);
        
    }
}
//student

export const getJobById = async (req, res) => {
    try {
        const jobId= req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
        })
        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "job found",
            job,
            success: true
        });


        
    } catch (error) {
        console.log(error);
        
    }
}

//admin (how many jobs created by a admin)
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy: adminId}).populate({
            path: "company",
            createdAt: -1
        });

        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "jobs found",
            jobs,
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
}

