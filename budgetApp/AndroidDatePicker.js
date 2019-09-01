import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DatePickerAndroid, Alert} from 'react-native';
import helpers from './helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AndroidDatePicker extends Component {

    constructor(){
        super();
        this.state = {
            text: helpers.getDateStr(new Date()),
            date: new Date(),
        };
    }

    componentWillMount() {
        this.props.onUpdate(this.state.date, this.state.text);
    }
    
    editDate = async () => {
        try {
            let date = new Date();
            const { action, year, month, day, } = await
                DatePickerAndroid.open({
                    date: date,
                    minDate: new Date(date.getFullYear(), date.getMonth(), 1),
                    maxDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
                });
            if(action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day);
                let text = helpers.getDateStr(date);
                this.setState({date: date});
                this.setState({text: text});
                
                this.props.onUpdate(this.state.date, this.state.text);
            }

        } catch({code, message}) {
            console.warn(message);
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: 16
                }}>Date:</Text>
                <TouchableOpacity onPress={this.editDate}>
                    <Text style={{
                        fontSize: 16,
                        marginRight: 2
                    }}>{this.state.text}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.editDate}>
                    <Icon 
                        name="edit"
                        size={30}>
                    </Icon>
                </TouchableOpacity>
           </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    }, 
    headerText: {
        fontSize: 16,
    }
});