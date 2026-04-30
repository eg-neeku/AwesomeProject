#!/bin/bash

set -e

echo "Fixing Gradle builderror for Android build..."
cd android

[ -d build ] && rm -rf build

cd app

[ -d build ] && rm -rf build
[ -d .cxx ] && rm -rf .cxx

echo "Running Gradle clean..."
./gradlew clean

echo "Done!"