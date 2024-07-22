import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import WalkDetailsScreen from '../../screens/WalkDetailsScreen';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="WalkDetails" component={WalkDetailsScreen} />
    </HomeStack.Navigator>
);

export default HomeStackNavigator;