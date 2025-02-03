# Incmix Monorepo

## To get started, 
  copy/link public directory from root into apps/fihi-app and apps/storybook.
  
  In fihi-app, create .env file with VITE_BFF_API_URL, and register. 


## Directory structure
  - Frontend
    | UI (@incmix/ui)
    | store (@incmix/store)
    | pages (@incmix/pages)
  All base components are in frontend/ui
  ### frontend/ui (@incmix/ui)
  The components are based on radix-ui/themes and for overrides shadcn.
  Please note that where possible and applicable radix-ui/themes are used. The reason is that they have better props/prop defs that make it suitable for future editor development.

 ### frontend/pages (@incmic/pages)
 Components defined on pages should depend only on @incmix/ui and not on any @radix-ui/themes or shadcn or other ui components/
 The code in pages may have some violations to do this. Fix the code, if you see any dependencies on these.

 ### frontend/store (@incmix/store)
 Offline first approach. Store in localstorage, pglite etc to offer local persistency, user preferences etc. will be persisted to backend of a period basis.
  
  
     

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



