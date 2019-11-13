import _ from "lodash";
import Sleeper from "./classes/Sleeper";
import SleeperCouple from "./classes/SleeperCouple";

export default (guests, coupledGuestsIdMap) => {
  const guestsCopy = guests.slice();
  const couples = [];

  _.each(coupledGuestsIdMap, (guestId1, guestId2) => {
    const [guest1, guest2] = _.remove(
      guestsCopy,
      g => g.id === guestId1 || g.id === guestId2
    );
    if (!guest1) {
      throw Error(`expected to find guest with id: ${guest1.id}`);
    }
    if (!guest2) {
      throw Error(`expected to find guest with id: ${guest2.id}`);
    }
    couples.push(new SleeperCouple(guest1, guest2));
  });

  const singleSleepers = _.map(guestsCopy, g => new Sleeper(g));
  return couples.concat(singleSleepers);
};
