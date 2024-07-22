import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import WalkDetailsScreen from '../../screens/WalkDetailsScreen';

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="WalkDetails" component={WalkDetailsScreen} />
    </ProfileStack.Navigator>
);

export default ProfileStackNavigator;