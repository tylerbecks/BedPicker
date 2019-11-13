import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
  addButton: {
    alignItems: "flex-end"
  },
  addButtonText: {
    color: "#14aaf5",
    fontSize: 16
  },
  addButtonTextDisabled: {
    color: "#b7bfc6",
    fontSize: 16
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "50%",
    padding: 20
  },
  textInput: {
    marginBottom: 10
  }
});

export default class MultiAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isVisible && this.textInput) {
      this.textInput.blur();
    }

    if (nextProps.isVisible) {
      setTimeout(() => {
        this.textInput.focus();
      }, 20);
    }
  }

  handleSubmitEditing() {
    const { onSubmit } = this.props;
    const { text } = this.state;

    onSubmit(text);
    this.setState({ text: "" });
  }

  handleChangeText(text) {
    this.setState({ text });
  }

  isAddButtonDisabled() {
    const { text } = this.state;

    return text.length === 0;
  }

  render() {
    const { isVisible, close, placeholder } = this.props;
    const { text } = this.state;

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={close}
        onSwipe={close}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <TextInput
            ref={c => {
              this.textInput = c;
            }}
            autoCapitalize="words"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={placeholder}
            value={text}
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
