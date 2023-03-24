#!/bin/bash

# CONSTANTS
VERSION=$(jq -r '.version' package.json)
TAGS=$(git tag --list)

# EXIT CODES
EXIT_SUCCESS=0
EXIT_BY_ANY=1
EXIT_BY_USER=2

# CAN BE USER ARG
IS_VERBOSE=false

#!/bin/bash

function log() {
  local type="${1:-info}"
  shift
  local message="$@"
  local timestamp=""
  local color=""

  case "$type" in
  "SUCCESS") color="\033[0;32m" ;;
  "INFO") color="\033[0;34m" ;;
  "WARN") color="\033[0;33m" ;;
  "ERROR") color="\033[0;31m" ;;
  *) color="\033[0;34m" ;;
  esac

  if [ "$IS_VERBOSE" = true ]; then
    timestamp="$(date +"[%Y-%m-%d %H:%M:%S]") "
  fi

  echo -e "$timestamp[$color${type^^}\033[0m] $message" >&2
}

function create_tag_version() {
  read -p "[INPUT] Do you want to create a Git tag to release this version? (y/n): " CHOICE
  if [[ "$CHOICE" =~ ^[Yy]$ ]]; then
    tag_version
  else
    log "INFO" "No Git tag created and exiting..."
    exit $EXIT_BY_USER
  fi

  git tag -a "$VERSION" -m "Tagging version $VERSION"
  if [ $? -eq $EXIT_SUCCESS ]; then
    log "success" "Git tag $VERSION created successfully"
  else
    log "error" "Git tag $VERSION it was not created!"
  fi
}

function build_release() {
  log "info" "Building release to $VERSION"

  npm install

  npm run build

  mv -v ./build ./release

  git add ./release ./package-lock.json ./package.json
  git commit -m 'Update version and release new bundle'
}

function push_version() {
  git push origin "$VERSION"
  if [ $? -eq $EXIT_SUCCESS ]; then
    log "success" "Git tag $VERSION pushed to remote repository successfully"
  else
    log "error" "Failed to push Git tag $VERSION to remote repository"
  fi
}

function assert_tag_version() {
  if [[ "$TAGS" =~ "$VERSION" ]]; then
    log "error" "Error: a tag for version $VERSION already exists"
    exit $EXIT_BY_ANY
  fi
  log "info" "No tag for version $VERSION found. Continuing ..."
}

assert_tag_version
build_release
create_tag_version
push_version
if [ $? -eq $EXIT_SUCCESS ]; then
  log "success" 'Access the link to setup a Release on Github'
  echo -n "\t\"https://github.com/andersonbosa/automocker.js/releases/new\""
else
  log "error" "Something was wrong ...For now I can't help you 🥲"
fi
