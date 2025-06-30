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

![](/images/docker_commands.png)

![](/images/docker_flow.png)

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

::: tip 更新镜像

```sh
docker pull 镜像名[:tag]
```

该命令也可以用于更新最新版镜像，但是需要注意，更新镜像后原有的容器不会同步最新镜像，需要重新创建容器，建议在重新创建容器时备份数据。

更新镜像脚本：

```sh
docker pull <镜像名>[:tag] # 下载最新镜像
docker stop <现有容器id> # 停止当前容器
docker rm <现有容器id> # 删除当前容器
cp -r <挂载点文件夹> <挂载点文件夹.1.0> # 备份数据卷
docker run -d --name <指定容器名字> -v <数据卷挂载点> --restart=always -p 80:80 <镜像名>[:tag] # 重新创建镜像
```

:::

## 容器命令

- 创建容器

```sh
docker run [Optional] 镜像ID # 启动镜像，创建容器
# 参数说明
--name="name" # 指定容器名称
-d   # 后台方式运行
-it  # 使用交互方式运行，进入容器查看内容
-p   # 指定容器端口，端口暴露
    # 第一种方式：-p 主机端口:容器端口（常用，容器端口默认开放80）
    # 第二种方式：-p 容器端口
    # 第三种方式：容器端口
    # 第四种方式：-p ip:主机端口:容器端口
-P   # 随机指定端口
--rm  # 一般用来测试，容器stop后不会保留，而是会删除
-e  # 环境配置
--volumes-from containerid # 从某容器内拷贝数据卷，实现两个容器的数据同步
docker run -it 镜像ID /bin/bash  #启动并进入容器
# -it 以交互的方式进入
    exit # 从容器退回主机，并停止容器
    ctrl + p + q # 退出容器但是不停止
```

- 显示容器列表

```shell
docker ps # 显示当前在运行的容器
# -a 列出所有容器（在运行的+运行过的）
# -n=? 显示最近创建的容器
# -q 只显示容器的编号
```

- 启动、停止、删除容器

```shell
docker stop containerid # 停止容器
docker rm containerid  # 删除容器，不能删除正在运行的容器
docker start containerid # 启动容器
docker restart containerid # 重启容器
docker stop containerid # 停止容器
docker kill containerid # 强行停止容器
```

- 进入正在运行的容器

```sh
docker exec -it 容器id shell路径
# Linux 中 shell 路径一般是 /bin/bash
```

- 从容器内拷贝文件到主机

```sh
docker cp 容器id:容器内路径 目的主机路径
```

## 其他命令

```sh
docker logs -tf --tail 10 containerid # 查看指定容器的日志
# -tf 实时显示时间戳日志， --tail string 显示条数
docker top containerid  # 查看容器内进程信息
docker inspect containerid # 查看容器的详细信息（json格式）
docker stats # 查看各容器内存
```

## commit 镜像

```sh
docker commit -m "描述信息" -a "作者" 容器id 新的镜像名[:tag] # 和git原理类似
```

## 构建镜像

```sh
docker build -f dockerfile -t <指定镜像名>[:tag] <url>  # 构建镜像
```

注意最后的`<url>`指的是镜像构建的上下文环境，镜像构建要 COPY，这个`<url>`就是 COPY 的路径，一般就用一个点`.`，表示当前目录。[ref](https://blog.csdn.net/xs20691718/article/details/79502019)

## 容器数据卷

如果数据都存在在容器中，那删除容器时，也会把数据一并删除，所以要引入容器数据卷技术。

容器数据卷：容器之间的数据共享技术，docker 容器中产生的数据可以共享到本地，将本机上的目录挂载到容器内。即：**容器的持久化和同步化操作 + 实现容器间的数据共享**

### 使用数据卷

- 方式一：直接使用命令挂载 `-v`

```sh
docker run -it -v 主机目录:容器内目录 镜像id /bin/bash  # 类似于端口映射
```

::: note 测试

通过下方命令能够把主机桌面上的`test_centos`文件夹挂载到容器内的`/home`目录

```sh
docker run -it -v C:\Users\13995\Desktop\test_centos:/home centos /bin/bash
```

如果此时运行`docker inspect <containerid>`，则会发现输出命令中有下方内容，说明挂载成功

```json
 "Mounts": [
            {
                "Type": "bind",
                "Source": "C:\\Users\\13995\\Desktop\\test_centos",
                "Destination": "/home",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
```

挂载之后，容器内的路径和主机内的路径文件内容是一致的，双向绑定
:::

## Dockfile

dockfile 就是用来构建 docker 镜像的构建文件，是一段命令脚本

```sh
FROM 镜像名                 # 基础镜像
MAINTAINER  姓名+邮箱       # 镜像作者签名
RUN 命令                 # 构建镜像时需要运行的命令
ADD                     # 添加内容
WORKDIR                 # 镜像的工作目录
VOLUME                  # 挂载卷的目录
EXPOSE                  # 暴露端口
ENTRYPOINT              # 指定这个容器启动时要运行的命令 ——可以追加命令
ONBUILD                 # 当构建一个被继承 Dockerfile 这个时候就会运行ONBUILD指令
COPY                    # 类似ADD，将文件拷贝到镜像中
ENV                     # 构建的时候设置环境变量
CMD                     # 指定这个容器启动时要运行的命令——只有最后一个会生效且可以被替代
```

## 镜像发布到 Docker Hub

1. 注册[Docker Hub](https://hub.docker.com/)账号
2. `docker login -u <用户名> -p <密码>` 登录 docker
3. `docker push <镜像名>`
4. `docker tag <镜像名> <新镜像名>[:tag]` 可用于重建镜像名和 tag 版本号
