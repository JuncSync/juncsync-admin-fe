import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

import { SEARCH_DEBOUNCE_TIME } from '@/constants/time';

const useSearchKeyword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get('keyword') ?? '',
  );

  const handleSearchKeyword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const searchKeyword = useDebounce(searchValue, SEARCH_DEBOUNCE_TIME);

  useEffect(() => {
    setSearchParams({ keyword: searchKeyword });
  }, [searchKeyword]);

  return { searchValue, searchKeyword, handleSearchKeyword };
};

export default useSearchKeyword;
