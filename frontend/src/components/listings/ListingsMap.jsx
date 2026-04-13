import { useEffect, useRef } from 'react'

const fmt = (n) => n >= 1000000
  ? '$' + (n / 1000000).toFixed(1) + 'M'
  : '$' + Math.round(n / 1000) + 'K'

export default function ListingsMap({ selectedProp, allProps, selectedCoords }) {
  const containerRef    = useRef(null)
  const mapRef          = useRef(null)
  const markersRef      = useRef({})
  const readyRef        = useRef(false)
  const pendingRef      = useRef(null)
  const selectedCoordsRef = useRef(null) // ← guarda coords mais recentes pra flyTo

  // Mantém ref sempre atualizada sem re-render
  useEffect(() => {
    selectedCoordsRef.current = selectedCoords
  }, [selectedCoords])

  /* ── Load Leaflet once ── */
  useEffect(() => {
    let cancelled = false

    function initMap() {
      if (cancelled || !containerRef.current) return
      try {
        const L   = window.L
        const map = L.map(containerRef.current, {
          center: [37.5, -100], zoom: 4,
          zoomControl: true, attributionControl: false,
        })
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
          { maxZoom: 19 }
        ).addTo(map)

        mapRef.current  = map
        readyRef.current = true

        if (pendingRef.current) {
          flyTo(pendingRef.current)
          pendingRef.current = null
        }
      } catch (err) {
        console.warn('ListingsMap init error:', err)
      }
    }

    function loadLeaflet() {
      if (cancelled) return
      if (window.L) { initMap(); return }
      const script = document.createElement('script')
      script.src    = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => { if (!cancelled) initMap() }
      script.onerror = () => console.warn('Leaflet failed to load')
      document.head.appendChild(script)
    }

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    loadLeaflet()

    return () => {
      cancelled = true
      readyRef.current = false
      if (mapRef.current) {
        try { mapRef.current.remove() } catch (_) {}
        mapRef.current = null
      }
      markersRef.current = {}
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── GTA fly animation ── */
  function flyTo(prop) {
    if (!mapRef.current || !prop) return

    // Usa coords do backend — 'lon' no backend, 'lng' no Leaflet
    const coords = selectedCoordsRef.current
    if (!coords?.lat || !coords?.lon) return

    try {
      // Reset marker anterior se existir
      Object.values(markersRef.current).forEach(({ el }) => {
        el.style.background  = 'rgba(20,20,20,0.9)'
        el.style.borderColor = 'rgba(255,255,255,0.2)'
        el.style.color       = 'white'
        el.style.transform   = 'scale(1)'
      })

      // Step 1 — zoom out
      mapRef.current.flyTo([37.5, -100], 4, { duration: 0.8, easeLinearity: 0.5 })

      // Step 2 — fly to property
      setTimeout(() => {
        if (!mapRef.current) return
        try {
          mapRef.current.flyTo([coords.lat, coords.lon], 13, { duration: 1.2, easeLinearity: 0.3 })
        } catch (_) {}

        // Step 3 — cria/atualiza marker dinâmico no destino
        setTimeout(() => {
          if (!mapRef.current) return
          const L = window.L

          // Remove marker anterior desse prop se existir
          const existing = markersRef.current[prop.id]
          if (existing) {
            try { existing.marker.remove() } catch (_) {}
          }

          // Cria novo marker nas coords reais
          const el = document.createElement('div')
          el.style.cssText = [
            'padding:4px 10px',
            'background:white',
            'border:1px solid white',
            'border-radius:100px',
            'font-family:Space Mono,monospace',
            'font-size:10px',
            'font-weight:700',
            'color:#111',
            'white-space:nowrap',
            'cursor:pointer',
            'transform:scale(1.15)',
            'transition:all 0.2s',
          ].join(';')
          el.textContent = fmt(prop.price)

          const marker = L.marker([coords.lat, coords.lon], {
            icon: L.divIcon({ html: el, className: '', iconSize: [80, 26], iconAnchor: [40, 13] }),
          }).addTo(mapRef.current)

          markersRef.current[prop.id] = { marker, el }
        }, 1400)
      }, 900)
    } catch (err) {
      console.warn('flyTo error:', err)
    }
  }

  /* ── React to selectedProp changes ── */
  useEffect(() => {
    if (!selectedProp) return
    if (readyRef.current) {
      flyTo(selectedProp)
    } else {
      pendingRef.current = selectedProp
    }
  }, [selectedProp]) // eslint-disable-line react-hooks/exhaustive-deps

  // Quando coords chegam do backend, re-dispara flyTo se já há prop selecionado
  useEffect(() => {
    if (!selectedCoords || !selectedProp || !readyRef.current) return
    flyTo(selectedProp)
  }, [selectedCoords]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <style>{'.leaflet-container { background: #0a0a0a !important; }'}</style>
    </div>
  )
}