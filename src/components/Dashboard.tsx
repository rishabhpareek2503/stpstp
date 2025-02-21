"use client"

import React, { useState, useEffect } from "react"
import UserInfo from "./UserInfo"
import PlantInfo from "./PlantInfo"
import TankInfo from "./TankInfo"
import EquipmentList from "./EquipmentList"
import TotalCost from "./TotalCost"
import Sidebar from "./Sidebar"
import {updateDynamicCapacities } from "../utils/calculations"
import { TankData } from "../types/TankData"
import * as TankCalculation from "../utils/TankCalculation"
import { PlantData } from "../types/PlantData"
import type { Equipment } from '../types/equipment'
import equipmentInitialState from '../data/equipmentInitialState'

// Define fixed cost components
const FIXED_COST_COMPONENTS = ['commissioning', 'installation', 'panel', 'cable', 'piping'];

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  const [plantData, setPlantData] = useState<PlantData>({
    type: "STP",
    capacity: 0,
    BOD: 0,
    COD: 0,
    TSS: 0,
    pH: 0,
    OilGrease: 0,
    Nitrogen: 0,
    PeakFlow: 0,
  });


  const [tankData, setTankData] = useState<TankData>({
    type: "STP",
    BarScreen: 0,
    OilGreaseTank: 0,
    EqualizationTank: 0,
    AnoxicTank: 0,
    MBBRTank: 0,
    TubeSettle: 0,
    FilterFeedTank: 0,
    TreatedWaterTank: 0,
    UFWaterTank: 0,
    SludgeHoldingTank: 0,
    volume: 0,
    breath: {
      barScreen: 0,
      oilGrease: 0,
      equalization: 0,
      anoxic: 0,
      mbbr: 0,
      tubeSettle: 0,
      filterFeed: 0,
      treatedWater: 0,
      uf: 0,
      sludge: 0,
    },
    length: 3,
    height: 3,
  })

  const [equipmentData, setEquipmentData] = useState<Record<string, Equipment>>(equipmentInitialState)
  const [totalCost, setTotalCost] = useState(0);
  

  const isSTP = plantData.type === "STP"

  // Update equipment data when plant data changes
  useEffect(() => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
  }, [plantData])

  // Update tank calculations when plant data changes
  useEffect(() => {
    if (plantData.capacity <= 0) return

    const flowRate = TankCalculation.calculateFlowRate(plantData.capacity)
    const peakFlow = plantData.PeakFlow || flowRate * 1.5

    const updatedTankData: TankData = {
      ...tankData,
      BarScreen: TankCalculation.calculateBarScreenVolume(flowRate, peakFlow),
      OilGreaseTank: TankCalculation.calculateOilGreaseVolume(flowRate, peakFlow),
      EqualizationTank: TankCalculation.calculateEqualizationTankVolume(flowRate),
      AnoxicTank: TankCalculation.calculateAnoxicTankVolume(flowRate),
      MBBRTank: TankCalculation.calculateMBBRTankVolume(plantData.capacity, plantData.BOD),
      TubeSettle: TankCalculation.calculateTubeSettleVolume(flowRate),
      FilterFeedTank: TankCalculation.calculateFilterFeedTankVolume(flowRate),
      TreatedWaterTank: TankCalculation.calculateTreatedWaterTankVolume(flowRate),
      UFWaterTank: TankCalculation.calculateUFWaterTankVolume(flowRate),
      SludgeHoldingTank: TankCalculation.calculateSludgeHoldingTankVolume(
        plantData.capacity,
        plantData.BOD,
        plantData.TSS
      ),
    }

    setTankData(updatedTankData)
    updateEquipmentPrices(updatedTankData)
  }, [plantData])

  const updateEquipmentPrices = (updatedTankData: TankData) => {
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData)
    setEquipmentData(updatedEquipment)
    const newTotalCost = Object.values(updatedEquipment).reduce((sum: number, item) => {
      const equipment = item as { basePrice?: number; quantity?: number };
      return sum + (equipment.basePrice || 0) * (equipment.quantity || 1);
    }, 0);
    setTotalCost(newTotalCost);
  }

  const handleUserDataChange = (newData: Partial<typeof userData>) => {
    setUserData((prev: typeof userData) => ({ ...prev, ...newData }))
  }

  const handlePlantDataChange = (newPlantData: any) => {
    setPlantData(newPlantData);
    
    // Update equipment data with new calculations
    const updatedEquipmentData = updateDynamicCapacities(newPlantData, equipmentData);
    setEquipmentData(updatedEquipmentData);
  
    // Update total cost
    const newTotalCost = Object.values(updatedEquipmentData).reduce((sum: number, item) => {
      const equipment = item as { basePrice?: number; quantity?: number };
      return sum + (equipment.basePrice || 0) * (equipment.quantity || 1);
    }, 0);
    setTotalCost(newTotalCost);
  };

  const handleEquipmentDataChange = (id: string, quantity: number) => {
    // Don't update quantity for fixed cost components
    if (FIXED_COST_COMPONENTS.includes(id)) {
      return;
    }

    // Create a copy of the current equipment data
    const updatedEquipmentData = { ...equipmentData };
    
    // Update the quantity and recalculate total price for non-fixed components
    if (updatedEquipmentData[id]) {
      updatedEquipmentData[id] = {
        ...updatedEquipmentData[id],
        quantity: quantity,
        totalPrice: updatedEquipmentData[id].basePrice * quantity
      };
    }
    
    // Update the state with new equipment data
    setEquipmentData(updatedEquipmentData);

    // Calculate total cost excluding fixed components
    const newTotalCost = Object.entries(updatedEquipmentData).reduce((sum, [key, item]) => {
      if (!FIXED_COST_COMPONENTS.includes(key)) {
        return sum + ((item as Equipment).totalPrice || 0);
      }
      return sum;
    }, 0);
    
    setTotalCost(newTotalCost);
  };

  // Update equipment data when plant data changes
  useEffect(() => {
    if (plantData.capacity <= 0) return;

    // Update equipment with new calculations
    const updatedEquipment = updateDynamicCapacities(plantData, equipmentData);
    
    // Preserve quantities while updating prices
    const equipmentWithPreservedQuantities = Object.entries(updatedEquipment).reduce<Record<string, Equipment>>((acc, [key, item]) => {
      const currentQuantity = equipmentData[key]?.quantity || 1;
      return {
        ...acc,
        [key]: {
          ...(item as Equipment),
          quantity: currentQuantity,
          totalPrice: (item as Equipment).basePrice * currentQuantity
        }
      };
    }, {});

    setEquipmentData(equipmentWithPreservedQuantities);

    // Update total cost
    const newTotalCost = Object.values(equipmentWithPreservedQuantities).reduce((sum, item) => {
      return sum + (item.totalPrice || 0);
    }, 0);
    
    setTotalCost(newTotalCost);
  }, [plantData]);

  const resetDashboard = () => {
    // Reset to initial states
    setPlantData({
      type: 'STP', // Add missing required type field
      capacity: 0,
      PeakFlow: 0,
      BOD: 0,
      COD: 0,
      TSS: 0,
      pH: 0,
      OilGrease: 0,
      Nitrogen: 0,
    });
    // Reset equipment data to clean initial state
    const cleanEquipmentData = Object.entries(equipmentData).reduce<Record<string, any>>((acc, [key, item]: [string, any]) => {
      acc[key] = {
        name: item.name,
        quantity: 1,
        basePrice: 0,
        totalPrice: item.totalPrice || 0,
        ...(item.capacity !== undefined && { capacity: item.capacity }),
        ...(item.Volume !== undefined && { Volume: item.Volume }),
        ...(item.diameter !== undefined && { diameter: item.diameter }),
      };
      return acc;
    }, {});
    
    setEquipmentData(cleanEquipmentData);
    setTotalCost(0);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plant Price Calculator</h1>
            <p className="text-gray-500 mt-2">
              Calculate and generate detailed price estimates for water treatment plants
            </p>
          </div>

          <UserInfo userData={userData} onDataChange={handleUserDataChange} />
          <PlantInfo plantData={plantData} onDataChange={handlePlantDataChange} />
          
          {isSTP && (
            <>
              <TankInfo tankData={tankData} />
              <EquipmentList
                equipmentData={equipmentData}
                plantData={plantData}
                onDataChange={handleEquipmentDataChange}
              />
              <TotalCost
                totalCost={totalCost} 
                userData={userData} 
                plantData={plantData} 
                equipmentData={equipmentData}
                tankData={tankData}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard