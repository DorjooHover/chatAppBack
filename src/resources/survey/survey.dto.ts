import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Chat, User } from 'src/schemas';
import { ContentTypes, ProductInfoTypes, SurveyTypes, TextBoxTypes } from 'src/utlis/enum';
import { ContentDetailDto } from '../content/content.dto';
import { ObjectId } from 'mongoose';

export class SurveyDetailDto {
  @ApiProperty({ enum: TextBoxTypes })
  type: string;
  // index start 1
  @ApiProperty()
  id: number;
  @ApiProperty({ type: Array<ContentDetailDto> })
  content: ContentDetailDto[];
  @ApiProperty()
  question: string;
  @ApiProperty()
  answer: string;
  @ApiProperty({ type: Array<ContentDetailDto> })
  list: ContentDetailDto[];
}
export class SurveyDto {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ type: ContentDetailDto })
  content: ContentDetailDto;
  @ApiProperty({type: Array<SurveyDetailDto>})
  values: SurveyDetailDto[];
  @ApiProperty()
  parent: string;
  @ApiProperty()
  created: any;
  @ApiProperty({ enum: SurveyTypes })
  type: string;
}
