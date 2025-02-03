# Incmix Monorepo

## To get started, 
  copy/link public directory from root into apps/fihi-app and apps/storybook.
  
  In fihi-app, create .env file with VITE_BFF_API_URL, and register. 
     

## The Tech stack is

### Client

- [x] pnpm
- [x] react
- [x] nextjs
- [x] zustand
- [x] tailwind
- [x] radix-ui and shadcn
- [x] lucia auth

### Server

- [x] pnpm
- [x] hono
- [ ] backend postgres (porsager/postgres)

*Backend APIs*

| Endpoint       | Service      |
| -------------- | ------------ |
| *location-api* |              |
| weather        | tomorrow.io  |
| news           | serpapi.com  |
| ip location    | radar.io     |
| *auth-api*     |              |
| google auth    | google.com   |
| lucia auth     | lucia.io     |
| *email-api*    |              |
| email          | sendgrid.com |



