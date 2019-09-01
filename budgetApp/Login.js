import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hi Ash</Text>
                <TextInput></TextInput>
                <Text>Password</Text>
                <TextInput></TextInput>
                <Button title="Submit"></Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    },
});