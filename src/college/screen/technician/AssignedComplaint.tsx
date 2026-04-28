import GetMyComplaints from "./GetMyComplaints";

export default function AssignedComplaint({ route }: any) {
    const selectedTechnicianIdByAdmin: string = route?.params?.technicianId;

    return <GetMyComplaints selectedTechnicianId={selectedTechnicianIdByAdmin} />
}