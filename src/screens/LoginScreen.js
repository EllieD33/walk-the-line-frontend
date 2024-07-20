import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/form-components/CustomTextInput";
import AppName from "../components/AppName";
import FormButton from "../components/form-components/FormButton";

function LoginScreen({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        //Add logic
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <AppName />
                <View>
                    <Text style={styles.title}>Log in</Text>
                    <Text style={styles.subtitle}>to continue</Text>
                </View>
                <Controller
                    control={control}
                    name="username"
                    rules={{ required: "Username is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Enter username"
                            label="Username"
                            secureTextEntry={false}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.username?.message}
                            accessibilityLabel="Username"
                            accessibilityHint="Input field for your username"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Enter password"
                            label="Password"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.password?.message}
                            accessibilityLabel="Password"
                            accessibilityHint="Input field for your password"
                        />
                    )}
                />
                <FormButton
                    role={"submit"}
                    text="Log in"
                    onPress={handleSubmit(onSubmit)}
                    accessibilityLabel="Log in button"
                    accessibilityHint="Double tap to log in"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#4AC483",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
});

export default LoginScreen;
