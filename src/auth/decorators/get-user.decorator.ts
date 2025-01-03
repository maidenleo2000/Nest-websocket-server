import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";



export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        // console.log({ctx})

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user) throw new InternalServerErrorException('User not found (request');

        // return user

        //Si no existe la data devuelve el usuario pero si existe devuelve la data
        return (!data) ? user : user[data];
    }

);