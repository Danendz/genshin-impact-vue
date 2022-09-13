import { ErrorMessages } from "@/Enums/ErrorMessages";

export type DataResponseType<T, E extends ErrorMessages> = T | E;