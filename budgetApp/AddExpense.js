import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Button, Picker, Alert, Text, Keyboard, ActivityIndicator } from 'react-native';
import AndroidDatePicker from './AndroidDatePicker';
import DecimalCurrencyInput from './DecimalCurrencyInput';

export default class AddExpense extends Component {
    constructor(){ 
        super();
        this.state = {
            amount: "",
            selectedType: "",
            categories: [],
            date: new Date(),
            dateText: "",
            description: "",
            touched: {
                amount: false,
                type: false,
                description: false,
            },
            submitEnabled: false,
            loading: false,
            reset: false,
        };
    }

    addExpense = async () => {
        try {
            this.setState({loading: true});
            Keyboard.dismiss();
            let response = await fetch(
                'http://api.morga549.com/expenses',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'amount': this.state.amount,
                        'category': this.state.selectedType,
                        'description': this.state.description,
                        'date': this.state.date,
                        'user': 'morga549'
                    })
                }
            );
            let id = await response.json();
            let output = 'Expense #' + id.id + ' added.';
            this.setState({loading: false, amount: '', description: ''})
            Alert.alert('Success.', output, [{text: 'Ok', onPress: () => {
                this.setState({reset: true});
            }}]);
        } catch(error) {
            console.warn(error);
        }
    } 
    
    async componentWillMount() {
        try{
            //const arr = await fetch('http:/')
            let array = ["Groceries","Clothes","Eating Out"
                        ,"Events","Books","Subscriptions",
                        "Household Item","Gas","Bill",
                        "Rent","Student Loan","Credit Card"].sort();
            array.unshift('Category');
            this.setState({categories: array})
        } catch(error) {
            console.warn(error);
        }
        
    }
    dateUpdate = (date, text) => {
        this.setState({date: date});
        this.setState({dateText: text});
    }
    amountUpdate = (amount) => {
        this.setState({amount: amount});
        this.handleBlur('amount');
    }
    validateInputs = () => {
        value = { 
            amount: this.validateAmount(),
            type: this.validateType(), 
            description: this.validateDescription()
        }
        return value;
    }
    validateAmount = () => {
        return parseFloat(this.state.amount) > 0.0 && parseFloat(this.state.amount) < 2000;
    }
    validateType = () => {
        return this.state.selectedType != "" && this.state.selectedType != 'Category';
    }
    validateDate = () => {
        return this.state.date && this.state.dateText;
    }
    validateDescription = () => {
        return this.state.description != "";
    }
    handleBlur = (field) => () => {
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });
    }
    render() {
        const loading = this.state.loading;
        const areInputsValid = this.validateInputs();
        const isSubmitDisabled = !Object.values(areInputsValid).every((x => x === true));
        const shouldMarkError = (field) => {
            const hasError = !areInputsValid[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
          };

        return (
             <View
                style={styles.container}
                >
                <Text
                    style={styles.heading}>
                    Add an Expense
                </Text>
                <View style={[styles.inputContainer, (shouldMarkError('amount') ? styles.invalid : styles.valid)]}>
                    <DecimalCurrencyInput
                        reset={this.state.reset}
                        onUpdate={this.amountUpdate}
                    />
                </View>
                <View style={[styles.inputContainer, (shouldMarkError('type') ? styles.invalid : styles.valid)]}>
                    <Picker
                        selectedValue={this.state.selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                this.setState({selectedType: itemValue});
                                this.handleBlur('type');
                            }
                        }
                    >
                            {this.state.categories.map((item, index) => {
                                return (< Picker.Item 
                                            label={item} 
                                            value={item} 
                                            key={index + 1} 
                                            color={[(index == 0) ? '#c1bfbf' : '#000000']}
                                        />)
                            })}
                    </Picker>
                </View>
                <View style={[shouldMarkError('description') ? styles.invalid : styles.inputContainer]}>
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor='#c1bfbf'
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({description: text})}
                        onEndEditing={() => {Keyboard.dismiss()}}
                        style={styles.textInput}
                        onBlur={this.handleBlur('description')}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <AndroidDatePicker
                        onUpdate={this.dateUpdate}
                        defaultDate={this.state.date}>
                        onBlur={}
                    </AndroidDatePicker>
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={this.addExpense}
                        title='Submit'
                        color='#cf35fb'
                        disabled={isSubmitDisabled}
                    >
                    </Button>
                </View>
                <ActivityIndicator
                    style={styles.loading}
                    animating={loading}
                    size='large'
                    color='#cf35fb'
                >
                </ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginBottom: 25
    },
    heading: {
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#c1b6b9',
    },
    buttonContainer: {
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 60,
    },
    placeholderPickerItem: {
        color: '#c1bfbf',
    },
    pickerItem: {
        color: '#0e0d0d',
    },
    textInput: {
        fontSize: 16,
        marginLeft: 5,
    },
    submitButton: {
        marginHorizontal: 3,
        marginVertical: 8,
        color: '#9f29c1',
        fontSize: 16,
        
    },
    valid: {
    
    },
    invalid: {
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#f10956',
    }, 
    loading: {
        position: 'absolute', 
        left: 0,
        right: 0, 
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});