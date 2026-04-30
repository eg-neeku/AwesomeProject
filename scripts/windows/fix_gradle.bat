@echo off

echo Cleaning Android gradle cache...

cd /d "%~dp0..\.."

cd android || exit /b
if exists build rmdir /s /q build

cd app || exit /b
if exists build rmdir /s /q build
if exists .cxx rmdir /s /q .cxx

cd ..
echo Running Gradle clean...
call gradlew clean