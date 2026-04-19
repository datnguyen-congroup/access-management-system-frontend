import React, { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Result, Button } from 'antd';
import { useLoadingStore } from '../store/loadingStore';
import { GlobalLoading } from '../../shared/components/GlobalLoading';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Result
      status="500"
      title="Something went wrong"
      subTitle={error?.message || 'An unexpected error occurred'}
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      }
    />
  );
};

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const globalLoading = useLoadingStore((state) => state.globalLoading);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryProvider>
        <ThemeProvider>
          {globalLoading && <GlobalLoading />}
          {children}
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};
