import { longToShort, shortToLong } from '@/backend/database';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { shortId } = await request.json();

  if (!shortId) {
    return NextResponse.json({ message: 'shortId is required' }, { status: 400 });
  }

  const longId = shortToLong[shortId];
  
  if (longId) {
    return NextResponse.json({ longId }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'shortId not found' }, { status: 404 });
  }
}
