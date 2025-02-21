import { getBlowerTotalCost, getRawSewageTotalCost, getSludgeHoldingTankTotalCost } from '../utils/calculations';

interface BaseEquipment {
  id: string;
  name: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  type: string;
}

interface CapacityEquipment extends BaseEquipment {
  capacity: number;
}

interface VolumeEquipment extends BaseEquipment {
  Volume: number;
}

interface DiameterVolumeEquipment extends BaseEquipment {
  diameter: number;
  Volume: number;
}

interface PieceEquipment extends BaseEquipment {
  Piece: number;
}

interface SizeEquipment extends BaseEquipment {
  size: number;
}

const equipmentInitialState: Record<string, BaseEquipment | CapacityEquipment | VolumeEquipment | DiameterVolumeEquipment | PieceEquipment | SizeEquipment> = {
  "raw-sewage": {
    id: "raw-sewage",
    name: "Raw Sewage Transfer Pump",
    capacity: 0,
    quantity: 1,
    basePrice: getRawSewageTotalCost(),
    totalPrice: 15000,
    type: "pump"
  },
  "oil-skimmer": {
    id: "oil-skimmer",
    name: "Oil Skimmer",
    quantity: 1,
    basePrice: 32000,
    totalPrice: 32000,
    type: "skimmer"
  },
  "blower": {
    id: "blower",
    name: "Blower",
    capacity: 0,
    quantity: 1,
    basePrice: getBlowerTotalCost(),
    totalPrice: 31081,
    type: "blower"
  },
  "sludge-pump": {
    id: "sludge-pump",
    name: "Sludge Recirculation Pump",
    capacity: 0,
    quantity: 1,
    basePrice: getSludgeHoldingTankTotalCost(),
    totalPrice: 15000,
    type: "pump"
  },
  "filter-pump": {
    id: "filter-pump",
    name: "Filter Feed Pump",
    capacity: 0,
    quantity: 1,
    basePrice: 9621,
    totalPrice: 9621,
    type: "pump"
  },
  "multi-grade-filter": {
    id: "multi-grade-filter",
    name: "Multi Grade Filter",
    diameter: 0,
    Volume: 0,
    quantity: 1,
    basePrice: 7000,
    totalPrice: 7000,
    type: "filter"
  },
  "activated-carbon-filter": {
    id: "activated-carbon-filter",
    name: "Activated Carbon Filter",
    diameter: 0,
    Volume: 0,
    quantity: 1,
    basePrice: 7000,
    totalPrice: 7000,
    type: "filter"
  },
  "tube-media": {
    id: "tube-media",
    name: "Tube Deck Media",
    capacity: 0,
    quantity: 1,
    basePrice: 7000,
    totalPrice: 7000,
    type: "media"
  },
  "mbbr-media": {
    id: "mbbr-media",
    name: "MBBR Media",
    Volume: 0,
    quantity: 1,
    basePrice: 19000,
    totalPrice: 19000,
    type: "media"
  },
  "diffuser-course": {
    id: "diffuser-course",
    name: "Diffuser (Course)",
    Piece: 0,
    quantity: 1,
    basePrice: 800,
    totalPrice: 800,
    type: "diffuser"
  },
  "diffuser-fine": {
    id: "diffuser-fine",
    name: "Diffuser (Fine)",
    Piece: 0,
    quantity: 1,
    basePrice: 700,
    totalPrice: 700,
    type: "diffuser"
  },
  "flow-meter": {
    id: "flow-meter",
    name: "Inlet and Outlet Flow Meter",
    size: 0,
    quantity: 1,
    basePrice: 23000,
    totalPrice: 23000,
    type: "meter"
  },
  "hypo-dosing": {
    id: "hypo-dosing",
    name: "Hypo Dosing with Tank",
    quantity: 1,
    basePrice: 12000,
    totalPrice: 12000,
    type: "dosing"
  },
  "uv-system": {
    id: "uv-system",
    name: "UV System Without Analyser",
    capacity: 0,
    quantity: 1,
    basePrice: 1000,
    totalPrice: 1000,
    type: "treatment"
  },
  "ozonator": {
    id: "ozonator",
    name: "Ozonator",
    capacity: 0,
    quantity: 1,
    basePrice: 1000,
    totalPrice: 1000,
    type: "treatment"
  },
  "ultra-filtration": {
    id: "ultra-filtration",
    name: "Ultra Filtration System",
    capacity: 0,
    quantity: 1,
    basePrice: 1000,
    totalPrice: 1000,
    type: "filtration"
  },
  "piping": {
    id: "piping",
    name: "Piping and Fitting",
    quantity: 1,
    basePrice: 80000,
    totalPrice: 80000,
    type: "infrastructure"
  },
  "cable": {
    id: "cable",
    name: "Cable and Cable Tray",
    quantity: 1,
    basePrice: 35000,
    totalPrice: 35000,
    type: "infrastructure"
  },
  "panel": {
    id: "panel",
    name: "Panel",
    quantity: 1,
    basePrice: 70000,
    totalPrice: 70000,
    type: "infrastructure"
  },
  "installation": {
    id: "installation",
    name: "Installation",
    quantity: 1,
    basePrice: 40000,
    totalPrice: 40000,
    type: "service"
  },
  "commissioning": {
    id: "commissioning",
    name: "Commissioning and Handover",
    quantity: 1,
    basePrice: 70000,
    totalPrice: 70000,
    type: "service"
  },
};

export default equipmentInitialState; 