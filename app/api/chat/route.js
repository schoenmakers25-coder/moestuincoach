import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  try {
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
