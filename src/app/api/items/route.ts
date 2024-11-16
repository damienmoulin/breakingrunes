import { formatItems } from "@/adapter/itemsAdapter";
import { ITEMS_ENDPOINT } from "@/data/ENDPOINTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search')

  if (!search) {
    return Response.json({ error: 'Items search param is required' }, { status: 400})
  }

  const itemsFromApi = await fetch(`${ITEMS_ENDPOINT}${search}`, {
    next: {
      revalidate: 3600,
      tags: ['items', ]
    }
  }).then((data) => data.json())
  
  const data = await formatItems(itemsFromApi.data)
  
  return NextResponse.json(data, {status: 200})

}