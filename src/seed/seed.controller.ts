import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

 

  @Get()

  //TODO de esta forma en la linea 16 ya se valida que el usuario tenga el rol de admin para ejecutar el seed
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed()
  }

}