declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[]; // Disable explicit any rule for dataLayer
  }
}

// Adding this export statement ensures the file is treated as a module.
export {};
