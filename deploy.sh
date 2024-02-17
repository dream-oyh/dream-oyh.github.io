git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git push git@github.com:dream-oyh/dream-oyh.github.io.git code_hope
exec /bin/bash