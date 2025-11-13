'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../Redux/Slices/authSlice';
import type { AppDispatch } from '../Redux/store';
import { useGetProfileQuery } from '../Redux/Services/userApi';
import { liveRefetchOptions } from './rtkOptions';

export function useAuthNavigate() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetProfileQuery(undefined, liveRefetchOptions);

  const isAuthenticated = !!data?.user;

  const authNavigate = async (link: string) => {
    if (isAuthenticated) {
      router.push(link);
      return;
    }

    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      await dispatch(googleLoginThunk()).unwrap();
      router.push(link);
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return { authNavigate, isAuthenticating, isAuthenticated };
}
