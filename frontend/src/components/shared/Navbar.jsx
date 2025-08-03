import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";


const Navbar = () => {

  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message);
        navigate('/');
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="bg-white shadow-md border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        <div>
          <h1 className="text-2xl font-bold">
            job <span className="text-[#f83002]">portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="cursor-pointer hover:text-[#f83002] transition-colors duration-200 text-gray-700">
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002] transition-colors duration-200 text-gray-700">
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="cursor-pointer hover:text-[#f83002] transition-colors duration-200 text-gray-700">

                    <Link to="/">Home</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002] transition-colors duration-200 text-gray-700">

                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[#f83002] transition-colors duration-200 text-gray-700">

                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )
            }

          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-blue-200 hover:ring-blue-400 transition-all duration-200 rounded-full overflow-hidden">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white shadow-lg border rounded-lg">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-2">
                  {
                    user && user.role === 'student' && (
                      <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                        <User2 className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          <Link to="/profile"> View Profile</Link>
                        </span>
                      </div>
                    )
                  }

                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                    <LogOut className="h-4 w-4 text-gray-600" />
                    <Button onClick={logoutHandler} variant='outline'>Log Out</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
