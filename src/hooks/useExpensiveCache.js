import {
  useEffect,
  useRef,
  useState,
} from "react";

function useExpensiveCache(
  input,
  compute,
  inputKey
) {
  const cacheRef = useRef(
    new Map()
  );

  const countedKeyRef =
    useRef(null);

  const [stats, setStats] =
    useState({
      hits: 0,
      misses: 0,
    });

  /*
   * [REQ-3] useRef is used to cache an
   * expensive derived computation.
   *
   * The cache survives re-renders without
   * causing a re-render itself.
   */
  const cacheKey =
    inputKey ??
    JSON.stringify(input);

  const cachedEntry =
    cacheRef.current.get(
      cacheKey
    );

  let result;
  let cacheHit;

  if (cachedEntry) {
    result =
      cachedEntry.value;

    cacheHit = true;
  } else {
    result = compute(input);

    cacheRef.current.set(
      cacheKey,
      {
        value: result,
      }
    );

    cacheHit = false;
  }

  useEffect(() => {
    if (
      countedKeyRef.current ===
      cacheKey
    ) {
      return;
    }

    countedKeyRef.current =
      cacheKey;

    setStats((current) => ({
      hits:
        current.hits +
        (cacheHit ? 1 : 0),

      misses:
        current.misses +
        (cacheHit ? 0 : 1),
    }));
  }, [
    cacheKey,
    cacheHit,
  ]);

  return {
    value: result,
    hits: stats.hits,
    misses: stats.misses,
    cacheSize:
      cacheRef.current.size,
  };
}

export default useExpensiveCache;