  import { signal } from "@preact/signals-react";

  export interface CookieOptions {
    expires?: number | Date;
    noExpiry?: boolean
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
const defaultCookieOptions: CookieOptions = {
  expires: 7,
  path: '/',
  secure: true,
  sameSite: 'lax',
};
export const COOKIE_PREFIX: string = import.meta.env.VITE_COOKIE_PREFIX || "incmix_"
function getOptions(opts: CookieOptions): CookieOptions {
  return { ...defaultCookieOptions, ...opts };
}
export const serializeCookie = (name: string, value: string, opts: CookieOptions = {}): string => {
  const options = { ...defaultCookieOptions, ...opts };
  if (options.noExpiry) {
    options.expires = undefined; // Remove expiry if noExpiry is true
  }
  let cookieString = `${COOKIE_PREFIX}_${name}=${encodeURIComponent(value)}`;
  if (options?.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setDate(date.getDate() + options.expires);
      cookieString += `; expires=${date.toUTCString()}`;
    } else {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
  }
  if (options?.path) cookieString += `; path=${options.path}`;
  if (options?.domain) cookieString += `; domain=${options.domain}`;
  if (options?.secure) cookieString += '; secure';
  if (options?.sameSite) cookieString += `; SameSite=${options.sameSite}`;
  return cookieString;
};

export const parseCookies = (): { [key: string]: string } => {
  const cookies: { [key: string]: string } = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');

      if (name && value) {
        const [prefix,nm]= name.split('_');
        if (nm && prefix === COOKIE_PREFIX) {
          cookies[nm] = decodeURIComponent(value);
        }
      }
  });
  return cookies;
};
export const cookies = signal(parseCookies());

export const setCookie = (name: string, value: string, options?: CookieOptions) => {
  document.cookie = serializeCookie(name, value, options);
  cookies[]
};

export const removeCookie = (name: string, options?: CookieOptions) => {
  document.cookie = serializeCookie(name, '', { ...options, expires: new Date(0) }); // Set expiry to past
  setCookies(parseCookies()); // Update state after removing
};
