export const categoriesKeys = {
  all: () => ['categories'],
  category: () => ['category'],
  categoryId: ({ categoryId }: { categoryId?: string }) => [
    'category',
    { categoryId },
  ],
};
