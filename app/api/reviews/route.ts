import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { author_name, rating, comment } = body

        if (!author_name || !rating || !comment) {
            return NextResponse.json(
                { error: 'Name, rating, and comment are required' },
                { status: 400 }
            )
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: 'Rating must be 1–5' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('reviews')
            .insert([{ author_name, rating, comment }])
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data, { status: 201 })
    } catch {
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
    }
}
