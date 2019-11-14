import React, { useState, useEffect, useRef } from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

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

export default ({ onSubmit, isVisible, close, placeholder }) => {
  const [text, setText] = useState("");
  const textInput = useRef(null);

  const handleInputBlur = () => {
    if (!textInput.current) {
      return;
    }
    if (!isVisible) {
      textInput.current.blur();
      return;
    }

    setTimeout(() => {
      textInput.current.focus();
    }, 20);
  };

  useEffect(() => {
    handleInputBlur();
  });

  const handleSubmitEditing = () => {
    onSubmit(text);
    setText("");
  };

  const handleChangeText = newText => {
    setText(newText);
  };

  const isAddButtonDisabled = () => text.length === 0;

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
          ref={textInput}
          autoCapitalize="words"
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          placeholder={placeholder}
          value={text}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={handleSubmitEditing}
          style={styles.addButton}
          disabled={isAddButtonDisabled()}
        >
          <Text
            style={
              isAddButtonDisabled()
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
};
