import { formatItem } from "@/adapter/itemsAdapter";
import { ITEM_ENDPOINT } from "@/data/ENDPOINTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return Response.json({ error: 'Item id param is required' }, { status: 400})
  }

  const itemFromApi = await fetch(`${ITEM_ENDPOINT}/${id}`, {
    next: {
      revalidate: 3600,
      tags: [`item_${id}`, ]
    }
  }).then((data) => data.json())
  
  const data = await formatItem(itemFromApi)
  
  return NextResponse.json(data, {status: 200})

}