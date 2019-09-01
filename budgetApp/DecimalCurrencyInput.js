import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import accounting from 'accounting';

export default class DecimalCurrencyInput extends Component {

    constructor(){
        super();
        this.state = {
            value: "",
            reset: false,
        };
    }
    
    convertToDecimal = (input) => {
        const output = this.state.reset ? '0.0' : input;
        return accounting.formatMoney(parseFloat(output)/100);
    }

    focus() {
        this.ref.focus();
    }

    flipReset(){
        let current = this.state.reset;
        this.setState({reset: !current});
    }

    update(value) {
        this.props.onUpdate(value);
    }

    render() {
        const {reset,} = this.props.reset;
        return (
            <View>
                <TextInput
                    style={styles.invisible}
                    onChangeText={
                        (text) => {
                            this.setState({value: text});
                            this.update(parseFloat(text)/100);
                        }
                    }
                    ref={ref => this.ref = ref}
                    keyboardType='numeric'
                    position='absolute'
                >
                </TextInput>
                <TouchableOpacity
                    onPress={() => this.focus()}
                >
                    <Text style={styles.text}>{this.convertToDecimal(this.state.value)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginLeft: 6,
    }, 
    invisible: {
        opacity: 100,
        width: 0,
        height: 0
    }
});