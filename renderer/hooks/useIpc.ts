/**
 * useIpc Hook
 * A unified hook for making IPC calls with loading state and error handling
 * Reduces boilerplate in components that make IPC calls
 */

import { useState, useCallback } from "react";
import { ApiResponse } from "../types/download";

interface UseIpcOptions<T> {
  /** Called on successful response */
  onSuccess?: (data: T) => void;
  /** Called on error */
  onError?: (error: string) => void;
  /** Show console errors */
  logErrors?: boolean;
}

interface UseIpcReturn<T, P = unknown> {
  /** Invoke the IPC channel */
  invoke: (params?: P) => Promise<ApiResponse<T>>;
  /** Current data */
  data: T | null;
  /** Loading state */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Reset state */
  reset: () => void;
}

/**
 * Generic hook for IPC operations with automatic loading/error handling
 */
export function useIpc<T, P = unknown>(
  channel: string,
  options: UseIpcOptions<T> = {},
): UseIpcReturn<T, P> {
  const { onSuccess, onError, logErrors = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invoke = useCallback(
    async (params?: P): Promise<ApiResponse<T>> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await window.ipc.invoke(channel, params ?? null);

        if (result.success && result.data !== undefined) {
          setData(result.data);
          onSuccess?.(result.data);
        } else if (!result.success && result.error) {
          setError(result.error);
          onError?.(result.error);
          if (logErrors) {
            console.error(`[useIpc] ${channel} failed:`, result.error);
          }
        }

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        onError?.(errorMessage);
        if (logErrors) {
          console.error(`[useIpc] ${channel} error:`, err);
        }
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [channel, onSuccess, onError, logErrors],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { invoke, data, isLoading, error, reset };
}

/**
 * Simplified IPC invoke without state management
 * For one-off calls that don't need tracking
 */
export async function invokeIpc<T>(
  channel: string,
  params?: unknown,
): Promise<ApiResponse<T>> {
  try {
    return await window.ipc.invoke(channel, params ?? null);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`[invokeIpc] ${channel} error:`, err);
    return { success: false, error: errorMessage };
  }
}

export default useIpc;
