import React from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(state => state.job);
    
    console.log('Applied jobs:', allAppliedJobs);

    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    
    return (
        <div className="w-full">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <Table>
                    <TableCaption className="py-4 text-gray-500 dark:text-gray-400">
                        List of your Applied Jobs ({allAppliedJobs?.length || 0})
                    </TableCaption>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold">Job Role</TableHead>
                            <TableHead className="font-semibold">Company</TableHead>
                            <TableHead className="text-right font-semibold">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allAppliedJobs && allAppliedJobs.length > 0 ? (
                                allAppliedJobs.map((item, index) => (
                                    <TableRow key={item._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <TableCell className="font-medium">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                                            {item?.job?.title || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-gray-700 dark:text-gray-300">
                                            {item?.job?.company?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500 py-12">
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="text-center">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Applied Jobs</h3>
                                                <p className="text-sm text-gray-500 mt-1">You haven't applied to any jobs yet. Start exploring opportunities!</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable
