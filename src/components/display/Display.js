import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'


export default props => {
    return (
        <View style={pageStyles.display}>
            <Text numberOfLines={1} style={pageStyles.displayText}>{props.displayValue}</Text>
        </View>
    )
}

const pageStyles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.6)',
        alignItems: 'flex-end'
    },
    displayText: {
        fontSize: 60,
        color: '#fff'
    }
})
