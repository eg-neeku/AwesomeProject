import { GestureResponderEvent } from "react-native";

type StatusProp = { trails: number, status: boolean };

type GameStatusProp = { trailStatus: StatusProp, userNumber: number, onStartNewGame: () => void }

type GameStartScreenProps = {
    onPickNumber: (val: number) => void
}

type OpponentScreenProps = {
    userNumber: number,
    onGameOver: (statusProp: StatusProp) => void
}

type PrimaryButtonProp = {
    children: React.ReactNode,
    onPress?: ((event: GestureResponderEvent) => void) | (() => void)
}

export type{ StatusProp, GameStatusProp, GameStartScreenProps, OpponentScreenProps, PrimaryButtonProp };