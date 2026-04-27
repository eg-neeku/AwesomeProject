#!/bin/bash

set -e

echo "Cleaning Android build directories..."

cd android

[ -d build ] && rm -rf build

cd app

[ -d build ] && rm -rf build
[ -d .cxx ] && rm -rf .cxx

cd ..

echo "Running Gradle clean..."
./gradlew clean

echo "Building release APK..."
./gradlew assembleRelease

echo "Installing APK on connected device..."
adb install -r app/build/outputs/apk/release/MyCustomApp-1.0-release.apk

echo "Done!"