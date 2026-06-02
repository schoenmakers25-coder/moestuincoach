'use client'
import { useEffect, useState } from 'react'

export default function EmailLink({ style }) {
  const [addr, setAddr] = useState(null)

  useEffect(() => {
    const u = '\x69\x6e\x66\x6f'
    const d = '\x6d\x6f\x65\x73\x74\x75\x69\x6e\x2e\x6e\x6c'
    setAddr(u + '@' + d)
  }, [])

  if (!addr) return <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>laden…</span>

  return (
    <a
      href={`mailto:${addr}`}
      style={style}
    >
      {addr}
    </a>
  )
}
