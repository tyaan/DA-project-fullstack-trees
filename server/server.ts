import * as Path from 'node:path'
import express from 'express'

import treeRoutes from './routes/trees.ts'

const server = express()
server.use(express.json())

// ADD YOUR API ROUTES HERE
server.use('/api/v1/trees', treeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server