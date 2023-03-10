Live demo: [teste-chatgpt-ages.vercel.app](https://teste-chatgpt-ages.vercel.app/)

## Getting Started

```bash
npm install
```

## Replace API Key

Go to ./app/api/motivational/[word]/.route.ts and replace ${process.env.OPENAI_API_KEY} in the authorization header with your OpenAI API Key. 

Now you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
