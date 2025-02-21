export interface EquipmentData {
    name: string
    capacity?: number
    diameter?: number
    Volume?: number
    size?: number
    quantity: number
    costPerCapacity: number
    costPerDiameter: number
    costPerVolume: number
    costPerPiece: number
    costPerFlow: number
    totalPrice: number
  }
  

  export interface BaseEquipment {
    id: string;
    name: string;
    quantity: number;
    basePrice: number;
    totalPrice: number;
    type: string;
  }
  
  export interface Equipment {
    id: string;
    name: string;
    quantity: number;
    basePrice: number;
    totalPrice: number;
    type: string;
    capacity?: number;
    Volume?: number;
    diameter?: number;
    Piece?: number;
    size?: number;
  }
  
  