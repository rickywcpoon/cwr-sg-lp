import 'react';

declare module 'react' {
  // Augment the existing HTMLAttributes interface to include fetchpriority
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
