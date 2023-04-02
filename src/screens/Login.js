import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalSytles } from "../../styles/globalStyle";
import React from "react";

export default function Login({ navigation }) {

    const onPressHandler = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TCG MarketPlace</Text>
            <Text style={styles.subtitle}>Please login with any username to test</Text>
            <View>
                <View style={[globalSytles.cardShadow]}>
                    <TextInput style={globalSytles.input} placeholder="User name"></TextInput>
                </View>
            </View>

            <TouchableOpacity onPress={onPressHandler} style={globalSytles.button}>
                <Text style={globalSytles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
    },
    subtitle: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 20,
    },


  });
