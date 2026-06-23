import { useEffect, useState } from 'react';

const moduleMap = {
  'react-datepicker': () => import('react-datepicker'),
};

export const useDynamicImport = <T>(moduleKey: keyof typeof moduleMap) => {
  const [module, setModule] = useState<null | T>(null);

  useEffect(() => {
    const loadModule = async () => {
      const moduleLoader = moduleMap[moduleKey];
      if (!moduleLoader) throw new Error(`Module "${moduleKey}" not found in moduleMap`);
      const loadedModule = await moduleLoader();
      setModule(() => (loadedModule.default ? loadedModule.default : loadedModule) as T);
    };
    loadModule();
  }, [moduleKey]);

  return module;
};