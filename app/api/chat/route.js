import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is niet ingesteld in de omgevingsvariabelen.' },
      { status: 500 }
    )
  }
  try {
    const client = new Anthropic({ apiKey })
    const { system, messages } = await request.json()
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system,
      messages,
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
