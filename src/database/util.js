import {writeFile, writeFileSync} from 'fs'

const saveToDataBase = (DB) => {
    writeFileSync('./src/database/data.json', JSON.stringify(DB, null, 2), {encoding: 'utf-8'})
}

export {saveToDataBase}