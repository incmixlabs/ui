import { once } from '@atlaskit/pragmatic-drag-and-drop/once';

/**
 * Returns `true` if a `Safari` browser.
 * Returns `true` if the browser is running on iOS (they are all Safari).
 * */
export const isSafari = once(function isSafari(): boolean {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }

  const { userAgent } = navigator;
  return userAgent.includes('AppleWebKit') && !userAgent.includes('Chrome');
});
