import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

// Generic type for MongoDB document
export interface MongoDocument {
  _id: string;
  [key: string]: any;
}

// Configuration interface for polling options
export interface PollConfig {
  maxAttempts?: number;
  delayMs?: number;
  timeoutMs?: number;
}

// Return type for the hook
export interface UsePollResult<T extends MongoDocument> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Custom hook for polling a MongoDB object
function useMongoObjectPoller<T extends MongoDocument>(
  endpoint: string,
  objectId: string,
  config: PollConfig = {}
): UsePollResult<T> {
  // Default configuration
  const { maxAttempts = 10, delayMs = 10000, timeoutMs = 30000 } = config;

  // State management
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Polling logic
  const pollForObject = useCallback(async () => {
    let attempts = 0;
    const startTime = Date.now();

    while (attempts < maxAttempts) {
      try {
        // Check if total time exceeded
        if (Date.now() - startTime > timeoutMs) {
          setError(new Error("Polling timeout exceeded"));
          setLoading(false);
          return;
        }

        // Construct full URL
        const fullUrl = `${endpoint.replace(/\/$/, "")}/${objectId}`;

        // Attempt to fetch the object
        const response = await axios.get<T>(fullUrl, {
          timeout: timeoutMs / maxAttempts,
        });

        // Validate the returned object
        if (response.data && response.data._id === objectId) {
          setData(response.data);
          setLoading(false);
          return;
        }

        // If object not found, wait and retry
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        attempts++;
      } catch (err) {
        // Handle different types of errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;

          // 404 is expected during polling, other errors are problematic
          if (axiosError.response?.status !== 404) {
            setError(axiosError);
            setLoading(false);
            return;
          }
        } else {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setLoading(false);
          return;
        }

        // Wait before next attempt
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        attempts++;
      }
    }

    // No object found after all attempts
    setError(new Error("Object not found after maximum attempts"));
    setLoading(false);
  }, [endpoint, objectId, maxAttempts, delayMs, timeoutMs]);

  // Effect to trigger polling
  useEffect(() => {
    pollForObject();
  }, [pollForObject]);

  return { data, loading, error };
}

// Example component using the hook
// const MongoObjectFetcher: React.FC = () => {
//   const objectId = '60d5ecb8b3b3a3001f3e2d2a';
//   const apiEndpoint = 'https://api.example.com/objects';

//   const { data, loading, error } = useMongoObjectPoller<MongoDocument>(
//     apiEndpoint,
//     objectId,
//     {
//       maxAttempts: 15,
//       delayMs: 2000,
//       timeoutMs: 45000
//     }
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!data) return <div>No data found</div>;

//   return (
//     <div>
//       <h2>Fetched Object:</h2>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

export { useMongoObjectPoller };
