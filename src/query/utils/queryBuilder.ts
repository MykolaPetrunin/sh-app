import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Api from '../services/api';
import ApiService from '../services/ApiService';

interface IQueryBuilderFunctionProps<Props, Res> {
  data?: Props;
  keys: unknown[];
  isEnabled?: boolean;
  keepPreviousData?: boolean;
  initialData?: Res;
}

type IQueryBuilderRes<Props, Res, Error> = (
  props: IQueryBuilderFunctionProps<Props, Res>,
) => UseQueryResult<Res, Error>;

type PathBuilder<Props> = (source?: Props) => string;

interface IQueryBuilderProps<Props, QueryRes, Res, Body> {
  path: string | PathBuilder<Props>;
  resTransformer: (source: QueryRes) => Res;
  propsTransformer?: (source: Props) => Body;
  disableGlobalError?: boolean;
  cacheTime?: number;
}

export function queryBuilder<Res, QueryRes, Props = undefined, Body = undefined, Error = unknown>({
  resTransformer,
  path,
  cacheTime,
  propsTransformer,
}: IQueryBuilderProps<Props, QueryRes, Res, Body>): IQueryBuilderRes<Props, Res, Error> {
  return function ({
    keys,
    isEnabled = true,
    data,
    keepPreviousData = false,
    initialData,
  }: IQueryBuilderFunctionProps<Props, Res>): UseQueryResult<Res, Error> {
    const axios = ApiService.getInstance().getAxiosInstance();
    return useQuery({
      queryKey: keys,
      enabled: isEnabled,
      keepPreviousData,
      initialData: () => initialData,
      queryFn: async (): Promise<Res> => {
        const res = await Api.get<QueryRes, Body>(
          axios,
          typeof path === 'function' ? path(data) : path,
          propsTransformer && data ? propsTransformer(data) : undefined,
        );

        return resTransformer(res.data);
      },
      cacheTime: cacheTime,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };
}
