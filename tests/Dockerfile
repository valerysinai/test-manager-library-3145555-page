FROM mcr.microsoft.com/playwright:v1.64.1-noble@sha256:7852dc5a7d72f5fe458a597d690f6c42fbc8e9e26ddfa95f8e6ef552558d9bbf
WORKDIR /work
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY dist ./dist
COPY scripts/serve.mjs ./scripts/serve.mjs
COPY tests/browser.mjs ./tests/browser.mjs
CMD ["node", "tests/browser.mjs"]
