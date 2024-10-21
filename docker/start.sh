#!/bin/bash
set -e

cd /app

if [ ! -d "/app/node_modules" ]; then
  npm install --verbose
  npm install -g expo-cli
fi

sysctl fs.inotify.max_user_watches=1048576

while true; do
  sleep 60
done
