import axios from "axios";
import { ComplaintDetailsProps, ComplaintPropsDTO, DB_NAME, DB_URL } from "./model";

export const storeComplaintData = async (complaintData: ComplaintPropsDTO) => {
    await axios.post(`${DB_URL}/${DB_NAME}/complaint.json`, complaintData);
};

export const fetchComplaintData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        const complaintItem: ComplaintDetailsProps = {
            id: key,
            buildingId: response.data[key].buildingId,
            name: response.data[key].name,
            description: response.data[key].description,
            comment: response.data[key].comment,
            priority: response.data[key].priority,
            imageURL: response.data[key].imageURL,
            startDate: new Date(response.data[key].startDate)
        };
        complaintList.push(complaintItem);
    }
    return complaintList;
};

export const fetchComplaintDataById = async (complaintId: string) => {
    if (!complaintId) throw new Error("Complaint id is empty");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`);
    return response.data;
}

export const deleteComplaintData = async (complaintId: string) => {
    return await axios.delete(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`);
}

export const fetchComplaintDataByBuilding = async (buildingId: string) => {
    if (!buildingId) throw new Error("Building Id empty");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        if (response.data[key].buildingId === buildingId) {
            const complaintItem: ComplaintDetailsProps = {
                id: key,
                buildingId: response.data[key].buildingId,
                name: response.data[key].name,
                description: response.data[key].description,
                comment: response.data[key].comment,
                priority: response.data[key].priority,
                imageURL: response.data[key].imageURL,
                startDate: new Date(response.data[key].startDate)
            };
            complaintList.push(complaintItem);
        }
    }
    return complaintList;
};

export const assignComplaintToTechnician = async (complaintId: string, technicianId: string, status: string) => {
    if (!technicianId) throw new Error("Technician Id is empty");
    await axios.patch(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`, { technicianId: technicianId, status: status });
};

export const getAssignedComplaintToTechnician = async (technicianId: string) => {
    if (!technicianId) throw new Error("Technician Id is empty");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`, {
        params: {
            orderBy: '"technicianId"',
            equalTo: `"${technicianId}"`
        }
    });
    if (!response.data) return [];
    const assignedComplaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        assignedComplaintList.push({
            id: key,
            buildingId: response.data[key].buildingId,
            name: response.data[key].name,
            description: response.data[key].description,
            comment: response.data[key].comment,
            priority: response.data[key].priority,
            startDate: new Date(response.data[key].startDate),
            imageURL: response.data[key].imageURL,
            status: response.data[key].status
        });
    }
    return assignedComplaintList;
};

export const updateComplaintStatus = async (complaintId: ComplaintDetailsProps["id"], status: ComplaintDetailsProps["status"]) => {
    if (!status) throw new Error("Status not selected");
    await axios.patch(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`, { status: status });
}