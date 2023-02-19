import axios from 'axios'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from "fp-ts/function"

const getWines = (type: string) => {
    console.log(type)
    return TE.tryCatchK(() => axios.get(`https://api.sampleapis.com/wines/${type}`), (reason) => new Error(String(reason)))
}

const getWinesPipe = (type: string) => pipe(
    TE.Do,
    getWines(type),
)

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