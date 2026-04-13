import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Train, Shield, Trees, Coffee, GraduationCap, Activity, X, MapPin } from 'lucide-react'

const API = 'http://localhost:3001'

const CATEGORIES = [
  { key: 'transit',   Icon: Train,         label: 'TRANSIT'   },
  { key: 'safety',    Icon: Shield,        label: 'SAFETY'    },
  { key: 'nature',    Icon: Trees,         label: 'NATURE'    },
  { key: 'lifestyle', Icon: Coffee,        label: 'LIFESTYLE' },
  { key: 'education', Icon: GraduationCap, label: 'EDUCATION' },
  { key: 'health',    Icon: Activity,      label: 'HEALTH'    },
]

// Converte contagem de POIs em score 0–100
function scoreFromCount(count, max = 10) {
  return Math.min(100, Math.round((count / max) * 100))
}

// Deriva os 6 scores a partir dos dados reais da Geoapify
function deriveScores(data) {
  if (!data) return null

  const tCount  = data.transport?.length   ?? 0
  const pCount  = data.parks?.length        ?? 0
  const sCount  = data.schools?.length      ?? 0
  const hCount  = data.healthcare?.length   ?? 0
  const rCount  = data.restaurants?.length  ?? 0
  const mCount  = data.shopping?.length     ?? 0
  const fCount  = data.fitness?.length      ?? 0

  const top = (arr, n = 2) => arr?.slice(0, n).map(x => x.name).join(', ') || '—'

  return {
    transit:   {
      score:  scoreFromCount(tCount, 10),
      detail: `${tCount} stops nearby — ${top(data.transport)}`,
    },
    safety:    {
      // Geoapify free tier não tem índice de crime — proxy via cobertura de saúde
      score:  Math.min(100, Math.round(scoreFromCount(hCount, 10) * 0.6 + 40)),
      detail: `${hCount} health facilities within 1km`,
    },
    nature:    {
      score:  scoreFromCount(pCount, 10),
      detail: `${pCount} parks & squares — ${top(data.parks)}`,
    },
    lifestyle: {
      score:  scoreFromCount(rCount + mCount + fCount, 27),
      detail: `${rCount} restaurants · ${mCount} malls · ${fCount} gyms`,
    },
    education: {
      score:  scoreFromCount(sCount, 10),
      detail: `${sCount} schools — ${top(data.schools)}`,
    },
    health:    {
      score:  scoreFromCount(hCount, 10),
      detail: `${top(data.healthcare, 1)} + ${Math.max(0, hCount - 1)} more`,
    },
  }
}

function scoreColor(s) {
  if (s >= 85) return 'rgba(120,220,120,0.9)'
  if (s >= 70) return 'rgba(255,220,80,0.9)'
  return 'rgba(255,120,80,0.9)'
}

export default function NeighborhoodInfo({ prop, onClose }) {
  const [geoData,   setGeoData]   = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)
  const [fromCache, setFromCache] = useState(false)

  useEffect(() => {
    if (!prop) return

    const address = prop.address || `${prop.city}, ${prop.state}`

    setLoading(true)
    setGeoData(null)
    setError(null)

    fetch(`${API}/api/neighborhood?address=${encodeURIComponent(address)}&radius=1000`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(data => {
        setGeoData(data)
        setFromCache(data.fromCache)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load neighborhood data.')
        setLoading(false)
      })
  }, [prop?.id]) // re-fetch só quando muda o imóvel

  if (!prop) return null

  const scores    = deriveScores(geoData)
  const badgeColor = loading
    ? 'rgba(255,220,80,0.8)'
    : error
      ? 'rgba(255,120,80,0.8)'
      : 'rgba(120,220,120,0.8)'
  const badgeLabel = loading ? 'FETCHING' : error ? 'ERROR' : fromCache ? 'CACHED' : 'LIVE'

  return (
    <div style={{
      background:     'rgba(12,12,12,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop:      '1px solid rgba(255,255,255,0.1)',
      borderRadius:   '16px 16px 0 0',
      padding:        '20px 20px 24px',
      maxHeight:      'calc(100vh - 120px)',
      overflowY:      'auto',
    }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px' }}>
            <MapPin size={11} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
            <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.15em', color:'rgba(255,255,255,0.4)' }}>
              {prop.city}, {prop.state}
            </span>
          </div>
          <p style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'20px', color:'white', lineHeight:1 }}>
            WHY BUY HERE?
          </p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'4px 10px', borderRadius:'100px', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)' }}>
            <motion.div
              animate={loading ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
              transition={{ duration: 0.8, repeat: loading ? Infinity : 0 }}
              style={{ width:'6px', height:'6px', borderRadius:'50%', background: badgeColor }}
            />
            <span style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)' }}>
              {badgeLabel}
            </span>
          </div>
          <button onClick={onClose} style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <X size={12} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </div>

      {/* Score grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
        {CATEGORIES.map(({ key, Icon, label }, index) => {
          const entry  = scores?.[key]
          const score  = entry?.score  ?? 0
          const detail = entry?.detail ?? '—'
          const color  = scoreColor(score)

          return (
            <div key={key} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', padding:'12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'8px' }}>
                <Icon size={13} color="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                <span style={{ fontFamily:'Space Mono,monospace', fontSize:'9px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.45)' }}>
                  {label}
                </span>
              </div>

              {/* Skeleton enquanto carrega */}
              {loading ? (
                <div style={{ height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', overflow:'hidden' }}>
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', delay: index * 0.07 }}
                    style={{ height:'100%', width:'40%', background:'rgba(255,255,255,0.12)', borderRadius:'2px' }}
                  />
                </div>
              ) : (
                <>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ flex:1, height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', overflow:'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: score + '%' }}
                        transition={{ duration: 0.8, ease:[0.16,1,0.3,1], delay: index * 0.08 }}
                        style={{ height:'100%', background: color, borderRadius:'2px' }}
                      />
                    </div>
                    <span style={{ fontFamily:'Bebas Neue,sans-serif', fontSize:'16px', color, minWidth:'32px', textAlign:'right' }}>
                      {score}
                    </span>
                  </div>
                  <p style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.06em', color:'rgba(255,255,255,0.3)', marginTop:'6px', lineHeight:1.5 }}>
                    {detail}
                  </p>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {!loading && !error && geoData && (
        <div style={{ marginTop:'14px', padding:'10px 14px', background:'rgba(120,220,120,0.04)', border:'1px solid rgba(120,220,120,0.1)', borderRadius:'8px' }}>
          <p style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.08em', color:'rgba(120,220,120,0.4)', lineHeight:1.6 }}>
            LIVE GEO DATA — {geoData.meta?.radius}m radius ·{' '}
            {fromCache ? 'SERVED FROM CACHE' : `FETCHED AT ${new Date(geoData.meta?.fetchedAt).toLocaleTimeString()}`}
          </p>
        </div>
      )}

      {error && (
        <div style={{ marginTop:'14px', padding:'10px 14px', background:'rgba(255,120,80,0.05)', border:'1px solid rgba(255,120,80,0.1)', borderRadius:'8px' }}>
          <p style={{ fontFamily:'Space Mono,monospace', fontSize:'8px', letterSpacing:'0.08em', color:'rgba(255,120,80,0.5)', lineHeight:1.6 }}>
            ⚠ {error}
          </p>
        </div>
      )}
    </div>
  )
}