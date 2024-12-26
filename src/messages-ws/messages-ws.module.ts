import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  //importar el AuthModule para usar el JwtModule
  imports: [AuthModule]
})
export class MessagesWsModule {}
