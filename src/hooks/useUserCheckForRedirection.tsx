import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserInfoQuery } from './query/auth/useAuthQuery';

const useUserCheckForRedirection = (type: 'Login' | 'Home') => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!data || isLoading) {
      return;
    }

    const { id, password, hospital_id: hospitalId } = data;

    if (type === 'Home' && (!id || !password || !hospitalId)) {
      navigate('/login');
    }

    if (type === 'Login' && id && password && hospitalId) {
      navigate('/');
    }
  }, [data, isLoading]);
};

export default useUserCheckForRedirection;
