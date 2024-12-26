import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dots/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() wss: Server;

  constructor(

    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  //CUANDO UN CLIENTE SE CONECTA
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    // console.log({token});
    let payload: JwtPayload;

    try {
      
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);

    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({payload});

    // console.log(client)
    // console.log('Client connectado:', client.id);

    // this.messagesWsService.registerClient(client, payload.id);

    // console.log({conectados: this.messagesWsService.getConnectedClients()})

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());

  }

    //CUANDO UN CLIENTE SE DESCONECTA
  handleDisconnect(client: Socket) {
    // console.log('Client desconectado:', client.id);
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());

  }

  //message-from-client
  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log(client.id, payload);

  //!Emite unicamente al cliente
  //   client.emit('message-from-server', {
  //     fullName: 'Soy Yo', 
  //     message: payload.message || 'no-message' })
  // }

  //!Emitir a todos MENOS al cliente que emite el mensaje
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo', 
    //   message: payload.message || 'no-message' })


//!Emitir a todos
      this.wss.emit('message-from-server', {
        // fullName: 'Soy Yo', 
        fullName: this.messagesWsService.getUserFullName(client.id), 
        message: payload.message || 'no-message' })

  }
  

  
}
