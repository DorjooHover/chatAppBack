import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Chat, User } from 'src/schemas';
import { ContentTypes, ProductInfoTypes } from 'src/utlis/enum';

export class ContentDto {
  @ApiProperty({ enum: ContentTypes })
  type: string;

  @ApiProperty()
  content: string;
}

export class SubProductInfoDto {
  @ApiProperty({ type: Array<ContentDto> })
  list: ContentDto[];

  @ApiProperty({ type: Array<ContentDto> })
  content: ContentDto[];

  @ApiProperty()
  title: string;
}

export class ProductInfoDto {

  @ApiProperty({ type: Array<SubProductInfoDto> })
  sub: SubProductInfoDto[];
  @ApiProperty({ type: Array<ContentDto> })
  content: ContentDto[];
  @ApiProperty({ enum: ProductInfoTypes })
  type: string
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  release: string;
}
