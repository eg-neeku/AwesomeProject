import { useContext } from "react";
import { AuthContext } from "../../database/AuthContentProvider";
import GetMyComplaints from "./GetMyComplaints";

export default function ComplaintList() {
    const { authItems } = useContext(AuthContext);
    const myTechnicianId: string = authItems.id ?? "";

    return (
        <GetMyComplaints selectedTechnicianId={myTechnicianId} />
    )
}
