import { Label } from '../ui/label'
import Navbar from '../shared/Navbar'
import { Input } from "../ui/input"
import { useState } from 'react'
import { Button } from "../ui/button"
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "", // Changed from 'requirement' to 'requirements'
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "", // Changed from 'experience' to 'experienceLevel'
        position: 0,
        companyId: "",
    });
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const { companies } = useSelector(state => state.company);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleCompanySelect = (value) => {
        setInput({
            ...input,
            companyId: value,
        });
    };

    const selectChangeHandler = (value) => {
         const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value);
         setInput({
            ...input,
            companyId: selectedCompany._id,
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    "Content-Type": "application/json",
                },
                withCredentials:true,
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
        
        
    };


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form
                onSubmit={submitHandler}
                className='p-8 max-w-4xl border border-gray-200 rounded-md shadow-lg'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Requirement</Label>
                            <Input
                                type='text'
                                name='requirements' // Changed from 'requirement' to 'requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                type='text'
                                name='experienceLevel' // Changed from 'experience' to 'experienceLevel'
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring my-1'
                            />
                        </div>

                        {companies.length > 0 && (
                            <div className="col-span-2">
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company?.name?.toLowerCase()}
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                              {
            loading ?
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                please wait
              </Button>
              :
              <Button className='w-full my-4'>Post Job</Button>
          }

                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please Register a Company First Before Posting a Job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
