import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajadytxhlshccpuwxtci.supabase.co';
const supabaseKey = 'sb_publishable_57yzoshk5CFnEWvMK9mlTQ_hSbLVLB';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json([], {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    return NextResponse.json(data || [], {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (e: any) {
    return NextResponse.json([], {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nroExp = body.expediente || body.expediente_numero || '00009-2026-0-0101-JR-CI-01';

    const { data, error } = await supabase
      .from('cases')
      .insert([
        {
          expediente_numero: nroExp,
          distrito_judicial: body.distrito || body.distrito_judicial || 'AMAZONAS',
          juzgado: body.juzgado || 'Juzgado Mixto - Sede de Jumbilla - Bongará (Amazonas)',
          materia: body.materia || 'CIVIL - Prescripción Adquisitiva de Dominio',
          status: 'ACTIVE'
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    return NextResponse.json({ success: true, data }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      await supabase.from('cases').delete().eq('id', id);
    }

    return NextResponse.json({ success: true }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }
}