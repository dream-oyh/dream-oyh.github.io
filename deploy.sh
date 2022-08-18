#!/usr/bin/env sh
 
# 生成静态文件
npm run docs:build
 
# 进入生成的文件夹
cd docs/.vuepress/dist
 
# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME
 
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
# git checkout main			# 切换到main分支，已设成默认分支，不需要

# 如果你想要部署到 https://USERNAME.github.io
git push git@github.com:dream-oyh/dream-oyh.github.io.git -f main

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages
 
exec /bin/bash

cd -