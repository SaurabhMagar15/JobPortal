// src/hooks/useGetCompanyById.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';
import { COMPANY_API_END_POINT } from '../utils/constant';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return; // ✅ Prevent empty fetch

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
