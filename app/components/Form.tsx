'use client';

import { useState } from 'react';

function trimArray(array: string[]) {
    return array.map((v) => v.trim());
}

const generateMotivationalPhrase = async (word: string[]): Promise<any> => {
    try {
        const response = await fetch(
            'https://focus-api-production.up.railway.app/frases',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ goals: word }),
                mode: 'cors',
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data from API.');
        }

        const data = await response.json();
        const phrasesArray = data.phrases;
        return phrasesArray;
    } catch (error) {
        console.error('Erro: ', error);
        return [
            {
                phrase: 'Falha ao gerar uma frase motivacional. Por favor, tente novamente mais tarde.',
            },
        ];
    }
};

export default function Form() {
    const [word, setWord] = useState('');
    const [phrase, setPhrase] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const newPhrase = await generateMotivationalPhrase(
            trimArray(word.split(','))
        );
        setIsLoading(false);
        setPhrase(newPhrase);
    };

    return (
        <div className='z-10 flex w-full max-w-lg flex-col gap-5'>
            <div className='mx-auto mt-4 flex min-h-[9rem] w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#111828] bg-opacity-80 p-4 text-center text-white shadow-xl lg:mt-24'>
                {!isLoading &&
                    phrase.map((v: any, index) => {
                        return <p key={index}>{v}</p>;
                    })}
                {isLoading && (
                    <p>Carregando... Esse processo pode levar até 1 minuto.</p>
                )}
            </div>
            <form className='mx-auto w-full' onSubmit={handleSubmit}>
                <div className='overflow-hidden rounded-lg bg-[#111828] bg-opacity-80 px-3 py-5 shadow-xl backdrop-blur backdrop-filter'>
                    <textarea
                        rows={2}
                        name='description'
                        id='description'
                        className='mb-4 block w-full resize-none rounded-md border-0 bg-[#202938] bg-opacity-80 px-3 py-2 text-white placeholder-gray-400 focus:outline-1 focus:outline-slate-900 '
                        placeholder='Digite objetivos separados por vírgula.'
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <div className='flex items-center justify-between space-x-3 border-t border-[#242b3b] px-2 pt-4 sm:px-3'>
                        {!isLoading && (
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
                                type='submit'
                            >
                                Gerar frases
                            </button>
                        )}
                        {isLoading && (
                            <button
                                className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white opacity-40 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-offset-2'
                                disabled={true}
                            >
                                Gerar frases
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
