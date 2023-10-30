import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Chat,  User } from "src/schemas";
import { MessageTypes, ReactionTypes } from "src/utlis/enum";

export class MessageDto {
    @ApiProperty({type: MessageTypes})
    @IsEnum(MessageTypes)
    @IsNotEmpty()
    messageType: string

    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty({type: User})

    sender: User

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
    user: User

    @ApiProperty({type: ReactionTypes})
    reaction: ReactionTypes
}

export class MessageReaction {
    @ApiProperty()
    id: string
    @ApiProperty({type: ReactionTypes})
    reaction: ReactionTypes
    @ApiProperty({type: User})
    user: User

}