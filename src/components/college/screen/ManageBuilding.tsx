import React, { useContext, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Colors from "../../../constants/colors";
import BuildingForm from "./BuildingForm";
import { storeBuildingData, updateBuildingData, deleteBuildingData } from "../database/http"
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
import { BuildingContext } from "../database/BuildingContextProvider";
import { BuildingDetailsDTO } from "../database/model";

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

    const deleteExpenseHandler = async () => {
        setIsSubmitting(true);
        try {
            await deleteBuildingData(editedBuildingId);
            buildingCtx.removeBuilding(editedBuildingId);
            navigation.goBack(); // but this ensures that it go back to where this UI screen was invoked
        } catch (error) {
            setError("Could not delete building - please try again later");
            setIsSubmitting(false);
        }
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
                <Button title="Delete" color={"#f00"} onPress={deleteExpenseHandler} />
            </View>
            }
        </View>
    )
}