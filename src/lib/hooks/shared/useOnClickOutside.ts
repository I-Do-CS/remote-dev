import { useEffect } from "react";

export default function useOnClickOutside(
    refs: React.RefObject<HTMLElement>[],
    handler: () => void,
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            const isOutside = refs.every((ref) => ref.current && !ref.current.contains(target));

            if (isOutside) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, handler]);
}
