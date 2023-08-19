import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postBedIn, postBedOut } from '@/api/models/bed/bed.api';

export const usePostBedInMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostBedIn],
    postBedIn,
  );

  return { mutate, isLoading, isSuccess, isError };
};

export const usePostBedOutMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.postBedOut],
    postBedOut,
  );

  return { mutate, isLoading, isSuccess, isError };
};
