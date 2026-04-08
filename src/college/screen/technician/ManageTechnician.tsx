import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import TechnicianForm from "./TechnicianForm";
import LoadingOverlay from "../../UI/LoadingOverlay";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { TechnicianDetailsDTO, TechnicianFormProps } from "../../database/model";
import { AppContext } from "../../database/AppContextProvider";
import { deleteTechnician, fetchTechnicianDataById, storeTechnicianData, updateTechnicianData } from "../../database/technicianhttp";
import Colors from "../../../constants/colors";

export default function ManageTechnician({ route, navigation }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>("");
    const deviceCtx = useContext(AppContext);
    const editedTechnicianId: TechnicianFormProps["id"] = route.params?.technicianId; //here routing means useful for updating
    const isEditing = !!editedTechnicianId;
    const [selectedTechnician, setSelectedTechnician] = useState<TechnicianDetailsDTO>();

    useEffect(() => {
        if (!editedTechnicianId) return;
        (async function getSelectedTechnician() {
            setIsFetching(true);
            try {
                const response = await fetchTechnicianDataById(editedTechnicianId);
                setSelectedTechnician(response);
            } catch (error) {
                console.log("No Technician found");
            } finally {
                setIsFetching(false);
            }
        })();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Technician" : "Add Technician"
        });
    }, [navigation, isEditing]);

    const cancelHandler = () => {
        navigation.goBack();
    };

    const deleteTechnicianHandler = () => {
        Alert.alert("Delete Techician", "Are you sure?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Okay",
                onPress: async () => {
                    setIsSubmitting(true);
                    try {
                        await deleteTechnician(editedTechnicianId ?? "");
                        cancelHandler(); // but this ensures that it go back to where this UI screen was invoked
                    } catch (error) {
                        setError("Could not delete technician - please try again later");
                        setIsSubmitting(false);
                    }
                },
                style: 'destructive'
            }
        ]);
    };

    const confirmHandler = async (newTechnicianData: TechnicianFormProps) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateTechnicianData(editedTechnicianId, newTechnicianData);
            } else {
                const id = await storeTechnicianData(newTechnicianData);
            }
            cancelHandler();
        } catch (error) {
            setError("Could not save data - please try again later!");
            setIsSubmitting(false);
        }
    };

    if (error && !isSubmitting) return <ErrorOverlay message={error} />

    if (isSubmitting || isFetching) return <LoadingOverlay color={Colors.blue} />

    let screen = <View style={{ flex: 1 }}>
        <TechnicianForm onCancel={cancelHandler}
            onConfirm={confirmHandler}
            selectedTechnician={selectedTechnician} isEditing={isEditing} deleteTechnicianHandler={deleteTechnicianHandler} />
    </View>;

    if (deviceCtx.isLandScape) {
        screen = <ScrollView>{screen}</ScrollView>;
    }

    return screen;
}