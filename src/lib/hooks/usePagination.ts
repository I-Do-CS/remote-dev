export default function usePagination<T>(
    currentPage: number,
    pageSize: number,
    items: T[],
): { paginatedItems: T[]; totalPages: number } {
    const paginatedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(items.length / pageSize);

    return items.length > 0 ? { totalPages, paginatedItems } : { totalPages: 0, paginatedItems };
}
