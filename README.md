
<img src="https://github.com/user-attachments/assets/f831d0d3-6131-44dd-a671-7e9a7ed545d7" width="100%">


# Pocket Mosque

Pocket Mosque is a comprehensive prayer app designed to support your spiritual needs. Built with React Native, Realm, and other open-source technologies, it ensures privacy, security, and user autonomy. Our app provides accurate prayer times, Qibla direction, a collection of Duas, and push notifications to keep you connected and on schedule.

We are committed to creating a reliable and user-friendly app that respects your privacy. Pocket Mosque is open-sourced under the MIT license, inviting community feedback, contributions, and code reviews to help us improve and evolve.

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

We welcome contributions from the community! Whether you're fixing bugs, improving the codebase, or adding new features, your efforts are appreciated. To get started, please follow these guidelines:

### How to Contribute

1. **Fork the Repository:**
   - Navigate to the main repository and fork it to your own GitHub account.

2. **Clone the Fork:**
   - Clone your forked repository to your local machine using the following command:
     ```sh
     git clone https://github.com/your-username/pocketmosque.git
     ```

3. **Create a Branch:**
   - Create a new branch for your feature or bug fix:
     ```sh
     git checkout -b feature-or-bugfix-name
     ```

4. **Make Changes:**
   - Make your changes in the new branch. Ensure your code follows the project's coding standards and includes appropriate tests.

5. **Commit Changes:**
   - Commit your changes with a descriptive commit message:
     ```sh
     git commit -m "Description of the feature or fix"
     ```

6. **Push Changes:**
   - Push your changes to your forked repository:
     ```sh
     git push origin feature-or-bugfix-name
     ```

7. **Create a Pull Request:**
   - Navigate to the original repository and create a pull request from your branch. Provide a detailed description of your changes and any relevant information.

### Code Review Process

- All contributions will be reviewed by the maintainers.
- Ensure your pull request is linked to any relevant issues or feature requests.
- Be responsive to feedback and make necessary changes as requested by the reviewers.

### Reporting Issues

- If you encounter any bugs or have feature requests, please open an issue in the repository. Provide as much detail as possible to help us understand and resolve the issue efficiently.

### Code of Conduct

- We are committed to fostering an open and welcoming environment. Please read and adhere to our [Code of Conduct](https://github.com/kraken-wallet/pocket-mosque/CODE_OF_CONDUCT.md) to ensure a positive experience for all contributors.

Thank you for contributing to Pocket Mosque! Your involvement is key to the project's success and continuous improvement.

## Build Instructions

Currently to run the app you need to use the Dev client because the package react-native-compass-heading only works in the Dev client and not in the managed workflow. 

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
EXPO_PUBLIC_WEATHER_API_KEY=https://openweathermap.org/api
EXPO_PUBLIC_LOCATION_API_KEY=https://developer.here.com/
EXPO_PUBLIC_SENTRY_DSN=https://sentry.io/welcome/
```

- All the environment variables are optional, but it is recommended to include the weather and location API keys for full functionality. Both APIs are free to use (provided the number of calls remains within reasonable limits). If these keys are not provided, default values are set within the app.
- The Sentry DSN is completely optional and can be added at the user's discretion for error tracking.

### Android

#### Build the Android app

```sh
eas build -profile development platform --android
```

### iOS

#### Build the iOS app

```sh
cd ios
pod install
cd ..
eas build -profile development-simulator platform --ios
```

### Run the app

```sh
npx expo start --dev-client
```

## Development Roadmap 

### Short-term 

- [ ] Migrate the codebase to TypeScript
- [ ] Launch app to Play Store

### Long-term
- [ ] Revamp the Duas page
- [ ] Implement a Quran screen

## Special Thanks 
Special thanks to the team at [Islamic Network](https://islamic.network/) for providing the prayer time API.

