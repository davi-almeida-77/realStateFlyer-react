const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const propertiesRouter    = require('./routes/properties')
const neighborhoodRouter  = require('./routes/neighborhood')  // ← ADD

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ 
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] 
}))
app.use(express.json())

app.use('/api/properties',   propertiesRouter)
app.use('/api/neighborhood', neighborhoodRouter)               // ← ADD

app.get('/', (_req, res) => {
  res.json({ message: 'RealStateFlyer API', version: '1.0.0' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`\n RealStateFlyer API → http://localhost:${PORT}\n`)
})