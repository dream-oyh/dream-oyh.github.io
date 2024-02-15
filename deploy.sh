git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git checkout -b code_hope
git push git@github.com:dream-oyh/dream-oyh.github.io.git code_hope

pnpm build
cd src/.vuepress/dist
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git checkout -b main_hope
git push git@github.com:dream-oyh/dream-oyh.github.io.git -f main_hope
exec /bin/bash
cd -