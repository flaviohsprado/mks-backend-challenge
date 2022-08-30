export interface IFormatExceptionMessage {
  message: string;
  statusCode?: number;
}

export interface IException {
  BadRequestException(data: IFormatExceptionMessage): void;
  InternalServerErrorException(data?: IFormatExceptionMessage): void;
  ForbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
}
