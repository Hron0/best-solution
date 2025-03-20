[Next.js (v14)](https://nextjs.org) - [ShadCN-UI](https://ui.shadcn.com/docs/components/form) - [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/queries) - [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) - [Auth.JS (Next-Auth V5)](https://authjs.dev/getting-started/authentication/credentials) - [Drizzle ORM](https://orm.drizzle.team/docs/schemas).

```
docker build --build-arg DATABASE_URL="" --build-arg --tag prod . --platform linux/amd64
```
> Выполнять с корня директории, `.env.production.sample` заполнить Переменными как в `.env.sample`.
> 
> `DATABASE_URL` в билде нужен для SSG

В `Caddyfile` указать домен, `your-domain.com` просто заменить на ваш подключенный Домен.

```
docker-compose up -d
```
> Команду использовать с папки, где находятся `docker-compose` и `Caddyfile`.

> Я обычно создаю отдельную директорию с названием "prod" и туда эти файлы пихаю.

> [!important]
> После установки `Caddy` через ```sudo systemctl stop caddy``` выключи процесс Caddy, т.к он занимает 80 порт. Убедиться что Caddy работает/не работает на нужно порту можно командой ```sudo lsof -i :80```
 
БД'шка от Neon, без ВПН на сайт не зайти, но сама по себе работает нормально.
Для хранения файлов используется Vercel blob storage.

## Getting Started

```bash
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/FileUpload.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for
more details.
