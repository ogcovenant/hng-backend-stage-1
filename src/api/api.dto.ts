import { IsNotEmpty, IsString } from "class-validator";

export class RequestDTO {
  @IsNotEmpty()
  @IsString()
  readonly visitor_name: string;
}