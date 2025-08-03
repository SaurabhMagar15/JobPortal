import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];

const AppliedTable = () => {
  const {applicants}=useSelector((state)=>state.application)
  
  const statusHandler=async(status,id)=>{
    try {
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{
        status},{
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message);
        }
        console.log(res.data)
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div>
      <Table>
        <TableCaption>List of Applied Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants && applicants.applications && applicants.applications.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.application?.fullname || 'N/A'}</TableCell>
                  <TableCell>{item?.application?.email || 'N/A'}</TableCell>
                  <TableCell>{item?.application?.phoneNumber || 'N/A'}</TableCell>
                  <TableCell>
                    {item?.application?.profile?.resumeOriginalName ? (
                      <a
                        href={item?.application?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {item?.application?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      <span className="text-gray-500">No Resume Uploaded</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                          <div  onClick={() => statusHandler(status, item._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No applicants found
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
        
      </Table>
    </div>
  );
};

export default AppliedTable;
