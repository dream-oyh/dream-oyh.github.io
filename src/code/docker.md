---
date: 2025-02-15
icon: docker
category: 工具
tag: 教程
---

# docker

[教程](https://www.bilibili.com/video/BV1og4y1q7M4)

[docs](https://docs.docker.com/reference/)

[Docker Hub](https://hub.docker.com/)

## 基本概念

- 镜像（Image）：类似于一个模板，通过该模板创建容器，tomcat 镜像===>run===>tomcat01 容器；一个镜像可以创建多个容器
- 容器（Container）：通过镜像创建的，可以理解为一个容器就是一个简易的 linux 系统
- 仓库（Repository）：存储镜像的地方

## 安装

[windows 安装](https://docs.docker.com/desktop/setup/install/windows-install/)

## 基础命令

```sh
docker version # 查看版本
docker info  # 查看信息
docker logs # 查看日志


```

## 镜像命令

```shell
docker images # 查看本地主机上的所有镜像
# -a 显示所有镜像，-q 只显示id
docker search 镜像名 # 在docker hub上搜索镜像
docker pull  镜像名[:tag]  # 下载镜像
docker rmi 镜像名/镜像ID    # 删除镜像
```

## 容器命令

```sh
docker run [Optional] 镜像ID # 启动镜像，创建容器
# 参数说明
--name="name" # 指定容器名称
-d   # 后台方式运行
-it  # 使用交互方式运行，进入容器查看内容
-p   # 指定容器端口
    # 第一种方式：-p 主机端口:容器端口（常用）
    # 第二种方式：-p 容器端口
    # 第三种方式：容器端口
    # 第四种方式：-p ip:主机端口:容器端口
-P   # 随机指定端口
docker run -it 镜像ID /bin/bash  #启动并进入容器
    exit # 从容器退回主机，并停止容器
    ctrl + p + q # 退出容器但是不停止
```

```shell
docker ps # 显示当前在运行的容器
# -a 列出所有容器（在运行的+运行过的）
# -n=? 显示最近创建的容器
# -q 只显示容器的编号
```

```shell
docker stop containerid # 停止容器
docker rm containerid  # 删除容器，不能删除正在运行的容器
docker start containerid # 启动容器
docker restart containerid # 重启容器
docker stop containerid # 停止容器
docker kill containerid # 强行停止容器
```

## 常用的其他命令

- 后台启动容器：`docker run -d imagesid`
