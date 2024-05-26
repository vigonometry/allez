This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## ✅ Getting Started

In "./", run the frontend development server:

```bash
npm install 
npm run dev
```


Then, in "./backend/src" run the backend server:

```bash
pip install -r requirements.txt 
python app.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Analyse a Policy
To use the AI analysation tool on a pdf policy document, you must have a valid OpenAI API Key for chatgpt-4o in the .env file under "./backend". 
Note: When the IS_TEST flag is true in the "./backend/src/extractor.py", the parsed_pdf() function returns a static json instead of making the OpenAI API call. 

1. Select a pdf policy document to upload
2. The 6 key coverage statistics will be parsed out of the document with AI
3. Visualise the statistics by selecting the relevant coverage and policies from the drop down
