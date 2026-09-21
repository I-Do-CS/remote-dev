/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useResettableState<T>(
    initialValue: T,
    dependencies: unknown[],
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [...dependencies, initialValue]);

    return [value, setValue];
}
