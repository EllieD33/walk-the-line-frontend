import { FlatList, View, StyleSheet } from "react-native"
import { useSelector } from 'react-redux';
import { selectAllWalks } from "../store/slices/walksSlice";
import WalkCard from "./WalkCard";

const ListView = () => {
    const walks = useSelector(selectAllWalks);
    return (
        <View style={styles.container} >
            <FlatList 
                data={walks}
                keyExtractor={(walk) => walk.walk_id.toString()}
                renderItem={({ item: walk }) => (
                    <WalkCard walk={walk} />
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