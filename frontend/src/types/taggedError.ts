import { KeyedErrors } from '../enums/keyedErrors';

export type TaggedError = Error & { keyedError?: KeyedErrors; tag?: string };
