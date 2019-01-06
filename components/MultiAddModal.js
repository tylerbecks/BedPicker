import React from 'react';
import _ from 'lodash';
import { StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

export default class MultiAddModal extends React.Component {
  state = {
    text: ''
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isVisible && this._textInput) {
      this._textInput.blur();
    }

    if (nextProps.isVisible) {
      setTimeout(() => {
        this._textInput.focus();
      }, 20);
    }
  }

  handleSubmitEditing = () => {
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.close}
        onSwipe={this.props.close}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <TextInput
            ref={c => (this._textInput = c)}
            autoCapitalize="words"
            // autoFocus
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={this.props.placeholder}
            value={this.state.text}
            style={styles.textInput}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: '50%',
    padding: 20
  },
  textInput: {
    marginBottom: 10
  }
});
