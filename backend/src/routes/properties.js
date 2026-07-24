const { generatePropertyDescription } = require('../services/geminiService')
const express    = require('express')
const router     = express.Router()
const properties = require('../data/properties')

router.get('/', (_req, res) => {
  res.json({ data: properties, total: properties.length })
})

router.get('/featured', (_req, res) => {
  const featured = properties.filter(p => p.featured)
  res.json({ data: featured, total: featured.length })
})

router.get('/:id', (req, res) => {
  const prop = properties.find(p => p.id === req.params.id || p.slug === req.params.id)
  if (!prop) return res.status(404).json({ error: 'Property not found' })
  res.json({ data: prop })
})

router.get('/:id/description', async (req, res) => {
  const prop = properties.find(p => p.id === req.params.id || p.slug === req.params.id)
  if (!prop) return res.status(404).json({ error: 'Property not found' })
  
  const description = await generatePropertyDescription(prop)
  res.json({ description })
})

module.exports = router
