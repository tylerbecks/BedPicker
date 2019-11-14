import React, { useState, useRef } from "react";
import { concat, uniqueId, without } from "lodash";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CircleButton from "../components/CircleButton";
import MultiAddModal from "../components/MultiAddModal";
import SelectButton from "../components/SelectButton";
import SubmitButton from "../components/SubmitButton";
import DEFAULT_GUESTS from "../constants/DefaultGuests";

const styles = StyleSheet.create({
  guestSelectButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  plusSign: {
    fontSize: 32
  }
});

export default ({ navigation }) => {
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollView = useRef(null);

  const onPressGuest = guest => {
    const newSelectedGuests = selectedGuests.includes(guest)
      ? without(selectedGuests, guest)
      : concat(selectedGuests, guest);

    setSelectedGuests(newSelectedGuests);
  };

  const onClickNext = () => {
    navigation.push("Couple", { selectedGuests });
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollView.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const addGuest = guestName => {
    const newGuest = { id: uniqueId(), name: guestName, photo: null };

    setGuests(guests.concat(newGuest));
    setSelectedGuests(concat(selectedGuests, newGuest));
    scrollToBottom();
  };

  const openModal = () => {
    setIsModalVisible(true);
    scrollToBottom();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ref={scrollView}
      >
        <Text style={styles.titleText}>Who&apos;s here?</Text>
        <View style={styles.guestSelectButtonsContainer}>
          {guests.map(guest => (
            <SelectButton
              key={guest.name}
              text={guest.name}
              photo={guest.photo}
              onPress={() => onPressGuest(guest)}
              selected={selectedGuests.includes(guest)}
            />
          ))}
          <CircleButton onPress={openModal}>
            <Text style={styles.plusSign}>+</Text>
          </CircleButton>
        </View>
        <SubmitButton
          onPress={onClickNext}
          disabled={selectedGuests.length === 0}
          text="Next"
        />
        {isModalVisible && <View style={{ height: 350 }} />}
      </ScrollView>

      <MultiAddModal
        placeholder="Guest name..."
        isVisible={isModalVisible}
        close={closeModal}
        onSubmit={addGuest}
      />
    </View>
  );
};

// class AssignmentScreen extends React.Component {
//   onPressGuest(guest) {
//     const { selectedGuests } = this.state;
//     const newSelectedGuests = selectedGuests.includes(guest)
//       ? _.without(selectedGuests, guest)
//       : _.concat(selectedGuests, guest);

//     this.setState({ selectedGuests: newSelectedGuests });
//   }

//   onClickNext() {
//     const { navigation } = this.props;
//     const { selectedGuests } = this.state;

//     navigation.push("Couple", { selectedGuests });
//   }

//   addGuest(guestName) {
//     const { selectedGuests, guests } = this.state;
//     const newGuest = { id: _.uniqueId(), name: guestName, photo: null };

//     this.setState({
//       guests: guests.concat(newGuest),
//       selectedGuests: _.concat(selectedGuests, newGuest)
//     });
//     this.scrollToBottom();
//   }

//   openModal() {
//     this.setState({ isModalVisible: true });
//     this.scrollToBottom();
//   }

//   closeModal() {
//     this.setState({ isModalVisible: false });
//   }

//   scrollToBottom() {
//     setTimeout(() => {
//       this.scrollView.scrollToEnd({ animated: true });
//     }, 100);
//   }

//   render() {
//     const { selectedGuests, guests, isModalVisible } = this.state;

//     return (
//       <View style={styles.container}>
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}
//           ref={c => {
//             this.scrollView = c;
//           }}
//         >
//           <Text style={styles.titleText}>Who&apos;s here?</Text>
//           <View style={styles.guestSelectButtonsContainer}>
//             {guests.map(guest => (
//               <SelectButton
//                 key={guest.name}
//                 text={guest.name}
//                 photo={guest.photo}
//                 onPress={() => this.onPressGuest(guest)}
//                 selected={selectedGuests.includes(guest)}
//               />
//             ))}
//             <CircleButton onPress={this.openModal}>
//               <Text style={styles.plusSign}>+</Text>
//             </CircleButton>
//           </View>
//           <SubmitButton
//             onPress={this.onClickNext}
//             disabled={selectedGuests.length === 0}
//             text="Next"
//           />
//           {isModalVisible && <View style={{ height: 350 }} />}
//         </ScrollView>

//         <MultiAddModal
//           placeholder="Guest name..."
//           isVisible={isModalVisible}
//           close={this.closeModal}
//           onSubmit={this.addGuest}
//         />
//       </View>
//     );
//   }
// }
