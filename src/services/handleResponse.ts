import { HttpStatus } from '@nestjs/common';

export function HandleResponse(
  statusCode: number,
  status: string,
  message: string,
  data: any,
  error: any,
) {
  return {
    statusCode: statusCode ? statusCode : HttpStatus.OK,
    status,
    message,
    data,
    error,
  };
}
