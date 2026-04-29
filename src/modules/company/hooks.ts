import { useQueryClient } from '@tanstack/react-query';

import { useApiGet, useApiPost, useApiPut, useApiDelete } from '@/core/api/hooks';
import { PaginatedResponse } from '@/core/api/types';

export interface Company {
  [key: string]: any;
  id: string;
  name: string;
  taxID: string;
  hotline: string[];
  physical_address: string;
  link_map_address?: string;
  enabled: boolean;
}

export const useCompanies = (params: Record<string, unknown>) =>
  useApiGet<PaginatedResponse<Company>>(['companies', params], '/companies', params);

export const useCompany = (id: string) =>
  useApiGet<Company>(['company', id], `/companies/${id}`, undefined, {
    enabled: !!id,
  });

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useApiPost<Partial<Company>, Company>('/companies', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useUpdateCompany = (id: string) => {
  const queryClient = useQueryClient();
  return useApiPut<Partial<Company>, Company>(`/companies/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', id] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useApiDelete<string, unknown>((id: string) => `/companies/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};
