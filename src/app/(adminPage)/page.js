'use client'
import Test from '@/components/Addcourse/test';
import LoadingMax from '@/components/Loadings/LoadingMax';
import { useSelector } from 'react-redux';

const page = () => {
  const isLoading = useSelector((state) => state.usersData.loading);
  const token = cookieStore.get('accessToken')

  // if(isLoading && <LoadingMax />)
  return (
    <div className="w-[calc(100%-256px)] absolute ">
      <h1>Dash Board</h1>
      <Test />
    </div>
  );
};

export default page;
