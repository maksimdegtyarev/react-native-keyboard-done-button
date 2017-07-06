## react-native-keyboard-done-button
Keyboard done button component for React Native.
Based on [Danleveille`s demo app](https://github.com/danleveille/react-native-input-accessory-demo) (ES2015 & React 15.5.0+ improvements).

### Installation
```sh
$ npm install react-native-keyboard-done-button --save
```

### Usage
```javascript
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import DoneButton from 'react-native-keyboard-done-button';

export default class Test extends Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#000"
          returnKeyType="next"
          defaultValue={this.phone}
        />
        <DoneButton
          title="Done!"   //not required, default value = `Done`
          style={{ backgroundColor: 'red' }}  //not required
          doneStyle={{ color: 'green' }}  //not required
        />
      </View>
    );
  }
}
```