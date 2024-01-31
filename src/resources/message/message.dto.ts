import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Chat,  User } from "src/schemas";
import { ContentTypes, ReactionTypes } from "src/utlis/enum";

export class MessageDto {
    @ApiProperty({type: ContentTypes})
    // @IsEnum(MessageTypes)
    // @IsNotEmpty()
    messageType: string

    @ApiProperty()
    // @IsString()
    content: string
    @ApiProperty()
    // @IsString()
    parent: string

    @ApiProperty()

    sender: string

    @ApiProperty({type: Array<Reaction>})
    reactions: Array<Reaction>

    @ApiProperty()
    chat: string

    @ApiProperty()
    usersReaction: Array<UserReaction>
}

export class Reaction {
    @ApiProperty({type: ReactionTypes})
    reaction: ReactionTypes

    @ApiProperty({type: Number})
    @IsInt()
    quantity: number



}

export class UserReaction {
    @ApiProperty()
    user: string

    @ApiProperty({type: ReactionTypes})
    reaction: ReactionTypes
}

export class MessageReaction {
    @ApiProperty()
    id: string
    @ApiProperty({type: ReactionTypes})
    reaction: ReactionTypes
    @ApiProperty()
    user: string

}