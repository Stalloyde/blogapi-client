LINK TO LIVE APP: https://blogapi-client-stalloyde.vercel.app/

This is the client-side repo of a full-stack blog site developed using the following technologies:

Front-end: React + Typescript
Back-end: NodeJS + Express
Database: MongoDB

Here are the links to repos associated to this project:
- API: https://github.com/Stalloyde/blog-api
- CMS: https://github.com/Stalloyde/blogapi-cms

All users are able to read blog posts. Login is required to post comments.

This project highlights the following skills: 
- Jam-stack approach of back and front-end
- Building a RESTful API 
- User authentication with JSON Web Tokens (JWT)
- Mobile responsivity

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list