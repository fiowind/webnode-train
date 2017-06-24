#!/bin/sh

# usage:  <node id> <log path>

id=$(cat ./client/assets/version.txt)
node ./server/index.js --id=$id
