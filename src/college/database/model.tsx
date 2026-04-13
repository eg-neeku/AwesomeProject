import { Linking } from "react-native";

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
};

export type RegisterProps = {
    id?: string,
    profilePic?: string,
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    phoneNumber: number,
    gender: string,
    role: "admin" | "user" | "techni"
};

export type BuildingDetailsDTO = Omit<BuildingDetailsProp, "id">;
export type ComplaintPropsDTO = Omit<ComplaintDetailsProps, "id">;
export type RegisterDTOProps = Omit<RegisterProps, "password">;
export type LoginProps = Pick<RegisterProps, "emailId" | "password">;
export type TechnicianFormProps = RegisterProps;
export type TechnicianDetailsProps = RegisterDTOProps;
export type TechnicianDetailsDTO = Omit<TechnicianDetailsProps, "id">;

export type AuthContentProps = {
    authItems: RegisterDTOProps,
    token: string
};

export function doNothing(...params: any[]) { };

export function formatPostalAddress(address: string, pincode: number, city: string, state: string, country: string) {
    return `${address}, ${city} - ${pincode}, ${state}, ${country}.`;
}

export function checkPasswordRequirement(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10}$/;
    return regex.test(password);
}

export async function sendEmail(to: string = "", subject: string, body: string, cc?: string, bcc?: string) {
    if (!to || !subject || !body) return;
    const queries = new URLSearchParams({
        subject: subject,
        body: body
    });

    cc && queries.append('cc', cc);
    bcc && queries.append('bcc', bcc);

    const params = queries.toString();

    const url = `mailto:${to}?${params}`;
    await Linking.openURL(url);
};

/* Going to Navigation Pages */
export const GOTO_D_HOME_PAGE = "Home";
export const GOTO_D_FACILITY_SEARCH_PAGE = "FacilitySearch";
export const GOTO_D_MESSAGE_PAGE = "Message";
export const GOTO_D_NOTIFICATION_HISTORY_PAGE = "NotificationHistory";
export const GOTO_D_MY_PROFILE_PAGE = "MyProfile";
export const GOTO_D_ABOUT_PAGE = "About";
export const GOTO_D_PRIVACY_POLICY_PAGE = "PrivacyPolicy";
export const GOTO_D_COMPLAINT_LIST_PAGE = "ComplaintList";

export const GOTO_SD_MAIN_PAGE = "MainPage";
export const GOTO_S_COMPLAINT_FORM_PAGE = "ComplaintBuilding";
export const GOTO_S_MANAGE_BUILDING_PAGE = "ManageBuilding";
export const GOTO_S_COMPLAINT_LOG_PAGE = "ComplaintLog";

export const GOTO_S_MANAGE_TECHNICIAN_PAGE = "ManageTechnician";
export const GOTO_S_TECHNICIAN_FORM_PAGE = "TechnicianForm";
export const GOTO_D_TECHNICIAN_LOG_PAGE = "TechnicianLog";
export const GOTO_S_ASSIGNED_COMPLAINT_PAGE = "AssignedComplaint";
export const GOTO_S_COMPLAINT_ASSIGN_PAGE = "ComplaintAssign";
export const GOTO_S_COMPLAINT_IN_DETAIL_PAGE = "ComplaintInDetail";
export const GOTO_S_LOGIN_PAGE = "Login";
export const GOTO_S_REGISTER_PAGE = "Registration";
export const GOTO_S_FORGOT_PASSWORD_PAGE = "ForgotPassword";

export const ASYNC_STORAGE_EMAIL_ID = "EMAIL_ID";
export const ASYNC_STORAGE_APP_TOKEN = "APP_TOKEN";

export const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
export const DB_NAME = "COLLEGEAPP";