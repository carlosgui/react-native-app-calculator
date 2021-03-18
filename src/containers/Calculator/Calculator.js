import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import Button from '../../components/button/Button'
import Display from '../../components/display/Display';
import calcNumbers from '../../mocks/calculatormocks'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operationValue: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {
    state = {...initialState}

    addDigit = number => {
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        if(number === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
            return
        }
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + number
        this.setState({ displayValue, clearDisplay: false })

        if(number !== '.') {
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[this.state.current] = newValue
            this.setState({ values })
        }
    }

    clearDisplay = () => {
        this.setState({ ...initialState })
    }

    setOperator = operationValue => {
        if(this.state.current === 0) {
            this.setState({ operationValue, current: 1, clearDisplay: true })
        } else {
            const equals = operationValue === '='
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${this.state.operationValue} ${values[1]}`)
            } catch (err) {
                values[0] = this.state.values[0]
            }


            values[1] = 0
            this.setState({
                displayValue: `${values[0]}`,
                operationValue: equals ? null : operationValue,
                current: equals ? 0 : 1,
                // clearDisplay: !equals,
                clearDisplay: true,
                values,
            })
        }
    }

    selectFunctionToExecute = fnType => {
        switch(fnType) {
            case 'digit': 
                return this.addDigit
            case 'operation':
                return this.setOperator
            case 'clear':
                return this.clearDisplay

            default:
                return (() => { console.warn('ERR')})
        }
    }

    render() {
        return (
            <View style={pageStyles.container}>
                <Display displayValue={this.state.displayValue} />
                <View style={pageStyles.buttonsContainer}>
                    {calcNumbers.map((calcNum, key) => {
                        return <Button key={key} text={calcNum.value} type={calcNum.type} onPress={this.selectFunctionToExecute(calcNum.fnType)}/>
                    })}
                </View>
            </View>
        )
    }
}

const pageStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
