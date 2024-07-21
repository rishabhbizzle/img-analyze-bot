
# Img-Analyzer-Bot

A simplebot using the MERN stack that can take an image and text as inputs, and analyze the image using an AI model and OCR to recognize and extract content from the image.


## Setup

Setup my-project with npm

### Backend

```bash
  cd backend
  npm install
  node .
```

### Frontend

```bash
  cd frontend
  npm install
  npm run dev
```
    
## Environment Variables

Since this app uses Amazon Bedrock to access LLM model i.e Mistral 7b you need to have an AWS account to run this project. Add the following environment variables to your .env file

### Backend

`AWS_ACCESS_KEY_ID`=xxxxxxxx

`AWS_SECRET_ACCESS_KEY`=xxxxxxxx

`AWS_REGION`=us-east-1

`MONGODB_URI`= xxxxxx

### Frontend

`VITE_API_BASE_URL`= *base URL of backend server*


## API Reference (Backend)

#### Get all items

```http
  GET /api/chats
```


#### Analyze Image

```http
  POST /api/analyse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `text`      | `string` | **Required** |
|`file`| `file` | **Required**. 


#### Delete all chats

```http
  DELETE /api/cleanChats
```
## Tech Stack

**Client:** Vite, Shadcn UI, TailwindCSS

**Server:** Node, Express, MongoDB, Teserract.js, AWS Bedrock


## Demo





## FAQ

#### Why didn't I use GPT-4o for this then I wouldn't have to use OCD to extract image content?

Cuz I don't have credits to access GPT-4o :(


