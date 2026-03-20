import React, { useContext, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import BuildingForm from "./BuildingForm";
import { storeBuildingData, updateBuildingData, deleteBuildingData } from "../../database/buildinghttp"
import LoadingOverlay from "../../UI/LoadingOverlay";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { BuildingContext } from "../../database/BuildingContextProvider";
import { BuildingDetailsDTO, BuildingDetailsProp, ComplaintDetailsProps } from "../../database/model";
import { deleteComplaint, fetchComplaintDataByBuilding } from "../../database/complainthttp";
import Colors from "../../../../constants/colors";

export default function ManageBuilding({ route, navigation }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>("");
    const buildingCtx = useContext(BuildingContext);
    const editedBuildingId: BuildingDetailsProp["id"] = route.params?.buildingId; //here routing means useful for updating
    const isEditing = !!editedBuildingId;

    const selectedBuilding = buildingCtx.buildingData.find(buildingItem => buildingItem.id === editedBuildingId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Building" : "Add Building"
        });
    }, [navigation, isEditing]);

    const deleteComplaintAssociatedToBuilding = async (complaintList: ComplaintDetailsProps[], concurrency = 10) => {
        if (complaintList.length <= 0) return;
        // typically safe for large set of data
        try {
            for (let i = 0; i < complaintList.length; i += concurrency) {
                const batches = complaintList.slice(i, i + concurrency);
                await Promise.all(batches.map(complaintItem => deleteComplaint(complaintItem.id)))
            }
        } catch (error) {
            console.log("Something went wrong", "May be internet/server is down/slow?");
        }
    }

    const deleteBuildingHandler = () => {
        Alert.alert("Delete Building", "Are you sure? This will also delete comaplaints associated to each building that have not been resolved", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Okay",
                onPress: async () => {
                    setIsSubmitting(true);
                    try {
                        const complaintList = await fetchComplaintDataByBuilding(editedBuildingId);
                        deleteComplaintAssociatedToBuilding(complaintList);
                        await deleteBuildingData(editedBuildingId);
                        buildingCtx.removeBuilding(editedBuildingId);
                        navigation.goBack(); // but this ensures that it go back to where this UI screen was invoked
                    } catch (error) {
                        setError("Could not delete building - please try again later");
                        setIsSubmitting(false);
                    }
                },
                style: 'destructive'
            }
        ]);
    }

    const cancelHandler = () => {
        // navigation.navigate("ExpensesOverview");
        navigation.goBack();
    }

    const confirmHandler = async (newBuildingData: BuildingDetailsDTO) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                buildingCtx.updateBuilding(editedBuildingId, newBuildingData);
                await updateBuildingData(editedBuildingId, newBuildingData);
            } else {
                const id = await storeBuildingData(newBuildingData);
                buildingCtx.addBuilding({ ...newBuildingData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later!");
            setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting) return <ErrorOverlay message={error} />

    if (isSubmitting) return <LoadingOverlay color={Colors.navy} />

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <BuildingForm onCancel={cancelHandler}
                    onConfirm={confirmHandler}
                    selectedBuilding={selectedBuilding} isEditing={isEditing} deleteBuildingHandler={deleteBuildingHandler} />
            </View>
        </ScrollView>
    )
}