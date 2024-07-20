import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/form-components/CustomTextInput";
import AppName from "../components/AppName";
import FormButton from "../components/form-components/FormButton";

function SignUpScreen({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
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
                    <Text style={styles.title}>Sign up</Text>
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
                    name="email"
                    rules={{ required: "Email is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Enter email address"
                            label="Email address"
                            secureTextEntry={false}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.email?.message}
                            accessibilityLabel="Email address"
                            accessibilityHint="Input field for your email address"
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
                <Controller
                    control={control}
                    name="passwordConfirm"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextInput
                            placeholder="Confirm password"
                            label="Confirm password"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.passwordConfirm?.message}
                            accessibilityLabel="Confirm password"
                            accessibilityHint="Input field for confirming your password"
                        />
                    )}
                />
                <FormButton 
                    role={"submit"}
                    text="Sign up"
                    onPress={handleSubmit(onSubmit)}
                    accessibilityLabel="Sign up button"
                    accessibilityHint="Double tap to sign up" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#4AC483',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
})

export default SignUpScreen;
