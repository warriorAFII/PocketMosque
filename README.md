
<img src="https://github.com/user-attachments/assets/f831d0d3-6131-44dd-a671-7e9a7ed545d7" width="100%">


# Pocket Mosque

Kraken Wallet is a Crypto and Bitcoin self-custody wallet where your keys never leave your device. Engineered and crafted by the mighty and OG Kraken.com. It is built with React Native, Realm, an Electrum Server, and other FOSS projects. The backend runs over a proxy to ensure your personal data is never shared with 3rd party services or companies. It is built under strong principles of privacy, self-custody, and security to ensure maximum sovereignty for its users. It is open sourced under the MIT license.

This repo functions as a mirror of the main private development repo. Its main purpose is to provide audibility, trust minimization, and code review. Please provide feedback, vulnerabilities or bug reporting using the responsible disclosure process. 

## Main features

* Prayer times
* Qibla Direction
* Duas page
* Push Notifications


## Official Channels

* [Website](https://pocketmosque.com) 
* [Discord](https://discord.gg/4pB3StHpP7) 
* [Apple App Store](https://apps.apple.com/gb/app/pocket-mosque/id1584476704) 

## License

Pocket Mosque's source code is released under the terms of the MIT license.

## Contributing

We welcome contributions from the community. Here are a few guidelines to help you get started:

Security-Related Bugs and Disclosures

For any security-related issues, please refer to our [Responsible Disclosure policy](https://www.kraken.com/features/security/bug-bounty). It's crucial that these matters are handled sensitively to protect all users.

Feature Requests

If you're interested in suggesting a new feature, please submit a detailed issue on Github. Include the purpose of the feature, its potential impact, and any ideas you have for how it might be implemented. This will help us understand and evaluate your proposal more effectively.

Pull Requests

Please note that our repository is a point-in-time mirror of our internal repository, which means we cannot directly merge pull requests. However, every pull request is valuable and will be reviewed by our team. Contributions considered suitable will be manually integrated into our internal repo and reflected in future releases.

Upcoming Improvements

We are currently working on providing developer documentation that is necessary for quality PRs. We expect to roll out these resources soon and will keep the community updated on our progress.

## Development Roadmap 

### Short-term 

- [ ] Migrate the codebase to TypeScript
- [ ] Launch app to Play Store

### Long-term
- [ ] Revamp the Duas page
- [ ] Implement a Quran screen

## Build Instructions

You have to use Dev client because expo go react-native-compass-heading doesnt work on managed workflow

This guide will walk you through setting up your development environment and building the app for both Android and iOS.

### Prerequisites

Before you begin, make sure you have the following tools and software installed:

- Node (>= 18)
- Ruby (>= 2.6.10)
- Yarn
- Android Studio (for Android development)
- Xcode 15 (for iOS development)

For detailed instructions on setting up the environment, refer to the [React Native documentation](https://reactnative.dev/docs/set-up-your-environment).

### Setup

#### Environment Configuration

Create a `.env` file in the root directory of your project and populate it with the following data:

```plaintext
EXPO_PUBLIC_WEATHER_API_KEY=https://wallet.kraken.com/api/data
EXPO_PUBLIC_LOCATION_API_KEY=https://wallet.kraken.com/api/push
EXPO_PUBLIC_SENTRY_DSN=
```

- All the environment variables are optional, but it is recommended to include the weather and location API keys for full functionality. Both APIs are free to use (provided the number of calls remains within reasonable limits).
-The Sentry DSN is completely optional and can be added at the user's discretion for error tracking.

### Android

#### Generate a Debug Keystore

Open a terminal and run the following command to generate a debug keystore

```sh
keytool -genkey -v -keystore android/app/debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android
```

#### Build the Android app

```sh
yarn && yarn android
```

### iOS

#### Configure Xcode Project

- Open the `ios/.xcworkspace` file in Xcode.
- Select the target and go to the _Signing & Capabilities_ tab
- Select your team and create a provisioning profile. If you need help, refer to the [Apple Developer documentation](https://developer.apple.com/help/account/manage-profiles/create-a-development-provisioning-profile/).



#### Build the iOS app

```sh
sudo gem install bundler
yarn && yarn ios
```

### Push Notifications

## 
