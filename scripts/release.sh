#!/bin/bash

VERSION=$(jq -r '.version' package.json)
TAGS=$(git tag --list)

if [[ "$TAGS" =~ "$VERSION" ]]; then
  echo "Error: a tag for version $VERSION already exists"
  exit 1
else
  echo "No tag for version $VERSION found"
  read -p "Do you want to create a Git tag for this version? (y/n): " CHOICE
  if [[ "$CHOICE" =~ ^[Yy]$ ]]; then
    git tag -a "$VERSION" -m "Tagging version $VERSION"
    echo "Git tag $VERSION created successfully"
  else
    echo "No Git tag created"
  fi
fi

# The rest of your script goes here
