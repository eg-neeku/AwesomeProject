
export type BusProps = {
    busName: string,
    timings: string
}

export const BUS_DETAILS_UTK: BusProps[] = [];

export const BUS_DETAILS_KTU: BusProps[] = [
    {
        busName: "LULU",
        timings: "07:05am"
    },
    {
        busName: "LULU",
        timings: "06:50pm"
    },
    {
        busName: "Kadiyali",
        timings: "07:40am"
    },
    {
        busName: "Kadiyali",
        timings: "02:25pm"
    },
    {
        busName: "Kadiyali",
        timings: "07:00pm"
    },
    {
        busName: "Sri Ganesh",
        timings: "08:20am"
    },
    {
        busName: "Sri Ganesh",
        timings: "09:15am"
    },
    {
        busName: "Sri Ganesh",
        timings: "01:40pm"
    },
    {
        busName: "Sri Ganesh",
        timings: "07:25pm"
    },
    {
        busName: "Sathyanath",
        timings: "08:25am"
    },
    {
        busName: "Krishna Prasad",
        timings: "08:45am"
    },
    {
        busName: "Krishna Prasad",
        timings: "02:00pm"
    },
    {
        busName: "SVT",
        timings: "09:04am"
    },
]

export type BaseButtonProps = {
    variant?: string,
    onPress?: () => any,
}

export type TextProps = {
    title: string,
    isIcon?: false,
    iconSize?: never,
    iconColor?: never
}

export type IconProps = {
    title: string,
    isIcon: boolean,
    iconSize: number,
    iconColor: string
}

export type MyButtonProps = BaseButtonProps & (TextProps | IconProps);