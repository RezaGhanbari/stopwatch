import React from 'react';
import {Text, View, AppRegistry, StyleSheet, TouchableHighlight} from 'react-native';
const formatTime = require('minutes-seconds-milliseconds');

const StopWatch = React.createClass({
    getInitialState(){
        return {
            timeElapsed: null,
            running: false,
            startTime: null
        }
    },
    render() {
        return <View style={styles.container}>
            <View style={[styles.header]}>
                <View style={[styles.timerWrapper]}>
                    <Text style={styles.timer}>
                        {formatTime(this.state.timeElapsed)}
                    </Text>
                </View>
                <View style={[styles.buttonWrapper]}>
                    {this.startStopButton()}
                    {this.lapButton()}
                </View>
            </View>

            <View style={[styles.footer]}>
                <Text>
                    list of laps
                </Text>
            </View>
        </View>

    },
    startStopButton() {

        const style = this.state.running ? styles.stopButton : styles.startButton;

        return <TouchableHighlight
            underlayColor='gray'
            style={[styles.button, style]}
            onPress={this.handleStartPress}>
            <Text>
                {this.state.running ? 'Stop' : 'Start'}
            </Text>
        </TouchableHighlight>
    },

    handleStartPress() {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({running: false});
            return
        }

        const startTime = new Date();
        this.setState({
            startTime: new Date()
        });

        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });
        }, 30);
    },

    lapButton() {
        return <TouchableHighlight
            style={styles.button}
            underlayColor='gray'
            onPress={this.handleLapPress}>
            <Text>
                Lap
            </Text>
        </TouchableHighlight>
    },
    handleLapPress(){
        const lap = this.state.timeElapsed;
        this.setState({
            startTime: new Date()
        });

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
    },
    startButton: {
        borderColor: '#00CC00'
    },
    stopButton: {
        borderColor: '#CC0000'
    }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);