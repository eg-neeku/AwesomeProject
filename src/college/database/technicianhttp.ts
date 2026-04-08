import axios from "axios";
import { DB_NAME, DB_URL, TechnicianDetailsDTO, TechnicianDetailsProps, TechnicianFormProps } from "./model";

export const storeTechnicianData = async (TechnicianData: TechnicianFormProps) => {
    await axios.post(`${DB_URL}/${DB_NAME}/register.json`, TechnicianData);
};

export const fetchTechnicianData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`);
    let technicianList: TechnicianDetailsProps[] = [];
    for (const key in response.data) {
        if (response.data[key].role === "techni") {
            const technicianItem: TechnicianDetailsProps = {
                id: key,
                firstName: response.data[key].firstName,
                lastName: response.data[key].lastName,
                emailId: response.data[key].emailId,
                gender: response.data[key].gender,
                role: response.data[key].role,
                phoneNumber: response.data[key].phoneNumber
            };
            technicianList.push(technicianItem);
        }
    }
    return technicianList;
};

export const fetchTechnicianDataById = async (technicianId: string) => {
    if (!technicianId) throw new Error("Complaint not found");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register/${technicianId}.json`);
    return response.data;
};

export const updateTechnicianData = async (technicianId: string, newTechnician: TechnicianDetailsDTO) => {
    if (!technicianId) throw new Error("Complaint not found");
    return await axios.put(`${DB_URL}/${DB_NAME}/register/${technicianId}.json`, newTechnician);
};

export const deleteTechnician = async (technicianId: string) => {
    if (!technicianId) throw new Error("Complaint not found");
    return await axios.delete(`${DB_URL}/${DB_NAME}/register/${technicianId}.json`);
}