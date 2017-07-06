import React, {Component} from 'react';
import {View, DeviceEventEmitter, Dimensions, TouchableOpacity, LayoutAnimation, StyleSheet, Text, Keyboard} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import PropTypes from 'prop-types';



const INPUT_ACCESSORY_HEIGHT = 40;
const defaultStyle = StyleSheet.create({
	Container: {
    	alignItems: 'flex-end',
    	backgroundColor: '#D2D5DB',
    	height: INPUT_ACCESSORY_HEIGHT,
		position: 'absolute',
    	left: 0,
    	right: 0
  	},
  	Text: {
    	fontSize: 17,
    	color: '#497df7',
    	backgroundColor: 'transparent',
    	paddingHorizontal: 9,
    	paddingVertical: 9
  	}
});


export default class KeyboardDoneButton extends Component {
	constructor(props) {
		super(props);

		this.windowHeight = Dimensions.get('window').height;
		this.state = {
			visibleHeight: this.windowHeight,
			opacity: 0,
			hideKA: true
		};
	}
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener("keyboardWillShow", this.keyboardWillShow.bind(this));
		this.keyboardDidHideListener = Keyboard.addListener("keyboardWillHide", this.keyboardWillHide.bind(this));
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();

		this.setState({
			visibleHeight: this.windowHeight,
			hideKA: true,
			opacity: 0
		});
	}
	keyboardWillShow(e) {
		if(this.state.hideKA) {
			LayoutAnimation.configureNext({
				duration: 500,
				create: {
					type: LayoutAnimation.Types.linear,
					property: LayoutAnimation.Properties.scaleXY
				},
				update: {
					type: LayoutAnimation.Types.linear,
					property: LayoutAnimation.Properties.scaleXY
				},
			});
		}
		this.setState({
			visibleHeight: e.endCoordinates.screenY - (INPUT_ACCESSORY_HEIGHT - 1),
			hideKA: false,
			opacity: 1
		});
	}
	rotateDevice() {
		return false;
	}
	keyboardWillHide(e) {
		this.setState({
			visibleHeight: this.windowHeight,
			hideKA: true,
			opacity: 0
		});
	}
	dismissKeyboardHandler() {
		LayoutAnimation.configureNext({
			duration: 100,
			create: {
				type: LayoutAnimation.Types.linear,
			},
			update: {
				type: LayoutAnimation.Types.linear,
			}
		});
		this.setState({
			visibleHeight: this.windowHeight,
			hideKA: true,
			opacity: 0
		});
		dismissKeyboard();
	}
	render() {
		const style = this.props.hasOwnProperty('style') ? this.props.style : {};
		const doneStyle = this.props.hasOwnProperty('doneStyle') ? this.props.doneStyle : {};

		return (
			<View style={[defaultStyle.Container, {opacity: this.state.opacity, top: this.state.visibleHeight - 1}, style]} onLayout={(e)=> this.rotateDevice(e)}>
				<TouchableOpacity onPress={() => this.dismissKeyboardHandler()}>
					<Text style={[defaultStyle.Text, doneStyle]}>{this.props.title || 'Done'}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

KeyboardDoneButton.propTypes = {
	title: PropTypes.string,
	style: PropTypes.object,
	doneStyle: PropTypes.object
}
