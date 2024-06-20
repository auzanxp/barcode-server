import { Request, Response } from 'express';

import { db } from '../../utils/db';
import { sendApiResponse } from '../../utils/api-response';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await db.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        if (data.length < 1) {
            return sendApiResponse(res, 'error', 404, null, 'Product not found!');
        }
        sendApiResponse(res, 'success', 200, data, 'successfully get products');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {  
    try {
        const productId = parseInt(req.params.id);

        const product = await db.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return sendApiResponse(res, 'error', 400, null, 'Product not found!');
        }
        sendApiResponse(res, 'success', 200, product, 'successfully get product by id');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, barcode, stock, categoryId } = req.body;

        const existingProduct = await db.product.findUnique({ where: { name } });
        if (existingProduct) {
            sendApiResponse(res, 'error', 400, null, 'Produk dengan nama ini sudah ada!');
            return;
        }

        const data = {
            name,
            barcode,
            stock,
            categoryId
        };

        const product = await db.product.create({ data });
        sendApiResponse(res, 'success', 201, product, 'Product successfully added!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => { 
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;

        if (!productData.name || !productData.barcode || !productData.stock || !productData.categoryId) {
            sendApiResponse(res, 'error', 400, null, 'Missing required fields: name, barcode, stock, categoryId');
        }

        const product = await db.product.update({
            where: { id: productId },
            data: productData,
        });
        sendApiResponse(res, 'success', 200, product, 'Product successfully updated!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = parseInt(req.params.id);

        const product = await db.product.delete({
            where: { id: productId },
        });
        sendApiResponse(res, 'success', 200, product, 'Product successfully deleted!');
    } catch (error) {
        console.log(error.message);
        sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
    }
};