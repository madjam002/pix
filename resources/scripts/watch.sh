#!/bin/sh
set -e

for f in packages/*; do
  if [ -d "$f/src" ]; then
    rm -rf "$f/lib"
    (cd $f && node ../../node_modules/.bin/babel src --out-dir lib --copy-files $1 --watch) &
  fi
done

wait
