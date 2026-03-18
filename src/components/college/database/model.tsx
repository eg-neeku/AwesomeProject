export enum Status { OPEN, INPROGRESS, DONE };

export type ComplaintDetailsProps = {
    id: string,
    buildingId: string,
    name: string,
    description: string,
    comment: string,
    priority: number,
    startDate: Date,
    imageURL: string,
    technicianId?: string,
    status?: "open" | "assigned" | "in_progress" | "resolved" | "closed";
};

export type BuildingDetailsProp = {
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    pincode: number,
    country: string,
    floors: number,
    imageURL: string
}

export type TechnicianDetailsProps = {
    id: string,
    name: string,
    emailId: string,
    phno: number
}

export type BuildingDetailsDTO = Omit<BuildingDetailsProp, "id">
export type ComplaintPropsDTO = Omit<ComplaintDetailsProps, "id">
export type TechnicianDetailsDTO = Omit<TechnicianDetailsProps, "id">


export function formatPostalAddress(address: string, pincode: number, city: string, state: string, country: string) {
    return `${address}, ${city} - ${pincode}, ${state}, ${country}.`;
}

/* Going to Navigation Pages */
export const GOTO_D_HOME_PAGE = "Home";
export const GOTO_D_FACILITY_SEARCH_PAGE = "FacilitySearch";
export const GOTO_D_MESSAGE_PAGE = "Message";
export const GOTO_D_NOTIFICATION_HISTORY_PAGE = "NotificationHistory";
export const GOTO_D_USER_PREFERNCE_PAGE = "UserPreference";
export const GOTO_D_ABOUT_PAGE = "About";
export const GOTO_D_PRIVACY_POLICY_PAGE = "PrivacyPolicy";

export const GOTO_SD_MAIN_PAGE = "MainPage";
export const GOTO_S_COMPLAINT_FORM_PAGE = "ComplaintBuilding";
export const GOTO_S_MANAGE_BUILDING_PAGE = "ManageBuilding";
export const GOTO_S_COMPLAINT_LOG_PAGE = "ComplaintLog";

export const GOTO_S_MANAGE_TECHNICIAN_PAGE = "ManageTechnician";
export const GOTO_S_TECHNICIAN_FORM_PAGE = "TechnicianForm";
export const GOTO_D_TECHNICIAN_LOG_PAGE = "TechnicianLog";
export const GOTO_S_ASSIGNED_COMPLAINT_PAGE = "AssignedComplaint";
export const GOTO_S_COMPLAINT_ASSIGN_PAGE = "ComplaintAssign";