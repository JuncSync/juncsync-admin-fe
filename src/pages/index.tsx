import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HomePageMain from '@/pageComponents/HomePageMain';

import { useUserInfoQuery } from '@/hooks/query/auth/useAuthQuery';

const HomePage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!data || isLoading) {
      return;
    }

    const { id, password, hospital_id: hospitalId } = data;

    if (!id || !password || !hospitalId) {
      navigate('/login');
    }
  }, [data, isLoading]);

  return <HomePageMain />;
};

export default HomePage;
