import { ErrorMessages } from "@/Enums/ErrorMessages";
import { Character } from "@/Interfaces/CharacterInterface";

export type CharacterType = null | ErrorMessages.NOT_FOUND | Character | Character[]