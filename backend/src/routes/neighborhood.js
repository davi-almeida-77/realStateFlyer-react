const express    = require('express')
const { geocode, getNeighborhoodData } = require('../services/geoapifyService')
const router = express.Router()

// GET /api/neighborhood?lat=-23.56&lon=-46.65&radius=1000
// GET /api/neighborhood?address=Av. Paulista, 1000&radius=1000
router.get('/', async (req, res) => {
  try {
    let { lat, lon, address, radius = 1000 } = req.query

    radius = Math.min(Math.max(Number(radius), 200), 3000) // clamp 200–3000m

    if (address && !lat) {
      const coords = await geocode(address)
      lat = coords.lat
      lon = coords.lon
    }

    if (!lat || !lon) {
      return res.status(400).json({
        error: 'Forneça lat+lon ou address como query params',
      })
    }

    const data = await getNeighborhoodData(Number(lat), Number(lon), radius)
    return res.json(data)

  } catch (err) {
    console.error('[neighborhood]', err.message)
    return res.status(500).json({ error: err.message })
  }
})

module.exports = router