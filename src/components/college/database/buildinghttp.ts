import axios from "axios";
import { BuildingDetailsDTO, BuildingDetailsProp } from "./model";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
const DB_NAME = "COLLEGEAPP";

export const storeBuildingData = async (buildingData: BuildingDetailsDTO) => {
    try {
        const response = await axios.post(`${DB_URL}/${DB_NAME}/building.json`, buildingData);
        const id = response.data.name;
        return id;
    } catch (error) {
        console.log("Unable to insert data", error);
    }
}

export const fetchBuildingData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/building.json`);
    const buildingData: BuildingDetailsProp[] = [];
    for (const key in response.data) {
        const buildingItem: BuildingDetailsProp = {
            id: key,
            name: response.data[key].name,
            location: response.data[key].location,
        }
        buildingData.push(buildingItem);
    }
    return buildingData;
}

export const fetchBuildingDataById = async (buildingId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/building/${buildingId}.json`);
    return response.data;
}

export const updateBuildingData = async (id: string, newbuilding: BuildingDetailsDTO) => {
    return await axios.put(`${DB_URL}/${DB_NAME}/building/${id}.json`, newbuilding);
}

export const deleteBuildingData = async (id: string) => {
    return await axios.delete(`${DB_URL}/${DB_NAME}/building/${id}.json`);
}