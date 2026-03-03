
export type BusProps = {
    busName: string,
    timings: string
}

export const BUS_DETAILS: BusProps[] = [
    {
        busName: "LULU",
        timings: "07:05am"
    },
    {
        busName: "LULU",
        timings: "06:05am"
    },
    {
        busName: "Kadiyali",
        timings: "07:40am"
    },
    {
        busName: "Sri Ganesh",
        timings: "08:20am"
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