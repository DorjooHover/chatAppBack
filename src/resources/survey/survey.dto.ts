import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Chat, User } from 'src/schemas';
import { ContentTypes, ProductInfoTypes, QuestionTypes } from 'src/utlis/enum';
import { ContentDetailDto } from '../content/content.dto';

export class UserAnswerDto {


  @ApiProperty()
  date: string;

  @ApiProperty({ type: Array<AnswerDto> })
  answers: AnswerDto[];
}

export class AnswerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: string;
}

export class Question {
  @ApiProperty({enum: QuestionTypes})
  type: string;
  // index start 1
  @ApiProperty()
  id: number;
  @ApiProperty({ type: Array<ContentDetailDto> })
  content: ContentDetailDto[];
  @ApiProperty()
  question: string;
  @ApiProperty({ type: Array<String> })
  list: string[];
}
export class SurveyDto {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ type: Array<ContentDetailDto> })
  content: ContentDetailDto[];
  @ApiProperty()
  questions: Question;

  @ApiProperty({ type: Array<UserAnswerDto> })
  users: UserAnswerDto[];
}
