# Simple AI CLI - An AI Assistant in the terminal

## Features
* Chat with assitants from OpenAI
* Change OpenAI models
* Copy message or conversation to clipboard
* Answers in Markdown are rendered in the terminal

## Install instructions
1. Clone repository:
   ```
   gh repo clone jorgenlt/simple-ai-cli
   ```
   or   
   ```
   git clone https://github.com/jorgenlt/simple-ai-cli
   ```
2. Change directory and install dependencies:
   ```
   cd ./simple-ai-cli && npm install
   ```
3. Create the file .env and add your [OpenAI api key](https://openai.com) (API_KEY=api-key-from-open-ai):
   ```
   echo "API_KEY=api-key-from-open-ai" >> .env
   ```
6. To launch the application run: `node <path to app directory>`

## Screenshot
(`ai` set as alias for `node ~/simple-ai-cli`)

![simple-ai-cli](https://github.com/user-attachments/assets/10cc3fac-7232-4868-8ec8-a03380d099dd)

