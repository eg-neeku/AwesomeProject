## https://reactnative.dev/docs/getting-started-without-a-framework : Using React Native without the Expo, Always use documentation, npmjs.org. reactnative.directory and ai tools to cross check for installing the package
1. After installing android studio, its emulator, git, vscode,openjdk. Open the following System Environment variable and Add the following paths to it:
``` bash
    ✅ Environment Variables → User Variables
    JAVA_HOME = C:\Program Files\Microsoft\jdk-17
    ANDROID_HOME = C:\Users\rootUser\AppData\Local\Android\Sdk
    ANDROID_SDK_ROOT = C:\Users\rootUser\AppData\Local\Android\Sdk
```

``` bash
✅ Add to PATH
    %JAVA_HOME%\bin
    C:\Users\rootUser\AppData\Local\Android\Sdk\platform-tools
    C:\Users\rootUser\AppData\Local\Android\Sdk\emulator
    C:\Users\rootUser\AppData\Local\Android\Sdk\tools
    C:\Users\rootUser\AppData\Local\Android\Sdk\tools\bin
```
2. (Optional)If the adb is not launching then only add this using powershell:
To fix the ADB thing:
``` powershell
    $env:PATH += ";C:\Users\neeku\AppData\Local\Android\Sdk\platform-tools"
```
3. If using the Windows/Mac, then keep yuor android emulator running first(from android studio) for smooth experience.
    3.1: In windows open the task manager. Just see if the adb process suspended thing is displaying then just end task that adb only. If many then all those suspended processes just terminate it.
    3.2:  

4. Open the VSCode and run the command
``` bash
    npx @react-native-community/cli@latest init AwesomeProject.
```

5. Open the android/gradle.properties file:
# Project-wide Gradle settings.

# IDE (e.g. Android Studio) users:
# Gradle settings configured through the IDE *will override*
# any settings specified in this file.

# For more details on how to configure your build environment visit
# http://www.gradle.org/docs/current/userguide/build_environment.html

# Specifies the JVM arguments used for the daemon process.
# The setting is particularly useful for tweaking memory settings.
# Default value: -Xmx512m -XX:MaxMetaspaceSize=256m
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# When configured, Gradle will run in incubating parallel mode.
# This option should only be used with decoupled projects. More details, visit
# http://www.gradle.org/docs/current/userguide/multi_project_builds.html#sec:decoupled_projects
# org.gradle.parallel=true

# AndroidX package structure to make it clearer which packages are bundled with the
# Android operating system, and which are packaged with your app's APK
# https://developer.android.com/topic/libraries/support-library/androidx-rn
android.useAndroidX=true

# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
newArchEnabled=true

# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

# Use this property to enable edge-to-edge display support.
# This allows your app to draw behind system bars for an immersive UI.
# Note: Only works with ReactActivity and should not be used with custom Activity.
edgeToEdgeEnabled=false

# keeps a persistent Gradle process running in the background so that subsequent build reuse the same
# JVM and configuration, avoiding cold starts
org.gradle.daemon=true

# Enables parallel execution of independent Gradle tasks across multiple modules.
org.gradle.parallel=true

# Gradle only configures projects that are needed for the current task, instead of configuring every subproject.
org.gradle.configureondemand=true

# Allocates up to 4 GB heap for Gradle. Prevents memory-related slowdowns.
org.gradle.jvmargs=-Xmx4g -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Forces the project to use AndroidX libraries instead of the old support libraries (e.g., androidx.appcompat instead of com.android.support).
# android.useAndroidX=true

# Enables Jetifier, which rewrites old support-library dependencies in your third‑party AAR/JARs to AndroidX at build time.
android.enableJetifier=true

# Enables to reuse already build gradle output
org.gradle.caching=true

6. Start Metro(JS Build tool for React Native)
``` bash
    npm start
```

7. Start you application(basially for the first time when you install the apk on emulator or wheenver you install new packages)
``` bash
    npm run android
```
    5.1. Whenever there is some error occurs, even if your app is not showing any error then: Remove the app cache and build cache
        ``` bash
            $ npx react-native start --reset-cache
            $ cd android && gradlew clean && cd ..
        ``` . Then go to the above step 5.

8. Dont run the 4,5 simultaneously. Run 4 to build the project and 5 to see the output.

9. Once the build is successful and you have launched your app. Now next time when you do some changes to your app, Just run the command:
``` bash
    npx react-native start.
```

10. Open the installed apk in emulator and you will see that changes are displyaing in it.

11. Icons:
``` bash 
        npm i --save-dev @types/react-native-vector-icons
```
    
12. Adaptive Responsive UIs: colors.android.js, colors.ios.js; So jus do normally task. The platform itself detects what type of file UI has to be attached and use.

13. Navigation: 
``` bash 
        npm install @react-navigation/native
        npm install react-native-screens react-native-safe-area-context
        npm install @react-navigation/native-stack
        npm install @react-navigation/elements
```

To globally set the icon use the following method:
Make sure the icons are in square shaped only, as android and ios will auto create and set the roundness.
``` bash
    $ npm install react-native-set-icon --save-dev
    $ npx react-native-set-icon --path ./assets/image/icon.png
```

Database REST API operations:
1. Setup the database(Firebase is used here). Here in realtime data make sure to set the read and write to true(risky but for real-time db and free purpose this is needed)
2. Install packages:
``` bash
    npm i axios
```
3. To store the data in phone: using the key value pair approach just like ocalstorage in browser:
``` bash
    npm install @react-native-async-storage/async-storage@next
```

To build .apk file: 
1. Run the following command:
``` bash
    $cd Project && cd android
    $gradlew clean
    $gradlew assembleRelease
```

2. Fix gradlew clean error:

Delete
android/app/.cxx
android/app/build/generated/autolinking
android/app/build
android/build
rm -rf node_modules

npm install
npx react-native-codegen
cd android
gradlew clean
npm run android


Now to remember such long command and then typing can be truly nightmar, so in package.json add this:
So for user defined scripts use npm run <whatever_key_script>.
But for built-in npm commands: like start, test, outdates, publish, init etc. Does not require run
``` json
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest",
    "gradleWinClean": "cd android && gradlew clean && cd ..",
    "gradleMacLinxClean": "cd android && ./gradlew clean && cd ..",
    "gradleClean": "npm run gradleWinClean || npm run gradleMacLinxClean",
    "npm-clean-install": "rm -rf node_modules && npm install --force"
  },
```



Shell / OS
```bash
```sh
```shell
```zsh
```powershell
```ps1

Programming Languages
```javascript
```js
```typescript
```ts
```python
```java
```c
```cpp
```csharp
```cs
```go
```rust
```ruby
```php
```swift
```kotlin
```scala
```dart
```r
```perl
```lua

Web / Markup:
```html
```xml
```css
```scss
```sass
```less
```json
```yaml
```yml
```toml

When exploring icon there will be some builtin method that helps to get the source path of the image icon as string,
use it if necessary