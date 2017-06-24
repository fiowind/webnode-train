#!/usr/bin/env bash

set -e

export PATH=/home/scmtools/buildkit/node/node_6.9.1/bin:$PATH
# npm install --registry=http://registry.npm.baidu.com > ./_build.log 2>&1 || ( EC=$?; cat ./_build.log; exit $EC )
git clone ssh://git@icode.baidu.com:8235/baidu/bce-iot/iotdm-webnode-tools ./tools

cp tools/develop/node_modules.tgz ./
tar zxf node_modules.tgz
rm  node_modules.tgz

npm run compile

rm -rf output

mkdir output
mkdir -p output/bin
mkdir -p output/conf

cp -r `ls -a | grep -E "^(dist|pm2.json|server|startup.sh|common|views|.babelrc|client|cmrh.conf.js)$"` output/bin
cp deploy/start.sh output/bin
cp deploy/stop.sh output/bin
cp deploy/bcedeploywhitelist.txt output

cp tools/develop/node_modules.tgz output/bin/
# tar zcf output/bin/node_modules.tgz node_modules
# rm -rf output/bin/node_modules

# 生成version.txt文件
version=$(sed -n '1p' BCLOUD  |  awk -F '"' '{print $2}')
#branch=$(svn info | grep "Last Changed Rev" | awk '{print $4}')
branch=$(git rev-parse --short HEAD)
echo $version.$branch > output/bin/client/assets/version.txt

cd output/bin/
tar zcf dist.tgz dist
rm -rf dist
tar zcf client.tgz client
rm -rf client
tar zcf common.tgz common
rm -rf common
tar zcf views.tgz views
rm -rf views
cd ../../
