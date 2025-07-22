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



## How to Add New Routes

To add a new route to the application, follow these steps:

1. **Create the Route and Page Component**
   - In the `/frontend/pages` directory, add a new route file (e.g., `my-feature/routes/my-route.tsx`).
   - Implement the corresponding page component (e.g., `my-feature/my-route-page.tsx`).

2. **Register the Route in the Route Configuration**
   - Open `frontend/pages/src/route-config.ts`.
   - Import your new route at the top of the file.
   - Add an entry for your route in the `ROUTES_CONFIG` array.
   - If you want your route to appear in the sidebar, provide a `sidebar` configuration with a title, icon, and (optionally) children.

3. **(Optional) Add Access Control**
   - Specify the `access` property for your route to control who can view it (e.g., `ROUTE_ACCESS.PUBLIC`, `ROUTE_ACCESS.MEMBER`).



