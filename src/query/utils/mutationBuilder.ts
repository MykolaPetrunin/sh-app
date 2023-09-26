import { useMutation, UseMutationResult } from '@tanstack/react-query';
import Api, { ApiMutation } from '../services/api';
import ApiService from '../services/ApiService';

export enum MutationMethods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const requests: Record<MutationMethods, ApiMutation> = {
  [MutationMethods.PUT]: Api.put,
  [MutationMethods.DELETE]: Api.remove,
  [MutationMethods.POST]: Api.post,
  [MutationMethods.PATCH]: Api.patch,
};

type PathBuilder<Props> = (source: Props) => string;

interface IMutationBuilderProps<Props, Body, QueryRes, Res> {
  method: MutationMethods;
  path: string | PathBuilder<Props>;
  resTransformer: (source: QueryRes) => Res;
  propsTransformer?: (source: Props) => Body;
  disableGlobalError?: boolean;
}

type IMutationBuilderRes<Res, Props, Error> = (
  keys: unknown[],
) => UseMutationResult<Res, unknown, Props, Error>;

export function mutationBuilder<
  Props = undefined,
  Res = undefined,
  QueryRes = undefined,
  Body = undefined,
  Error = unknown,
>({
  path,
  method,
  propsTransformer,
  resTransformer,
  disableGlobalError = false,
}: IMutationBuilderProps<Props, Body, QueryRes, Res>): IMutationBuilderRes<Res, Props, Error> {
  return function (keys: unknown[]): UseMutationResult<Res, unknown, Props, Error> {
    const axios = ApiService.getInstance().getAxiosInstance();

    return useMutation({
      mutationKey: keys,
      mutationFn: async (data?): Promise<Res> => {
        const res = await requests[method]<QueryRes, Body>({
          axios,
          url: typeof path === 'function' ? path(data) : path,
          body: propsTransformer ? propsTransformer(data) : undefined,
        });

        return resTransformer(res.data);
      },
      onError: disableGlobalError ? () => {} : undefined,
    });
  };
}
