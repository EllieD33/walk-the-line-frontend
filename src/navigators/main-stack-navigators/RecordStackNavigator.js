import { createStackNavigator } from '@react-navigation/stack';
import RecordWalkScreen from '../../screens/RecordWalkScreen';

const RecordWalkStack = createStackNavigator();

const RecordWalkStackNavigator = () => (
    <RecordWalkStack.Navigator screenOptions={{ headerShown: false }}>
        <RecordWalkStack.Screen name="Record" component={RecordWalkScreen} />
    </RecordWalkStack.Navigator>
);

export default RecordWalkStackNavigator;