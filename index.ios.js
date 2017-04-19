import React from 'react';
import {Text, View, AppRegistry, StyleSheet, TouchableHighlight} from 'react-native';
const formatTime = require('minutes-seconds-milliseconds');

const StopWatch = React.createClass({
    getInitialState(){
        return {
            timeElapsed: null
        }
    },
    render() {
        return <View style={styles.container}>
            <View style={[styles.header, this.border('yellow')]}>
                <View style={[this.border('red'), styles.timerWrapper]}>
                    <Text style={styles.timer}>
                        {formatTime(this.state.timeElapsed)}
                    </Text>
                </View>
                <View style={[this.border('green'), styles.buttonWrapper]}>
                    {this.startStopButton()}
                    {this.lapButton()}
                </View>
            </View>

            <View style={[styles.footer, this.border('blue')]}>
                <Text>
                    Blue box
                </Text>
            </View>
        </View>

    },
    startStopButton() {
        return <TouchableHighlight
            underlayColor='gray'
            style={styles.button}
            onPress={this.handleStartPress}>
            <Text>
                Start
            </Text>
        </TouchableHighlight>
    },

    handleStartPress() {
        const startTime = new Date();

        setInterval(() => {
            this.setState({
                timeElapsed: new Date() - startTime
            });
        }, 30);
    },

    lapButton() {
        return <View style={styles.button}>
            <Text>
                Lap
            </Text>
        </View>
    },
    border(color){
        return {
            borderColor: color,
            borderWidth: 4
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,  // fill the entire screen
        alignItems: 'stretch',
    },
    header: { // Yellow
        flex: 1
    },
    footer: { // Blue
        flex: 1
    },
    timerWrapper: { // Red
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper: { // Green
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timer: {
        fontSize: 60
    },
    button: {
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);