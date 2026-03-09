import React, { useContext, useLayoutEffect, useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import Colors from "../../../constants/colors";
import BuildingForm from "./BuildingForm";
import { storeBuildingData, updateBuildingData, deleteBuildingData } from "../database/buildinghttp"
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
import { BuildingContext } from "../database/BuildingContextProvider";
import { BuildingDetailsDTO, ComplaintProps } from "../database/model";
import MyButton from "../UI/MyButton";
import { deleteComplaint, fetchComplaintData, fetchComplaintDataByBuilding } from "../database/complainthttp";

export default function ManageBuilding({ route, navigation }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>("");
    const buildingCtx = useContext(BuildingContext);
    const editedBuildingId = route.params?.buildingId; //here routing means useful for updating
    const isEditing = !!editedBuildingId;

    const selectedBuilding = buildingCtx.buildingData.find(buildingItem => buildingItem.id === editedBuildingId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Building" : "Add Building"
        });
    }, [navigation, isEditing]);

    const deleteComplaintAssociatedToBuilding = async (complaintList: ComplaintProps[], concurrency = 10) => {
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
        },
        deleteContainer: {
            marginTop: 16,
            paddingTop: 8,
            borderTopColor: Colors.primary200,
            alignItems: "center"
        },
    });

    if (error && !isSubmitting) return <ErrorOverlay message={error} />

    if (isSubmitting) return <LoadingOverlay />

    return (
        <View style={styles.container}>
            <BuildingForm onCancel={cancelHandler}
                onConfirm={confirmHandler} submitButtonLabel={isEditing ? "Update" : "Add"}
                selectedBuilding={selectedBuilding} />

            {isEditing && <View style={styles.deleteContainer}>
                <MyButton beforeBgColor={Colors.danger} afterBgColor={"#da4343"} title="Delete" onPress={deleteBuildingHandler} beforeTextColor="#fff" afterTextColor="#000" />
            </View>
            }
        </View>
    )
}