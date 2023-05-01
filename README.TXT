There is no executable for this project, as the environment must be set up on an emulator or mobile device.

Steps required to run this code:

----------------------------------------------------------
Pre-requisites:

Must have node.js installed 
(https://nodejs.org/en)

Must have Expo installed 
(npm install -g expo-cli,  documentation:
https://reactnative.dev/docs/0.61/enviroment-setup
https://reactnative.dev/docs/environment-setup#:~:text=Running%20your%20React%20Native%20application,the%20default%20iOS%20Camera%20app.)
----------------------------------------------------------

Steps:
1. Download the source code folder
2. Navigate to BikeApp > BikeAppExpo in a terminal
3. Enter the following commands:

> npm install
> expo install

This initiates the expo client in the BikeAppExpo project folder.

4. To run the app, follow either a or b:

a. Launch an android emulator on Android Studio and install Expo Go from the app store, then enter the following command in the terminal:

> npm run android

This will run the app directly on the emulator


b. Download the Expo Go app on a mobile device, then enter the  following command:

> npm start

This will generate a QR code in the terminal, which you can scan using the Expo Go app to start the app.
