import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/form-components/CustomTextInput";
import FormButton from "../components/form-components/FormButton";
import AuthStackLayout from '../layouts/AuthStackLayout'; 
import globalStyles from "../styles/globalStyles";

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
        <AuthStackLayout>
            <View>
                <Text style={[globalStyles.h1, styles.title]}>Log in</Text>
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
                <Text style={[globalStyles.textWhite, styles.centredText]}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[globalStyles.textBoldDark, styles.link]}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </AuthStackLayout>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'center',
    },
    centredText: {
        textAlign: 'center',
    },
    link: {
        marginTop: 4,
    },
    center: {
        alignItems: 'center'
    }
});

export default LoginScreen;
