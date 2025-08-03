import { useSelector, useDispatch } from 'react-redux';
import  { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';

const AdminJobsTable = () => {
  useGetAllAdminJobs();
  const { companies, searchCompanyByText } = useSelector(state => state.company);
  const { allAdminJobs ,searchJobByText} = useSelector(state => state.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('allAdminJobs:', allAdminJobs); // Debug log
    
    if (!allAdminJobs || allAdminJobs.length === 0) {
      setFilterJobs([]);
      return;
    }
    
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
             job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <Table>
          <TableCaption className="py-4 text-gray-500 dark:text-gray-400">
            List of your Posted Jobs ({filterJobs.length})
          </TableCaption>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJobs && filterJobs.length > 0 ? (
              filterJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() => {
                            navigate(`/admin/jobs/${job._id}`);
                          }}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                        <div onClick={() => { navigate(`/admin/jobs/${job._id}/applicants`);
                          }} className='flex items-center gap-2 cursor-pointer mt-2'>
                          <Eye className='w-4'/>
                          <span>Applicant</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No jobs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable
