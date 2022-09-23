# Vue 3 + TypeScript + Vite + Fastify API / Backend

## Sobre

### Estruturas
server.js e api/routes.js são os pontos de backend, todo o restante é front-end, somente front-end tem TypeScript nesse projeto

## Scripts

### yarn dev
Usa servidor dev e proxy da API em fastify para facilitar desenvolvimento em um unico projeto

### yarn build
Apenas compila o site estático em dist

### yarn start
Hospeda api e site estático usando fastify (recomendo hospedar o site direto no nginx, cloudfront ou usar cloudflare e manter apenas api no fastify)


