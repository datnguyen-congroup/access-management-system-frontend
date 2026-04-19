import { useApiPost } from '@/core/api/hooks';

export const useLogin = () => {
  return useApiPost<Record<string, string>, { token: string; refreshToken: string }>('/auth/login');
};

export const useLogout = () => {
  return useApiPost<void, void>('/auth/logout');
};
