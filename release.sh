#!/bin/bash

VERSION=$(jq -r '.version' package.json)

echo "The version number is: $VERSION"
