#!/bin/sh

export PATH=/usr/local/bin:$PATH

# 输出环境变量的调试的信息
env

pm2 delete webnode_iotdm
