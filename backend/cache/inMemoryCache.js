class InMemoryCache {
  constructor() {
    this.store = new Map()
  }

  set(key, value, ttlMs = 1000 * 60 * 60) {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs })
  }

  get(key) {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.value
  }

  clear() {
    this.store.clear()
  }

  get size() {
    return this.store.size
  }
}

module.exports = new InMemoryCache()