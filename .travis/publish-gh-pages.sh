#!/bin/bash

GH_REF=github.com/MyPureCloud/ember-webrtc-devices.git

setup_git() {
    git config user.name "Jean-Marcel Belmont"
    git config user.email "marcel.belmont@inin.com"
    git config --global push.default simple
    git config credential.helper "store --file=.git/credentials"
    echo "https://${GITHUB_API_TOKEN}:@${GH_REF}" > .git/credentials
}

create_environment() {
  git checkout -b gh-pages
  mkdir build
  cd build
  git init
  cp ../.gitignore.gh-pages .gitignore
  cp -r ../dist build
  rm -rf build/assets/intl build/assets/sounds
}

commit_github_pages() {
  git add -f build
  git commit --message "Deploy gh-pages from commit $(git rev-parse HEAD)"
}

deploy_gh_pages() {
  git remote add origin https://${GITHUB_API_TOKEN}@${GH_REF} > /dev/null 2>&1
  git pull --no-edit origin gh-pages
  git push --quiet --set-upstream master:gh-pages > /dev/null 2>&1
}

setup_git
create_environment
commit_github_pages
deploy_gh_pages