import {
  GetNextPageParamFunction,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import Api from '../services/api';
import ApiService from '../services/ApiService';

interface IInfiniteQueryBuilderFunctionProps<Props, Res> {
  data?: Props;
  keys: unknown[];
  isEnabled?: boolean;
  keepPreviousData?: boolean;
  getNextPageParam?: GetNextPageParamFunction<Res>;
  refetchOnWindowFocus?: boolean;
  cacheTime?: number;
}

type IInfiniteQueryBuilderRes<Props, Res, Error> = (
  props: IInfiniteQueryBuilderFunctionProps<Props, Res>,
) => UseInfiniteQueryResult<Res, Error>;

type PathBuilder<Props, PageParams> = (pageParams: PageParams, source?: Props) => string;

interface IInfiniteQueryBuilderProps<Props, QueryRes, Res, Body, PageParams> {
  path: string | PathBuilder<Props, PageParams>;
  resTransformer: (source: QueryRes) => Res;
  propsTransformer?: (source: Props, pageParams: PageParams) => Body;
}

function infiniteQueryBuilder<
  Res,
  QueryRes,
  Props = undefined,
  Body = undefined,
  PageParams = unknown,
  Error = unknown,
>({
  resTransformer,
  path,
  propsTransformer,
}: IInfiniteQueryBuilderProps<Props, QueryRes, Res, Body, PageParams>): IInfiniteQueryBuilderRes<
  Props,
  Res,
  Error
> {
  return function ({
    keys,
    isEnabled = true,
    data,
    keepPreviousData,
    refetchOnWindowFocus = false,
    getNextPageParam,
    cacheTime,
  }: IInfiniteQueryBuilderFunctionProps<Props, Res>): UseInfiniteQueryResult<Res, Error> {
    const axios = ApiService.getInstance().getAxiosInstance();

    return useInfiniteQuery({
      queryFn: async ({ pageParam }): Promise<Res> => {
        const res = await Api.get<QueryRes, Body>(
          axios,
          typeof path === 'function' ? path(pageParam, data) : path,
          propsTransformer && data ? propsTransformer(data, pageParam) : undefined,
        );

        return resTransformer(res.data);
      },
      getNextPageParam,
      queryKey: keys,
      enabled: isEnabled,
      refetchOnWindowFocus,
      retry: false,
      ...(cacheTime !== undefined ? { cacheTime } : {}),
      ...(keepPreviousData !== undefined ? { keepPreviousData } : {}),
    });
  };
}

export default infiniteQueryBuilder;
