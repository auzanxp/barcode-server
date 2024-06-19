import { Response } from 'express';

type ApiResponse<T> = {
  status: 'success' | 'error';
  code: number;
  data: T | null;
  message: string | null;
};

export const sendApiResponse = <T>(
  res: Response,
  status: 'success' | 'error',
  code: number,
  data: T | null,
  message: string | null
): void => {
  const apiResponse: ApiResponse<T> = {
    status,
    code,
    data,
    message,
  };

  res.status(code).json(apiResponse);
};
