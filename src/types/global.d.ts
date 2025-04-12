declare global {
  interface Window {
    dataLayer: any[]; // Declares dataLayer on the window object
  }
}

// Adding this export statement ensures the file is treated as a module.
export {};
