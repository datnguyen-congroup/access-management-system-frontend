import { useQueryClient } from '@tanstack/react-query';

import { useApiGet, useApiPost, useApiPut, useApiDelete } from '@/core/api/hooks';
import { PaginatedResponse } from '@/core/api/types';

export const useUsers = (params: Record<string, unknown>) =>
  useApiGet<PaginatedResponse<unknown>>(['users', params], '/users', params);

export const useUser = (id: string) =>
  useApiGet<unknown>(['user', id], `/users/${id}`, undefined, {
    enabled: !!id,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useApiPost<Record<string, unknown>, unknown>('/users', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useApiPut<Record<string, unknown>, unknown>(`/users/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useApiDelete<string, unknown>((id: string) => `/users/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
