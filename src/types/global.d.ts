declare global {
  interface Window {
    dataLayer: Record<string, any>[]; // More specific type for dataLayer
  }
}

// Adding this export statement ensures the file is treated as a module.
export {};
