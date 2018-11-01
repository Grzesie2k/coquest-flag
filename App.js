import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

export default class App extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      scores: [0, 0],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateScore(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const pauseButton = null != this.state.owner ? (
        <TouchableNativeFeedback onPress={() => this.setState({owner: null})}>
          <View style={{
            position: 'absolute',
            top: '45%',
            left: '40%',
            backgroundColor: '#000',
          }}>
            <Text style={{color: '#FFF', fontSize: 50}}>
              Stop
            </Text>
          </View>
        </TouchableNativeFeedback>
    ) : null;

    const teamButton = (owner, backgroundColor) => (
        <TouchableNativeFeedback onPress={() => this.setState({owner})}>
          <View style={{
            backgroundColor,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{color: '#FFF', fontSize: 100}}>
              {this.state.scores[owner]}
            </Text>
          </View>
        </TouchableNativeFeedback>
    );

    return (
        <View style={{flex: 1}}>
          {teamButton(0, 'blue')}
          {teamButton(1, 'red')}
          {pauseButton}
        </View>
    );
  }

  updateScore() {
    this.setState((state) => {
      if (null == state.owner) {
        return state;
      }
  const scores = [...state.scores];
      scores[state.owner]++;

      return {...state, scores};
    });
  }
}

