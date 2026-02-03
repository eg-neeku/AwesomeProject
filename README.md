This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## https://reactnative.dev/docs/getting-started-without-a-framework : Using React Native without the Expo
1. After installing android studio, its emulator, git, vscode,openjdk. Open the following Environment variable and Add the following paths to it:
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
3. Open the VSCode and run the command
``` bash
    npx @react-native-community/cli@latest init AwesomeProject.
```

4. Start Metro(JS Build tool for React Native)
``` bash
    npm start
```

5. Start you application
``` bash
    npm run android
```

6. Dont run the 4,5 simultaneously. Run 4 to build the project and 5 to see the output.

7. Here why three terminals have been launched?

8. Elements are: View, Text, Image, Button, TextInput.
Style can : 
    8.1. Text
    8.2. View: So by default what ever you add inside this say if it exceed you screen size, it is not scrollable. So to fix it ScrollView is used.
    8.3. TextInput
    8.4. TouchOpacity(alternatie to button, but no color attribute)
    8.5. FlatList: used to render the list of items.
        8.5.1. data = is an attribute used to link the variable having the dataItems
        8.5.2. renderItem = used to iterate over the data and display it in the UI. example {({item})=>{ return <View item={item} />}}
        8.5.3. keyExtractor = acts like adding unique key props to each UI element. If data has id and is of type string then directly can be used else needs to be typecasted. example: keyExtractor={(item, index) => index.toString()}
        8.5.4: By default(vertical) has scrolling feature.
    8.5.4 ScrollView: Same as FlatList, but useful for article type contents. For list it is more memory consumption(i.e why we use FlatList).


Style cannot: Button,

9. CSS styles: almost all types of styles of normal CSS indeeds matches but in camelCase.
width:80 means 80px, height:'80[%/vw/vh/rem/em]' As styles are considers as JS Object in ReactNative.
    9.1. For coloring try to use the hex values wrapped in ''. It then gives you the pallete to select the desired colors.
    9.2. The gap property in CSS is used to add spacing between elements 
    9.3. The property borderRadius on Text applies only on Android and not on IOS. Now to happen in IOS we use View which is more generic way, where the borderRadius will be working on both the elements.
    9.4. Adding styles based on condition inside the StyleSheet.create().
        Example: ...(condition?{ add the styles here}:{keep empty if you do not want that style})
    9.5. There is No Style inheritance of CSS(IN WEB) as in React Native.
    9.6: android_ripple: Pressable button adds some click effect by specifying the color.

Handling Events:
    So where refering the js function. If we add parenthesis the function would be executed as soom as it is parsed and rendered on screen. 
    