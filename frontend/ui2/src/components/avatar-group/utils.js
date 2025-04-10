export const getVisibleCount = (users, maxVisible) => {
    const visibleCount = users.length > maxVisible ? maxVisible - 1 : users.length;
    const remainingCount = users.length - visibleCount;
    return {
        visibleCount,
        remainingCount,
    };
};
//# sourceMappingURL=utils.js.map