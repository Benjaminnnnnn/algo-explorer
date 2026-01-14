git add index.html tsconfig.json vite.config.ts metadata.json package-lock.json .gitignore
git add -A postcss.config.js tailwind.config.ts
git add -p package.json

# In the package.json hunk, leave the dev:client and dev:server lines unstaged for the server commit.

git commit -m "chore: set up Vite project configuration"

git add client/main.tsx client/App.tsx client/types.ts
git commit -m "feat: add app entry and shared types"

git add client/lib client/hooks
git commit -m "feat: add algorithm data and hooks"

git add client/components/Visualizer.tsx client/components/Explore.tsx client/components/Explanation.tsx client/components/CommandPalette.tsx
git commit -m "feat: add core visualizer components"

git add client/services client/components/AIChat.tsx client/components/GeminiChat.tsx
git commit -m "feat: add AI chat services and UI"

git add server/index.js
git add -p package.json

# Stage only the dev:client/dev:server script lines.

git commit -m "feat: add local AI API server"

git add README.md
git commit -m "docs: add project README"

Afterward
git status -sb
