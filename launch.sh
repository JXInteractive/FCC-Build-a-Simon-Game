#!/bin/bash

npm install --only=dev

export NODE_ENV=production

cd build

open index.html