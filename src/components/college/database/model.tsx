export type ComplaintProps = {
    id: string,
    buildingId: string,
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
export type ComplaintPropsDTO = Omit<ComplaintProps, "id">