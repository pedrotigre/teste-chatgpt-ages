import { NextResponse } from 'next/server';

type ParamsProps = { params: { word: string } };

export async function POST(request: Request, { params }: ParamsProps) {
    const prompt = `Give me a motivational phrase in portuguese for the word "${params.word}"`;

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
            temperature: 1,
            max_tokens: 220,
            top_p: 1,
        }),
    });

    const data = await res.json();

    return NextResponse.json(data);
}
