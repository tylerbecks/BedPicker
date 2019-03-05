import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
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

  isAddButtonDisabled = () => this.state.text.length === 0;

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
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={this.props.placeholder}
            value={this.state.text}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={this.handleSubmitEditing}
            style={styles.addButton}
            disabled={this.isAddButtonDisabled()}
          >
            <Text
              style={
                this.isAddButtonDisabled()
                  ? styles.addButtonTextDisabled
                  : styles.addButtonText
              }
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'flex-end'
  },
  addButtonText: {
    color: '#14aaf5',
    fontSize: 16
  },
  addButtonTextDisabled: {
    color: '#b7bfc6',
    fontSize: 16
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '50%',
    padding: 20
  },
  textInput: {
    marginBottom: 10
  }
});
