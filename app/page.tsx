'use client';

import { Inter } from 'next/font/google';
import styles from './page.module.css';

import { useState } from 'react';

type GenerateMotivationalPhraseResponse = {
    choices: { text: string }[];
};

const generateMotivationalPhrase = async (word: string): Promise<string> => {
    try {
        const prompt = `Give me a motivational phrase in portuguese for the word "${word}"`;
        const response = fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer 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`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                temperature: 1,
                max_tokens: 200,
                top_p: 1,
            }),
        })
            .then((response) => response.json())
            .then((data) => data.choices[0].text.trim());

        const phrase = response;
        return response;
    } catch (error) {
        console.error('Erro: ', error);
        return 'Falha ao gerar uma frase motivacional. Por favor, tente novamente mais tarde.';
    }
};

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [word, setWord] = useState('');
    const [phrase, setPhrase] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPhrase = await generateMotivationalPhrase(word);
        setPhrase(newPhrase);
    };

    return (
        <main className={styles.main}>
            <div className='flex flex-col gap-5'>
                <div className='mx-auto mt-4 h-36 w-full rounded-lg bg-slate-100 p-2 text-center'>
                    {(phrase && <p>{phrase}</p>) || <p>...</p>}
                </div>
                <form className='mx-auto w-full' onSubmit={handleSubmit}>
                    <div className='overflow-hidden rounded-lg border border-gray-300 p-3  shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
                        <h1 className='mb-3  text-lg font-medium text-gray-700'>
                            Gerador de frases motivacionais
                        </h1>
                        <textarea
                            rows={2}
                            name='description'
                            id='description'
                            className='mb-2 block w-full resize-none border-0  p-2 py-0 placeholder-gray-500 focus:outline-cyan-500 focus:ring-0 sm:text-sm'
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
        </main>
    );
}
