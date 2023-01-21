# Sample React Native Project

# 🚧 Caution

Mono Repo에 리액트 네이티브가 `no-hoist` 옵션없이 공유되도록 하는 전략을 선택할 경우,

React Native 설정에서 package 경로는 루트 경로의 `node_modules` 로 지정해줘야한다.

설정 당시의 설정한 값들은 아래와 같습니다. React Native 버젼마다 달라질 가능성이 농후하니 항상 주의깊게 고려해야할 부분입니다.

> https://www.callstack.com/blog/setting-up-react-native-monorepo-with-yarn-workspaces

# Update iOS Setting

## Update /ios/Podfile

```ruby
# 경로를 require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../../../node_modules/react-native/scripts/react_native_pods'

# TODO: require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
require_relative '../../../node_modules/@react-native-community/cli-platform-ios/native_modules'

# ...

target 'SampleApp' do
  config = use_native_modules!
    # ...
    post_install do |installer|
        react_native_post_install(
        installer,

        # Update: Add this argument, Default is "../node_modules/react-native"
        "../../../node_modules/react-native",

        # Set `mac_catalyst_enabled` to `true` in order to apply patches
        # necessary for Mac Catalyst builds
        :mac_catalyst_enabled => false
        )
        __apply_Xcode_12_5_M1_post_install_workaround(installer)
    end
    # ...
end
```

## Next open Xcode and inside Project settings > Build Phases open “Bundle React Native code and images”

```
- WITH_ENVIRONMENT="../../node_modules/react-native/scripts/xcode/with-environment.sh"
- REACT_NATIVE_XCODE="../../node_modules/react-native/scripts/react-native-xcode.sh"
+ WITH_ENVIRONMENT="../../../node_modules/react-native/scripts/xcode/with-environment.sh"
+ REACT_NATIVE_XCODE="../../../node_modules/react-native/scripts/react-native-xcode.sh"
```

# Update Android Setting

## `android/settings.gradle`

```
rootProject.name = 'SampleApp'
apply from: file("../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../../../node_modules/react-native-gradle-plugin')
```

## `android/app/build.gradle`

```
//   The folder where the react-native NPM package is. Default is ../node_modules/react-native
reactNativeDir = file("../../../node_modules/react-native")
//   The folder where the react-native Codegen package is. Default is ../node_modules/react-native-codegen
codegenDir = file("../../../node_modules/react-native-codegen")
//   The cli.js file which is the React Native CLI entrypoint. Default is ../node_modules/react-native/cli.js
cliFile = file("../../../node_modules/react-native/cli.js")

...

apply from: file("../../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```
