import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosClient from './axiosClient';

/**
 * Core wrapper for TanStack React Query to enforce standard practices across all modules.
 * This file replaces raw axios hooks with highly reusable query builders.
 */

export const useApiGet = <TData = unknown, TError = unknown>(
  queryKey: unknown[],
  url: string,
  params?: Record<string, unknown>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => axiosClient.get(url, { params }).then((res) => res as TData),
    ...options,
  });
};

export const useApiPost = <TVariables = unknown, TData = unknown, TError = unknown>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>,
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (data: TVariables) => axiosClient.post(url, data).then((res) => res as TData),
    ...options,
  });
};

export const useApiPut = <TVariables = unknown, TData = unknown, TError = unknown>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>,
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (data: TVariables) => axiosClient.put(url, data).then((res) => res as TData),
    ...options,
  });
};

export const useApiDelete = <TVariables = unknown, TData = unknown, TError = unknown>(
  urlFn: (variables: TVariables) => string,
  options?: UseMutationOptions<TData, TError, TVariables>,
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) =>
      axiosClient.delete(urlFn(variables)).then((res) => res as TData),
    ...options,
  });
};
