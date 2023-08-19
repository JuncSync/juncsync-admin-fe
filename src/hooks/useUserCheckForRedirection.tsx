import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserInfoQuery } from './query/auth/useAuthQuery';

const useUserCheckForRedirection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!data || isLoading) {
      return;
    }
  }, [data, isLoading]);
};

export default useUserCheckForRedirection;
