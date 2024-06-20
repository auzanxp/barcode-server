import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const registerAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.account.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    
    sendApiResponse(res, 'success', 201, null, 'Akun berhasil dibuat!');

  } catch (error) {
    console.log(error.message);
    sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
}

export const loginAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const data = await db.account.findUnique({
      where: { email },
    });

    if (!data) {
      return sendApiResponse(res, 'error', 404, null, 'Email tidak terdaftar!');
    }

    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (!isPasswordMatch) {
      return sendApiResponse(res, 'error', 400, null, 'Password salah!');
    }

    const secret = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 24
    const token = jwt.sign({ id: data.id }, secret, { expiresIn });

    const payload = {
      id: data.id,
      email: data.email,
      token,
      expiresIn,
    }

    sendApiResponse(res, 'success', 200, payload, 'Login berhasil!');

  } catch (error) {
    console.log(error.message);
    sendApiResponse(res, 'error', 500, null, 'Internal Server Error!');
  }
}