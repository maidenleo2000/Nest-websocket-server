import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    @ApiProperty({
        default: 10, description: 'How many rows do you need'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number ) //Lo convierte a un numero entero. En el ejercicio de pokemon se agrego el enableImplicitConversion: true en el app.module
    limit?: number;

    @ApiProperty({
        default: 0, description: 'How many rows do you want to skip'
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number ) 
    offset?: number;

}
