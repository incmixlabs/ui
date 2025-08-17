import { useState, useEffect, FC } from 'react';
import { queryOptions, useQuery, experimental_streamedQuery as streamedQuery } from '@tanstack/react-query'

import {secureFetch } from "@incmix/utils/fetch"
import { Spinner } from "@/base"
import { API } from "@incmix/utils/env"
import { se } from 'date-fns/locale';
import { set } from 'date-fns';
import { getPrevData } from '../utils/get-prev-data';

export const BFF_API_URL: string = getBffApiUrl()
export const VITE_SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN || ""
export const INTL_API_URL = `${BFF_API_URL}${API.INTL}`
export const AUTH_API_URL = `${BFF_API_URL}${API.AUTH}`
export const USERS_API_URL = `${BFF_API_URL}${API.USERS}`
export const ORG_API_URL = `${BFF_API_URL}${API.ORG}`
export const TASKS_API_URL = `${BFF_API_URL}${API.TASKS}`
export const PROJECTS_API_URL = `${BFF_API_URL}${API.PROJECTS}`
export const EMAIL_API_URL = `${BFF_API_URL}${API.EMAIL}`
export const FILES_API_URL = `${BFF_API_URL}${API.FILES}`
export const LOCATION_API_URL = `${BFF_API_URL}${API.LOCATION}`

export const GENAI_API_URL = `${BFF_API_URL}${API.GENAI}`
export const PERMISSIONS_API_URL = `${BFF_API_URL}${API.PERMISSIONS}`

function getBffApiUrl(): string {
  const url = import.meta.env["VITE_BFF_API_URL"] || ""
  if (!url) {
    console.error("VITE_BFF_API_URL is not configured")
    throw new Error("BFF API URL is not configured")
  }
  return url
}
export function isMock(): boolean {
  return import.meta.env["VITE_APP_MOCK"] === "true"
}

export const persistType = ["local", "rxdb", "session", "cookie"] as const
export const persistTypes = {
  local: 'local',
  rxdb: 'rxdb',
  session: 'session',
  cookie: 'cookie',
}
export type PersistType = (typeof persistType)[number]
export const dataSize = ["large", "medium", "small"] as const
export const dataSizes = {
  large: 'large',
  medium: 'medium',
  small: 'small',
}
export type DataSize = (typeof dataSize)[number]
export const updateFreq = ["stream", "immediate", "hourly", "daily"] as const
export type UpdateFreq = (typeof updateFreq)[number]

export const updateFreqs = {
  stream: 'stream',
  immediate: 'immediate',
  hourly: 'hourly',
  daily: 'daily',
}
export const method = ['GET', 'POST', 'PUT', 'DELETE'] as const
export const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}
export type Method = (typeof method)[number]

export type QueryWrapperProps = {
  queryKey: string;
  queryUrl?: string;
  queryPath: string;
  queryParams?: Record<string, any>;
  spin?: boolean;
  QuerySpinner?: React.ReactNode;
  QueryLoader?: React.ReactNode;
  QueryError?: React.ReactNode;
  QueryRender: React.FC<{ data: any, lastUpdated: number }>;
  method?: Method;
  streaming?: boolean;
  persistTypes?: PersistType[];
  dataSize?: DataSize;
  updateFreq?: UpdateFreq;
  sortFn?: (a: any, b: any) => number;
  uniqueKey?: string;
  mergeFn?: (data: any[]) => any;
  transform?: (data: any) => any;
  persistFn?: (data: any) => void;
}
export function registerURL(url: string): void {
  // Register the URL for use in the application
}
export function QueryWrapper(props: QueryWrapperProps): FC  {
  const { queryKey,  queryUrl, persistTypes, method=methods.GET, queryPath, transform, queryParams, QueryLoader = (<div>Loading...</div>), QueryRender } = props;
  const url = queryUrl ?? `${BFF_API_URL}${queryPath}`;
  const [isReady, setIsReady] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [prevData, setPrevData] = useState<any>(persistType
                                ? getPrevData(persistTypes): null);
  const [recordCount, setRecordCount] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey], // Unique key for this query
    queryFn: async () => { // Asynchronous function to fetch data
      const response = await secureFetch(url, {
        method,
        params: queryParams,
      });
      if (transform) {
        return transform(response.data);
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsReady(true);
      setLastUpdated(Date.now());
      setRecordCount(data?.length || 0);
    }
  }, [isLoading, isError, setIsReady, setLastUpdated]);

  if (isLoading) {
    return QueryLoader;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isReady) {
    return (
      <QueryRender data={data} lastUpdated={lastUpdated}/>
    );
  }

  return null;
}

export function StreamQueryWrapper(props: QueryWrapperProps) {
  const { queryKey, queryUrl, method=methods.GET, queryPath, transform, queryParams, QueryLoader = (<div>Loading...</div>), QueryRender } = props;
  const url = queryUrl ?? `${BFF_API_URL}${queryPath}`;
  const [isReady, setIsReady] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey], // Unique key for this query
    queryFn: async () => { // Asynchronous function to fetch data
      const response = await secureFetch(url, {
        method,
        params: queryParams,
      });
      if (transform) {
        return transform(response.data);
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsReady(true);
      setLastUpdated(Date.now());
    }
  }, [isLoading, isError, setLastUpdated, setIsReady]);

  if (isLoading) {
    return QueryLoader;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isReady) {
    return (
      <QueryRender data={data} lastUpdated={lastUpdated}/>
    );
  }
}
