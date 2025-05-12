# meme-archives-web

Searchable meme gallery website. Supports image, gif, and video. Simple admin tools for uploading and tagging media.

## Prerequisites

- Node.js (use the version specified in `.nvmrc`)
- Docker
- meme-archives-ops
- meme-archives-api
- AWS S3

## Env vars

See the `.env.example` file for more information on required environment variables.

## Setup

Install dependencies:

```sh
npm install
```

Build the project:

```sh
npm run build
```

Run the app for local development:

```sh
npm run dev
```

Run the app for local development with a file watcher:

```sh
npm run dev:watch
```
