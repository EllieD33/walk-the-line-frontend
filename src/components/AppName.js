import { Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const AppName = () => {
    return (
        <View style={styles.container} >
            <Ionicons name="footsteps" size={44} color="white" />
            <Text style={styles.title} >WanderWays</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'satisfy-regular',
        fontSize: 40,
        color: 'white'
    },
});

export default AppName;