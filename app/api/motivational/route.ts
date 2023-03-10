import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { prompt } = await request.json();

    const res = await fetch('https://api.openai.com/v1/completions', {
        cache: 'no-store',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 120,
            top_p: 1,
        }),
    });

    const data = await res.json();

    return NextResponse.json(data);
}
