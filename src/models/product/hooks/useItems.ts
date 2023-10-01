import { useProductsQuery } from '../api/useProductsQuery';
import { Product } from '../intrfaces/product';
import { useEffect, useMemo, useState } from 'react';
import paramsToKeys from '../../../query/utils/paramsToKeys';
import { ItemsBody } from '../../../query/interfaces/itemsBody';
import { debounce } from 'lodash';

export interface UseItemsProps {
  isEnabled: boolean;
  limit?: number;
}

export interface UseItemsRes {
  fetchNextPage?: () => void;
  items: Product[];
  refetch: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  search: (val: string) => void;
  searchText: string;
}
export const useItems = ({ isEnabled, limit = 20 }: UseItemsProps): UseItemsRes => {
  const [searchText, setSearchText] = useState<string>('');

  const [searchVal, setSearchVal] = useState<string>('');

  const params: ItemsBody = {
    limit: limit,
    ...(searchVal !== '' ? { search: searchVal } : {}),
  };

  const keys = ['ProductsQuery', ...paramsToKeys(params)];

  const { data, isLoading, refetch, isRefetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductsQuery({
      keys: keys,
      isEnabled,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.newCursor;
      },
      data: params,
    });

  const debouncedSearchUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setSearchVal(value);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearchUpdate(searchText);
  }, [searchText]);

  const onSearchChange = (val: string) => {
    setSearchText(val);
  };

  return {
    refetch,
    fetchNextPage: hasNextPage ? fetchNextPage : undefined,
    isLoading: isLoading || isRefetching,
    isFetchingNextPage,
    searchText: searchText,
    search: onSearchChange,
    items: data ? data.pages.reduce<Product[]>((acc, page) => [...acc, ...page.data], []) : [],
  };
};
