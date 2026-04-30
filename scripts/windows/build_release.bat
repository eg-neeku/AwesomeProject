REM This below line is used to hide the commands being executed
@echo off

echo Cleaning Android build directories...

cd /d "%~dp0..\.."

cd android || exit /b

if exist build rmdir /s /q build

cd app || exit /b

if exist build rmdir /s /q build
if exist .cxx rmdir /s /q .cxx

cd ..

echo Running Gradle clean...
call gradlew clean

echo Building release APK...
call gradlew assembleRelease

echo Installing APK on connected device...
adb install -r app\build\outputs\apk\release\MyCustomApp-1.0-release.apk

echo Done!
pause