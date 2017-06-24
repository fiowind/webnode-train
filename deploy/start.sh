#!/bin/sh

export PATH=/usr/local/bin:$PATH

# 输出环境变量的调试的信息
env

if [ -f "node_modules.tgz" ]; then
    tar zxf node_modules.tgz
    rm -f node_modules.tgz
fi

if [ -f "dist.tgz" ]; then
    rm -rf dist
    tar zxf dist.tgz
    rm -f dist.tgz
fi

if [ -f "views.tgz" ]; then
    rm -rf views
    tar zxf views.tgz
    rm -f views.tgz
fi

if [ -f "client.tgz" ]; then
    rm -rf client
    tar zxf client.tgz
    rm -f client.tgz
fi

if [ -f "common.tgz" ]; then
    rm -rf common
    tar zxf common.tgz
    rm -f common.tgz
fi

pm2 start pm2.json

