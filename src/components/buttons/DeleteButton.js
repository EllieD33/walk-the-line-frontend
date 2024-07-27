import { View } from "react-native";
import IconButton from "./IconButton";
import PropTypes from "prop-types";

const DeleteButton = ({ setConfirmDelete }) => {
    handleDeletePress = () => {
        setConfirmDelete(true);
    }

    return (
        <View>
            <IconButton variant='delete' icon='delete-outline' onPress={handleDeletePress} accessibilityLabel="Delete walk" />
        </View>
    )
};

DeleteButton.PropTypes = {
    setConfirmDelete: PropTypes.func.isRequired
};

export default DeleteButton