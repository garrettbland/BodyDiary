/**
 * import react-native-gesture-handler according to
 * react navigtion documentation to avoid app crashes in prod.
 * Also import react-native-get-random-values for a polyfill to
 * use uuid. Otherwise it will throw an error
 */
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
