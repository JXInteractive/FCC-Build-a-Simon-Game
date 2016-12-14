#!/bin/bash

cd "$(dirname "$0")"

npm install --only=dev

export NODE_ENV=production

gulp

cd build

open index.html