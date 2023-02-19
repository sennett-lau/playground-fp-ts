import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/lib/TaskEither'

export const pipeTEDo = <T>(fn: () => TE.TaskEither<Error, T>): TE.TaskEither<Error, T> => {
    return pipe(
        TE.Do,
        fn,
    )
}