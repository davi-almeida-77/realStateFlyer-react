const cache = require('../../cache/inMemoryCache')

const GEOAPIFY_KEY = process.env.GEOAPIFY_API_KEY
const BASE_URL     = 'https://api.geoapify.com'

const CATEGORIES = [
  { key: 'restaurants',  query: 'catering.restaurant'         },
  { key: 'supermarkets', query: 'commercial.supermarket'      },
  { key: 'schools',      query: 'education.school'            },
  { key: 'healthcare',   query: 'healthcare'                  },
  { key: 'parks',        query: 'leisure.park'                },
  { key: 'fitness',      query: 'sport.fitness'               },
  { key: 'transport',    query: 'public_transport'            },
  { key: 'shopping',     query: 'commercial.shopping_mall'    },
]

// Converte endereço → { lat, lon }
async function geocode(address) {
  const cacheKey = `geocode:${address}`
  const cached   = cache.get(cacheKey)
  if (cached) return cached

  const url = `${BASE_URL}/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GEOAPIFY_KEY}`
  const res  = await fetch(url)
  if (!res.ok) throw new Error(`Geocoding falhou: ${res.status}`)

  const data     = await res.json()
  const feature  = data.features?.[0]
  if (!feature)  throw new Error('Endereço não encontrado')

  const coords = {
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
  }

  cache.set(cacheKey, coords, 1000 * 60 * 60 * 24) // 24h — endereço não muda
  return coords
}

// Busca POIs de uma categoria num raio (metros)
async function fetchCategory(lat, lon, radius, category) {
  const url = new URL(`${BASE_URL}/v2/places`)
  url.searchParams.set('categories', category.query)
  url.searchParams.set('filter',     `circle:${lon},${lat},${radius}`)
  url.searchParams.set('limit',      '10')
  url.searchParams.set('apiKey',     GEOAPIFY_KEY)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Places falhou (${category.key}): ${res.status}`)

  const data = await res.json()
  return (data.features || []).map(f => ({
    name:     f.properties.name   || 'Sem nome',
    address:  f.properties.formatted || '',
    distance: Math.round(f.properties.distance || 0),
  }))
}

// Busca todas as categorias em paralelo com cache
async function getNeighborhoodData(lat, lon, radius = 1000) {
  const cacheKey = `neighborhood:${lat},${lon}:${radius}`
  const cached   = cache.get(cacheKey)
  if (cached) return { ...cached, fromCache: true }

  const results = await Promise.allSettled(
    CATEGORIES.map(cat => fetchCategory(lat, lon, radius, cat))
  )

  const neighborhood = {}
  CATEGORIES.forEach((cat, i) => {
    neighborhood[cat.key] = results[i].status === 'fulfilled'
      ? results[i].value
      : []
  })

  neighborhood.meta = { lat, lon, radius, fetchedAt: new Date().toISOString() }

  cache.set(cacheKey, neighborhood)
  return { ...neighborhood, fromCache: false }
}

module.exports = { geocode, getNeighborhoodData }