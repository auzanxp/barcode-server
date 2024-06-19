import { Request, Response } from 'express';

import { db } from '../../utils/db';
import { sendApiResponse } from '../../utils/api-response';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (data.length < 1) {
      return sendApiResponse(res, 'error', 404, null, 'Kategori tidak ditemukan!');
    }
    sendApiResponse(res, 'success', 200, data, 'successfully get categories');
  } catch (error) {
    console.log(error.message);
    sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = parseInt(req.params.id);

        const category = await db.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            return sendApiResponse(res, 'error', 400, null, 'Kategori tidak ditemukan!');
        }
        sendApiResponse(res, 'success', 200, category, 'successfully get category by id');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
}

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price } = req.body;
        const data = {
          name,
          price
        };

        const category = await db.category.create({ data });
        sendApiResponse(res, 'success', 201, category, 'Kategori berhasil ditambahkan!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => { 
    try {
        const categoryId = parseInt(req.params.id);
        const categoryData = req.body;

        if (!categoryData.name || !categoryData.price) {
          sendApiResponse(res, 'error', 400, null, 'Missing required fields: name, price');
          return;
        }

        const category = await db.category.update({
            where: { id: categoryId },
            data : {
                name: categoryData.name,
                price: categoryData.price
            }
        });
        sendApiResponse(res, 'success', 200, category, 'Kategori berhasil diupdate!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = parseInt(req.params.id);

        const category = await db.category.delete({
            where: { id: categoryId },
        });
        sendApiResponse(res, 'success', 200, category, 'Kategori berhasil dihapus!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
}
