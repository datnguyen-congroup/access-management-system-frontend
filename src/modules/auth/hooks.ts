import { useApiPost, useApiGet } from '@/core/api/hooks';
import { User } from '@/core/store/authStore';

import { LoginRequest, LoginResponse, ForgotPasswordRequest, ResetPasswordRequest } from './types';

export const useLogin = () => useApiPost<LoginRequest, LoginResponse>('/auth/login');

export const useLogout = () => useApiPost<void, void>('/auth/logout');

export const useProfile = () =>
  useApiGet<User>(['profile'], '/auth/profile', undefined, {
    enabled: false, // Will be manually enabled
  });

export const useForgotPassword = () =>
  useApiPost<ForgotPasswordRequest, void>('/auth/forgot-password');

export const useResetPassword = () =>
  useApiPost<ResetPasswordRequest, void>('/auth/reset-password');
