import { useMemo } from 'react';
import useToggle from './useToggle'


export default function useBoolean(defaultValue = false) {
  const [state, { toggle, set }] = useToggle(defaultValue);

  const actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v) => set(!!v),
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}