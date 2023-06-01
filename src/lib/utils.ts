import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function getUserFromCookie(): User | undefined {
  if (!document) return undefined;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('user=')) {
      const user = JSON.parse(
        decodeURIComponent(cookie.substring('user='.length))
      );
      return user;
    }
  }
  return undefined;
}

export function removeRoomFromCookie(): void {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('user=')) {
      const user = JSON.parse(
        decodeURIComponent(cookie.substring('user='.length))
      );
      if (!user) return;
      // override the user cookie with path set to '/'
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify({ ...user, room: undefined })
      )};path=/`;
      return;
    }
  }
}

export function getRoomIdFromUrl(): string | undefined {
  const urlParts = window.location.pathname.split('/');
  const roomId = urlParts[2];
  return roomId || undefined;
}
