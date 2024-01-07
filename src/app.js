import express from 'express'
import apicache from 'apicache'

import {workOutRoutes as v1workOutRoutes} from './v1/routes/workOutRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000
const cache = apicache.middleware

// app.use(express.urlencoded({extended: false,}))
app.use(express.json())
app.use( cache('2 minutes'))
app.use('/api/v1', v1workOutRoutes)
// app.get('/', (req, res) => {
//     res.send('<h1>Hello ALbe</h1>')

// })

app.listen(PORT, () => {
    console.log(`Server listening on Port:${PORT}`)
})