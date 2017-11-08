cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.unarin.cordova.beacon.underscorejs",
    "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Q",
    "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.LocationManager",
    "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
    "pluginId": "com.unarin.cordova.beacon",
    "merges": [
      "cordova.plugins"
    ]
  },
  {
    "id": "com.unarin.cordova.beacon.Delegate",
    "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Region",
    "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.Regions",
    "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.CircularRegion",
    "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "com.unarin.cordova.beacon.BeaconRegion",
    "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
    "pluginId": "com.unarin.cordova.beacon",
    "runs": true
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  },
  {
    "id": "cordova-plugin-background-mode.BackgroundMode",
    "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
    "pluginId": "cordova-plugin-background-mode",
    "clobbers": [
      "cordova.plugins.backgroundMode",
      "plugin.backgroundMode"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.unarin.cordova.beacon": "3.5.2",
  "cordova-plugin-device": "1.1.4",
  "cordova-plugin-ionic-webview": "1.1.16",
  "cordova-plugin-splashscreen": "4.0.3",
  "cordova-plugin-statusbar": "2.2.4-dev",
  "cordova-plugin-whitelist": "1.3.1",
  "cordova-sqlite-storage": "2.1.0",
  "ionic-plugin-keyboard": "2.2.1",
  "cordova-plugin-background-mode": "0.7.2",
  "phonegap-plugin-push": "2.1.0"
};
// BOTTOM OF METADATA
});