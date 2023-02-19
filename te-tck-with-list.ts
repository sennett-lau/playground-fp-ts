import axios, { AxiosResponse } from 'axios'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from "fp-ts/function"
import { pipeTEDo } from './utils'

const getWines = (type: string): () => TE.TaskEither<Error, AxiosResponse> => {
    console.log(type)
    return TE.tryCatchK(() => axios.get(`https://api.sampleapis.com/wines/${type}`), (reason) => new Error(String(reason)))
}

const getWinesPipe = <AxiosResponse>(type: string) => pipeTEDo(getWines(type))

const main = async () => {
    const wineTypes = ['reds', 'whites', 'sparkling']

    console.log('start')

    const data = await pipe(
        wineTypes,
        TE.traverseArray(getWinesPipe),
        TE.map((res) => res.map((r) => r.data.length)),
        TE.map((res) => res.reduce((acc, curr) => acc + curr, 0)),
    )()

    console.log('end')
    console.log(data)
}

(async () => {
    await main()
})()