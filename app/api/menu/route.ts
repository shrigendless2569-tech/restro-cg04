import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('menu_items')
            .select('*')
            .eq('is_available', true)
            .order('category')

        if (error) throw error
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 })
    }
}
