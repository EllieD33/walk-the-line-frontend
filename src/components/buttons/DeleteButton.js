import { View } from "react-native";
import IconButton from "./IconButton";

const DeleteButton = ({ walkId, setConfirmDelete, }) => {
    handleDeletePress = () => {
        setConfirmDelete(true);
    }

    return (
        <View>
            <IconButton variant='delete' icon='delete-outline' onPress={handleDeletePress} accessibilityLabel="Delete walk" />
        </View>
    )
}

export default DeleteButton