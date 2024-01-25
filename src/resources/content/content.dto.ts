import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Chat, User } from 'src/schemas';
import { ContentTypes, ProductInfoTypes, ProductInfoViewTypes } from 'src/utlis/enum';

export class ContentDetailDto {
  @ApiProperty({ enum: ContentTypes })
  type: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;
}

export class SubContentDto {
  @ApiProperty({ type: Array<ContentDetailDto> })
  list: ContentDetailDto[];

  @ApiProperty({ type: Array<ContentDetailDto> })
  content: ContentDto[];

  @ApiProperty()
  title: string;
}

export class ContentDto {

  @ApiProperty({ type: Array<SubContentDto> })
  sub: SubContentDto[];
  @ApiProperty({ type: ContentDetailDto })
  content: ContentDetailDto;

  @ApiProperty({enum: ProductInfoViewTypes})
  view: ProductInfoViewTypes
}
