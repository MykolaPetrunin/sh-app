import { useProductsQuery } from '../api/useProductsQuery';
import { Product } from '../intrfaces/product';
import { useEffect, useMemo, useState } from 'react';
import paramsToKeys from '../../../query/utils/paramsToKeys';
import { ItemsBody } from '../../../query/interfaces/itemsBody';
import { debounce } from 'lodash';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { InfiniteRes } from '../../../query/interfaces/infiniteRes';

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
  updateItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
}
export const useItems = ({ isEnabled, limit = 20 }: UseItemsProps): UseItemsRes => {
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState<string>('');

  const [searchVal, setSearchVal] = useState<string>('');

  const params: ItemsBody = {
    limit: limit,
    ...(searchVal !== '' ? { search: searchVal } : {}),
  };

  const keys = ['ProductsQuery', ...paramsToKeys(params)];

  const { data, isLoading, refetch, isRefetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductsQuery({
      keys,
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

  const updateItem = (item: Product) => {
    queryClient.setQueryData<InfiniteData<InfiniteRes<Product>>>(keys, (data) => {
      if (!data) return data;

      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((it) => (it.id === item.id ? item : it)),
        })),
      };
    });
  };
  const removeItem = (itemId: string) => {
    queryClient.setQueryData<InfiniteData<InfiniteRes<Product>>>(keys, (data) => {
      if (!data) return data;

      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.filter((it) => it.id !== itemId),
        })),
      };
    });
  };

  return {
    refetch,
    fetchNextPage: hasNextPage ? fetchNextPage : undefined,
    isLoading: isLoading || isRefetching,
    isFetchingNextPage,
    searchText: searchText,
    search: onSearchChange,
    updateItem,
    removeItem,
    items: data ? data.pages.reduce<Product[]>((acc, page) => [...acc, ...page.data], []) : [],
  };
};
