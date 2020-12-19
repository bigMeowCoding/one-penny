#!/usr/bin/env bash

yarn doc
git checkout gh-page
mv -f doc/* ./
git add .
git commit -m 'update'
git push
git checkout -
