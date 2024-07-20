import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
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
                <View>
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
                <View style={styles.center} >
                    <Text style={styles.text}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
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
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    link: {
        fontWeight: 'bold',
        color: '#1c4d31',
        fontSize: 16,
        marginTop: 4,
    },
    center: {
        alignItems: 'center'
    }
});

export default LoginScreen;
