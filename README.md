# Digital Document Generator

A modern, dark-themed React Digital Document Generator that helps generate PDFs for popular Indian
government schemes — Aadhaar, Ayushman, ABHA and MP Ration Card.

Built with **React 18 + Vite + React Router**.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (default: http://localhost:5173).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally

## Pages

- `/` — Home (hero + government scheme cards)
- `/features` — Features grid
- `/about` — About the Digital Document Generator
- `/contact` — Contact form
- `/admin-login` — Admin login form
- `/user-login` — User login form

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── SchemesSection.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        ├── Features.jsx
        ├── About.jsx
        ├── Contact.jsx
        ├── AdminLogin.jsx
        └── UserLogin.jsx
```
