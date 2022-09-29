import { IsRequiredString } from '../../../main/decorators/validators/isRequiredString.decorator';

export class AuthDTO {
  @IsRequiredString()
  public username: string;

  @IsRequiredString()
  public password: string;

  constructor(props: AuthDTO) {
    Object.assign(this, props);
  }
}
