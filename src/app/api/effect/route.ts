import { formatEffects } from "@/adapter/effectsAdapter"
import { EFFECTS_ENDPOINT } from "@/data/ENDPOINTS"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest,) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Effect search param is required' }, {status: 400})
  }

  const res = await fetch(`${EFFECTS_ENDPOINT}/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    next: {
      revalidate: 3600,
      tags: ['effects']
    }
  }).then((data) => data.json())
  
  const data = await formatEffects(res)
  
  return NextResponse.json(data, { status: 200})
}