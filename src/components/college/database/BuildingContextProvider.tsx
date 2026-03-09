import React, { createContext, useReducer } from "react";
import { BuildingDetailsDTO, BuildingDetailsProp } from "./model";

type BuildingContextProp = {
    buildingData: BuildingDetailsProp[],
    setBuildingData: (buildingData: BuildingDetailsProp[]) => void,
    addBuilding: ({ id, name, location }: BuildingDetailsProp) => void,
    removeBuilding: (id: string) => void,
    updateBuilding: (id: string, { name, location }: BuildingDetailsDTO) => void,
}

export const BuildingContext = createContext<BuildingContextProp>({
    buildingData: [],
    setBuildingData: () => { },
    addBuilding: () => { },
    removeBuilding: () => { },
    updateBuilding: () => { },
});

type ActionProp =
    | { type: "ADD", payload: BuildingDetailsProp }
    | { type: "SET", payload: BuildingDetailsProp[] }
    | {
        type: "UPDATE", payload: {
            id: BuildingDetailsProp["id"],
            data: Partial<BuildingDetailsDTO>
        }
    }
    | { type: "DELETE", payload: BuildingDetailsProp["id"] };

const buildingReducer = (state: BuildingDetailsProp[], action: ActionProp): BuildingDetailsProp[] => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload.reverse();
        case "UPDATE":
            const updateAtIndex = state.findIndex(buildingItem => buildingItem.id === action.payload.id);
            const selectedItemForUpdate = state[updateAtIndex];
            const newBuildingItem = { ...selectedItemForUpdate, ...action.payload.data };
            const updatedBuilding = [...state];
            updatedBuilding[updateAtIndex] = newBuildingItem;
            return updatedBuilding;
        case "DELETE":
            return state.filter(buildingItem => buildingItem.id !== action.payload);
        default:
            return state;
    }
}

export default function BuildingContextProvider({ children }: { children: React.ReactNode }) {
    const [buildingState, dispatch] = useReducer(buildingReducer, []);

    const setBuildingData = (buildingData: BuildingDetailsProp[]) => {
        dispatch({ type: "SET", payload: buildingData });
    }

    const addBuilding = (buildingItem: BuildingDetailsProp) => {
        dispatch({ type: "ADD", payload: buildingItem });
    }

    const removeBuilding = (id: string) => {
        dispatch({ type: "DELETE", payload: id });
    }

    const updateBuilding = (id: string, buildingItemDTO: BuildingDetailsDTO) => {
        dispatch({
            type: "UPDATE", payload: {
                id: id,
                data: buildingItemDTO
            }
        });
    }

    const value: BuildingContextProp = {
        buildingData: buildingState,
        setBuildingData: setBuildingData,
        addBuilding: addBuilding,
        removeBuilding: removeBuilding,
        updateBuilding: updateBuilding,
    };

    return (
        <BuildingContext.Provider value={value}>{children}</BuildingContext.Provider>
    )
}