"use client";

import * as React from "react";

export function useMergeRefs<T>(
  refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs]
  );
} 