---
date: 2023-12-11
icon: html5
category: 前端
tag: 教程 
---

# 前端

## 阿里云服务器部署

[学生认证领券入口](https://university.aliyun.com/)

创建云服务 ECS 个人可以免费试用 3 个月，我的 wordbook 项目从 2025.2.14 开始配置在该免费试用的服务器上。

配置服务器参考教程：[ref](https://www.bilibili.com/video/BV12b4y18725)

- 创建服务器后，可以配置密钥对，浏览器会返回一个`.pem`文件，这里面的内容是与服务器连接的 SSH 私钥
    > 服务器系统最好选择 linux 系统，如 Ubuntu20.04 版
- 通过该 SSH 私钥可以在该云服务器上登录，进行远程连接

### 宝塔面板安装（似乎没啥用）

- 安装宝塔面板：在[此处](https://www.bt.cn/new/download.html)可以拿到安装命令，输入安装命令后，等待安装完成，**注意要保存好云服务器的外网面板地址、内网面板地址、username 和 password，这会在安装完成后显示在命令行中，注意查看**
- 根据宝塔提供的端口号，在服务器的安全组里配置允许该端口访问。
    > 安全组在 ESC 面板的顶部可以找到，点击`管理规则`进入安全组规则配置
    >
    > 选择手动添加，`目的`填端口号，`源`选择所有 IP，0.0.0.0/0
- 将宝塔提供的外链地址在浏览器打开，输入初始用户名和密码（这就是刚才宝塔面板提供的那个账号密码），登陆后选择 LNMP 套件并安装
- 注册域名，在阿里云网页上方搜索栏里搜索“域名”，完成实名认证和模板创建

## WORDBOOK 项目部署指南

## 部署指南

### 1. 服务器准备

1. 购买阿里云 ECS 服务器（推荐配置）：
   - 操作系统：Ubuntu 22.04
   - 配置：2 核 4G
   - 带宽：1Mbps（按流量计费）

2. 服务器初始化：
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install -y nginx python3 python3-pip nodejs npm curl git

# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 pnpm
sudo npm install -g pnpm

# 设置 pnpm 全局环境
pnpm setup

# 重新加载 shell 配置
source ~/.bashrc  # 如果使用 bash
# 或
source ~/.zshrc   # 如果使用 zsh

# 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export PNPM_HOME="$HOME/.local/share/pnpm"' >> ~/.bashrc
echo 'export PATH="$PNPM_HOME:$PATH"' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc

# 安装 pm2
sudo pnpm add -g pm2
```

### 2. 项目部署

1. 创建项目目录：
```bash
sudo mkdir -p /var/www/wordbook/{dist,backend}
sudo chown -R $USER:$USER /var/www/wordbook
```

2. 克隆项目：
```bash
cd /var/www/wordbook/backend
git clone https://github.com/your-username/wordbook.git .
```

3. 安装并配置 Poetry：
```bash
pip install poetry
poetry config virtualenvs.in-project true
poetry config virtualenvs.create true
cd src-backend
poetry install
```

4. 构建前端：
```bash
cd /var/www/wordbook/backend
pnpm install
pnpm build
cp -r dist/* /var/www/wordbook/dist/
```

### 3. Nginx 配置

1. 创建 Nginx 配置文件：
```bash
sudo vim /etc/nginx/sites-available/wordbook
```

2. 添加以下配置：
```nginx
server {
    listen 80;
    server_name your_domain.com;  # 替换为你的域名或 IP

    # 前端静态文件
    location / {
        root /var/www/wordbook/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. 启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/wordbook /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

### 4. 启动服务

1. 启动后端服务：
```bash
cd /var/www/wordbook/backend/src-backend
pm2 start "poetry run uvicorn main:app --host 0.0.0.0 --port 8000" --name wordbook-backend
```

2. 设置开机自启：
```bash
pm2 startup
pm2 save
```

### 5. 防火墙配置

```bash
sudo ufw allow ssh        # 22 端口
sudo ufw allow http      # 80 端口
sudo ufw allow https     # 443 端口
sudo ufw enable
```

### 6. SSL 证书（可选）

1. 安装 Certbot：
```bash
sudo apt install certbot python3-certbot-nginx
```

2. 获取证书：
```bash
sudo certbot --nginx -d your_domain.com
```

### 7. 维护命令

```bash
# 查看后端日志
pm2 logs wordbook-backend

# 重启后端服务
pm2 restart wordbook-backend

# 更新代码
cd /var/www/wordbook/backend
git pull
pnpm install
pnpm build
cp -r dist/* /var/www/wordbook/dist/
cd src-backend
poetry install --no-dev
pm2 restart wordbook-backend
```

### 8. 注意事项

1. 确保服务器安全组开放了必要的端口（22, 80, 443）
2. 建议配置服务器防火墙
3. 生产环境建议使用 HTTPS
4. 定期备份数据库文件（`~/.wordbook/wordbook.db`）
5. 监控服务器资源使用情况