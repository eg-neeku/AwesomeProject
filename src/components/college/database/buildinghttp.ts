import axios from "axios";
import { BuildingDetailsDTO, BuildingDetailsProp } from "./model";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
const DB_NAME = "COLLEGEAPP";

export const storeBuildingData = async (buildingData: BuildingDetailsDTO) => {
    const response = await axios.post(`${DB_URL}/${DB_NAME}/building.json`, buildingData);
    const id = response.data.name;
    return id;
}

export const fetchBuildingData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/building.json`);
    const buildingData: BuildingDetailsProp[] = [];
    for (const key in response.data) {
        const buildingItem: BuildingDetailsProp = {
            id: key,
            name: response.data[key].name,
            address: response.data[key].address,
            city: response.data[key].city,
            state: response.data[key].state,
            pincode: response.data[key].pincode,
            country: response.data[key].country,
            floors: response.data[key].floors,
            imageURL: response.data[key].imageURL
        }
        buildingData.push(buildingItem);
    }
    return buildingData;
}

export const fetchBuildingDataById = async (buildingId: string) => {
    if(!buildingId) throw new Error("Building id is empty");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/building/${buildingId}.json`);
    return response.data;
}

export const updateBuildingData = async (id: string, newbuilding: BuildingDetailsDTO) => {
    if(!id) throw new Error("Id is empty");
    return await axios.put(`${DB_URL}/${DB_NAME}/building/${id}.json`, newbuilding);
}

export const deleteBuildingData = async (id: string) => {
    if(!id) throw new Error("Id is empty");
    return await axios.delete(`${DB_URL}/${DB_NAME}/building/${id}.json`);
}