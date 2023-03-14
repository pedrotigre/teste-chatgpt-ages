'use client';

import { useState } from 'react';

const generateMotivationalPhrase = async (
    word: string,
    prompt: string
): Promise<string> => {
    prompt = prompt.replace(/\*\*(.*?)\*\*/g, word);

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
    const [editPrompt, setEditPrompt] = useState(false);
    const [prompt, setPrompt] = useState(
        'Give me a motivational phrase in portuguese for the word **variavel**'
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPhrase('Carregando...');
        const newPhrase = await generateMotivationalPhrase(word, prompt);
        setPhrase(newPhrase);
    };

    return (
        <div className='z-10 flex w-full max-w-lg flex-col gap-5'>
            <div className='mx-auto mt-4 flex min-h-[9rem] w-full items-center justify-center rounded-lg bg-[#111828] bg-opacity-80 p-2 text-center text-white shadow-xl lg:mt-24'>
                {(phrase && <p>{phrase}</p>) || <p>...</p>}
            </div>
            <form className='mx-auto w-full' onSubmit={handleSubmit}>
                <div className='overflow-hidden rounded-lg bg-[#111828] bg-opacity-80 px-3 py-5 shadow-xl backdrop-blur backdrop-filter'>
                    {(editPrompt && (
                        <>
                            <h2 className='mb-3 font-semibold text-white'>
                                Editar prompt:
                            </h2>
                            <textarea
                                rows={4}
                                name='description'
                                id='description'
                                className='mb-3 block w-full resize-none rounded-md border-0 bg-[#202938] px-3 py-2 text-white placeholder-gray-200 focus:placeholder-gray-500 focus:outline-1 focus:outline-slate-900 '
                                placeholder='Digite o novo prompt...'
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <p className='mb-4 text-white opacity-20'>
                                Utilize **variavel** para representar a
                                variavel.
                            </p>
                        </>
                    )) || (
                        <textarea
                            rows={2}
                            name='description'
                            id='description'
                            className='mb-4 block w-full resize-none rounded-md border-0 bg-[#202938] bg-opacity-80 px-3 py-2 text-white placeholder-gray-400 focus:outline-1 focus:outline-slate-900 '
                            placeholder='Digite uma palavra...'
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                        />
                    )}

                    <div className='flex items-center justify-between space-x-3 border-t border-[#242b3b] px-2 pt-4 sm:px-3'>
                        {!editPrompt && (
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
                                type='submit'
                            >
                                Gerar frase
                            </button>
                        )}
                        {(!editPrompt && (
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
                                type='button'
                                onClick={() => setEditPrompt(!editPrompt)}
                            >
                                Editar prompt
                            </button>
                        )) || (
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
                                type='button'
                                onClick={() => setEditPrompt(!editPrompt)}
                            >
                                Salvar
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
