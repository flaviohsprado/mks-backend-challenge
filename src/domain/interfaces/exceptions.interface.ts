export interface IFormatExceptionMessage {
  message: string;
  statusCode?: number;
}

export interface IExceptionService {
  throwBadRequestException(data: IFormatExceptionMessage): void;
  throwInternalServerErrorException(data?: IFormatExceptionMessage): void;
  throwForbiddenException(data?: IFormatExceptionMessage): void;
  throwUnauthorizedException(data?: IFormatExceptionMessage): void;
  throwNotFoundException(data?: IFormatExceptionMessage): void;
}
