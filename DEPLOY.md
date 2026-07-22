Production deployment and CI

This project is a Vite-built Single Page App (React + TypeScript).

Recommended production setup (simplest): Static hosting (Vercel / Netlify / GitHub Pages) or Docker + Nginx.

Included in this repository:
- GitHub Actions workflow: .github/workflows/ci.yml — runs npm install, typecheck (tsc), and build on push/PR to main/master.
- Dockerfile + nginx.conf — multi-stage build producing a small nginx image that serves /dist and supports SPA routing.
- manifest.json, robots.txt, and assets/favicon.svg — basic PWA metadata and crawler hints.

How to build locally:
1. npm install
2. npm run build
3. Serve the dist folder (e.g., npm install -g serve && serve -s dist)

How to run the Docker image locally:
1. docker build -t aura-artisan-coffee:prod .
2. docker run -p 8080:80 aura-artisan-coffee:prod

Deploying to static hosts:
- Vercel/Netlify: point publish directory to `dist` (Vercel auto-builds using package.json build script).

CI notes:
- The included CI does not run tests (none are present). Add test scripts to package.json and update the workflow to run them.

Next recommended steps (can implement on request):
- Add HTTP security headers and CSP tailored to your app.
- Add automated Lighthouse checks and performance budgets to CI.
- Lazy-load heavy 3D and three.js related code paths to reduce initial JS payload.
- Add end-to-end and unit tests, accessibility (axe) checks, and Sentry/logging for runtime errors.
- Add a sitemap.xml generator and analytics (e.g., Matomo or GA4 with privacy in mind).
