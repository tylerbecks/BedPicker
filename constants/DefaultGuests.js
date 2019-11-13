import { uniqueId } from "lodash";
import AaronImage from "../assets/images/aaron.jpg";
import BarakImage from "../assets/images/barak.jpg";
import CherylImage from "../assets/images/cheryl.jpg";
import DaielImage from "../assets/images/daniel.jpg";
import JeremyImage from "../assets/images/jeremy.jpg";
import JoshImage from "../assets/images/josh.jpg";
import NoahImage from "../assets/images/noah.jpg";
import RajImage from "../assets/images/raj.jpg";
import TylerImage from "../assets/images/tyler.jpg";

export default Object.freeze([
  { id: uniqueId(), name: "Aaron", photo: AaronImage },
  { id: uniqueId(), name: "Barak", photo: BarakImage },
  { id: uniqueId(), name: "Cheryl", photo: CherylImage },
  { id: uniqueId(), name: "Daniel", photo: DaielImage },
  { id: uniqueId(), name: "Jeremy", photo: JeremyImage },
  { id: uniqueId(), name: "Josh", photo: JoshImage },
  { id: uniqueId(), name: "Noah", photo: NoahImage },
  { id: uniqueId(), name: "Raj", photo: RajImage },
  { id: uniqueId(), name: "Tyler", photo: TylerImage }
]);
