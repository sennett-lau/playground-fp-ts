import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'

export const pipeTEDo = (fn: () => TE.TaskEither<any, any>): TE.TaskEither<any, any> => {
    return pipe(
        TE.Do,
        fn,
    )
}