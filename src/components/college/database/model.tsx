export type TaskProps = {
    name: string,
    description: string,
    comment: string,
    priority: number,
    startDate: Date
};

export type BuildingDetailsProp = {
    id: string,
    name: string,
    location: string
}

export type BuildingDetailsDTO = Omit<BuildingDetailsProp, "id">

export const BUILDING_DATA: BuildingDetailsProp[] = [
    {
        id: "a",
        name: "BuildingA",
        location:"Mangaluru"
    },
    {
        id: "b",
        name: "BuildingB",
        location:"Bengaluru"
    }
];