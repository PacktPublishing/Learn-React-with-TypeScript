import { type NextRequest } from 'next/server';
import { insertContact } from '@/data/insertContact';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const result = await insertContact(data);
  if (result.ok) {
    return Response.json({}, { status: 201 });
  }
  return Response.json({}, { status: 500 });
}
