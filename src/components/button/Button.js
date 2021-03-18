import React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native'


const filterButtonStyle = type => {
    let style = [pageStyles.button]
    switch(type) {
        case 'opr':
            style.push(pageStyles.buttonOperation)
            break
        case 'double':
            style.push(pageStyles.buttonDouble)
            break
        case 'triple':
            style.push(pageStyles.buttonTriple)
            break
        default:
            style = [pageStyles.button]
            break
    }

    return style
}

export default props => {
    const buttonFilteredStyle = filterButtonStyle(props.type)
    return (
        <TouchableHighlight onPress={() => props.onPress(props.text)}>
            <Text style={buttonFilteredStyle}>{props.text}</Text>
        </TouchableHighlight>
    )
}

const pageStyles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    buttonOperation: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
})
