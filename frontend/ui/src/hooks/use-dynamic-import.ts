import { useState, useEffect } from 'react';

export const useDynamicImport = (modulePath: string) => {
  const [module, setModule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      try {
        const importedModule = await import(modulePath);
        setModule(importedModule);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    loadModule();
  }, [modulePath]);

  return { module, error, loading };
};

export default useDynamicImport;
