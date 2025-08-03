# 使用官方 nginx 镜像
FROM nginx:alpine

# 删除默认 nginx 网页内容
RUN rm -rf /usr/share/nginx/html/*

# 复制你自己的静态网页内容
COPY . /usr/share/nginx/html
