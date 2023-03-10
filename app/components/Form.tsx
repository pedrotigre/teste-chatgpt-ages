'use client';

import { useState } from 'react';

const generateMotivationalPhrase = async (word: string): Promise<string> => {
    const prompt = `Give me a motivational phrase in portuguese for the word "${word}"`;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, 60000);

        const response = await fetch('/api/motivational', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify({ prompt }),
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error('Failed to fetch data from API.');
        }

        const data = await response.json();
        const phrase = data.choices[0].text.trim();

        return phrase;
    } catch (error) {
        console.error('Erro: ', error);
        return 'Falha ao gerar uma frase motivacional. Por favor, tente novamente mais tarde.';
    }
};

export default function Form() {
    const [word, setWord] = useState('');
    const [phrase, setPhrase] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPhrase('Carregando...');
        const newPhrase = await generateMotivationalPhrase(word);
        setPhrase(newPhrase);
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className='mx-auto mt-12 flex h-36 w-full items-center justify-center rounded-lg bg-slate-100 p-2 text-center'>
                {(phrase && <p>{phrase}</p>) || <p>...</p>}
            </div>
            <form className='mx-auto w-full' onSubmit={handleSubmit}>
                <div className='overflow-hidden rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus-within:border-slate-500 focus-within:ring-1 focus-within:ring-slate-500'>
                    <h1 className='mb-3  text-lg font-medium text-gray-700'>
                        Gerador de frases motivacionais
                    </h1>
                    <textarea
                        rows={2}
                        name='description'
                        id='description'
                        className='mb-2 block w-full resize-none border-0  p-2 py-1 placeholder-gray-500 focus:outline-slate-400 focus:ring-0 sm:text-sm'
                        placeholder='Digite uma palavra...'
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />

                    <div className='flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
                        <div className='flex'>
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                type='submit'
                            >
                                Gerar frase
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
