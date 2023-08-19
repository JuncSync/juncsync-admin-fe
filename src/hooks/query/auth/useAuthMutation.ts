import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/api/models/auth/auth.api';

export const usePostLoginMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostLogin],
    postLogin,
  );

  return { mutate, isLoading, isSuccess, isError };
};
