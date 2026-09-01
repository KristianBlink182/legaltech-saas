import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ajadytxhlshccpuwxtci.supabase.co',
  'sb_publishable_57yzoshk5CFnEWvMK9mlTQ_hSbLVLB'
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from('cases')
      .insert([
        {
          expediente_numero: body.expediente_numero,
          distrito_judicial: body.distrito_judicial,
          juzgado: body.juzgado,
          materia: body.materia,
          status: 'ACTIVE'
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}