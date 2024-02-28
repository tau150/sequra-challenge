import { useEffect, useCallback, RefObject } from "react";

export const useClickOutside = (ref: RefObject<HTMLDivElement>, callback: VoidFunction) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current == null || ref.current.contains(event.target as Node)) return;
      callback();
    },
    [callback, ref],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
};
