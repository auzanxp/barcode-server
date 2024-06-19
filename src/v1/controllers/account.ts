import { Request, Response } from 'express';

import { db } from '../../utils/db';
import { sendApiResponse } from '../../utils/api-response';

export const getAllAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.account.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (data.length < 1) {
      return sendApiResponse(res, 'error', 404, null, 'Akun tidak ditemukan!');
    }
    sendApiResponse(res, 'success', 200, data, null);
  } catch (error) {
    console.log('ACCOUNT Controller - getAllAccount issue');
    console.log(error.message);
    sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
};

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountId = parseInt(req.params.id);
    const data = await db.account.findUnique({
      where: { id: accountId },
    });
    if (!data) {
      return sendApiResponse(res, 'error', 404, null, 'Akun tidak ditemukan!');
    }
    sendApiResponse(res, 'success', 200, data, null);
  } catch (error) {
    console.log('ACCOUNT Controller - getAccountById issue');
    console.log(error.message);
    sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
};
