import { longToShort, shortToLong } from '@/backend/database';
import { NextResponse } from 'next/server';


function generateShortId() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  // arbitrary length that seems "short" to me and in line with tinyURL.
  const shortIdLength = 6;
  for (let i = 0; i < shortIdLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: Request) {
  const { longId } = await request.json();

  if (!longId) {
    return NextResponse.json({ message: 'longId is required' }, { status: 400 });
  }

  if (longToShort[longId]) {
    return NextResponse.json({ shortId: longToShort[longId] }, { status: 200 });
  }

  const shortId = generateShortId();

  longToShort[longId] = shortId;
  shortToLong[shortId] = longId;

  return NextResponse.json({ shortId }, { status: 200 });
}