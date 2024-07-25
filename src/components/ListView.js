import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native"
import { useSelector } from 'react-redux';
import { selectAllWalks } from "../store/slices/walksSlice";
import WalkCard from "./WalkCard";

const ListView = ({ navigation, userId }) => {
    const walks = useSelector(selectAllWalks);

    const userWalks = walks.filter((walk) => walk.creator_id === userId)

    if (!walks) {
        return <ActivityIndicator style={styles.center} size="large" />;
    }


    return (
        <View style={styles.container} >
            <FlatList 
                data={userId ? userWalks : walks}
                keyExtractor={(walk) => walk.walk_id.toString()}
                renderItem={({ item: walk }) => (
                    <WalkCard walk={walk} navigation={navigation} />
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
export default ListView;