import { UseCaseProxy } from './../../usecases-proxy/usecase-proxy';
import { Body, Controller, HttpCode, Inject, Param } from '@nestjs/common';
import { DeleteApiResponse } from '../../../main/decorators/requests/deleteApiResponse.decorator';
import { GetApiResponse } from '../../../main/decorators/requests/getApiResponse.decorator';
import { PostApiResponse } from '../../../main/decorators/requests/postApiResponse.decorator';
import { PutApiResponse } from '../../../main/decorators/requests/putApiResponse.decorator';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUserUseCase,
  FindOneUserUseCase,
  UpdateUserUseCase,
} from './../../../domain/use-cases/user/index';
import { UserUsecasesProxyModule } from './../../usecases-proxy/user/usecases-proxy.module';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserPresenter } from './user.presenter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly findAllUserUseCase: UseCaseProxy<FindAllUserUseCase>,
    @Inject(UserUsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly findOneUserUseCase: UseCaseProxy<FindOneUserUseCase>,
    @Inject(UserUsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
    @Inject(UserUsecasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UserUsecasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUseCase: UseCaseProxy<DeleteUserUseCase>,
  ) {}

  @GetApiResponse(UserPresenter)
  public async findAll(): Promise<UserPresenter[]> {
    const users = await this.findAllUserUseCase.getInstance().execute();
    return users.map((user) => new UserPresenter(user));
  }

  @GetApiResponse(UserPresenter, '/:id')
  public async findOne(@Param() id: string): Promise<UserPresenter> {
    return await this.findOneUserUseCase.getInstance().execute(id);
  }

  @PostApiResponse(UserPresenter)
  public async create(@Body() user: CreateUserDTO): Promise<UserPresenter> {
    const createdUser = await this.createUserUseCase
      .getInstance()
      .execute(user);

    return new UserPresenter(createdUser);
  }

  @PutApiResponse(UserPresenter, '/:id')
  public async update(
    @Param() id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<UserPresenter> {
    return await this.updateUserUseCase.getInstance().execute(id, user);
  }

  @HttpCode(204)
  @DeleteApiResponse()
  public async delete(@Param() id: string): Promise<void> {
    return await this.deleteUserUseCase.getInstance().execute(id);
  }
}
