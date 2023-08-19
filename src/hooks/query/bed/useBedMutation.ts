import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postBedOut } from '@/api/models/bed/bed.api';

export const usePostBedOutMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostBedOut],
    postBedOut,
  );

  return { mutate, isLoading, isSuccess, isError };
};
