import { db } from '../../utils/db';

export const findCategories = async () => {
  return await db.category.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export const findCategoryById = async (categoryId: number) => {
  return await db.category.findUnique({
    where: { id: categoryId },
  });
}


