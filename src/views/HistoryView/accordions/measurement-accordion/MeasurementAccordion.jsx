import React from 'react';
import PropTypes from "prop-types";
import { View, FlatList, } from "react-native";
import { Accordion } from "../../../../components/common/accordion/Accordion";
import { ListItem } from "../../../../components/common/list-item/ListItem";
import { globalStyles } from "../../../../global-styles/globalStyles";

export const MeasurementAccordion = (props) => {

    return (
        <Accordion
            title={"Pomiary"}
            body={
                <View style={globalStyles.accordionList}>
                    <FlatList
                        data={props.data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => (
                            <ListItem
                                title={`#1`}
                                description={
                                    `Waga: ${item.weight}kg, Wzrost: ${item.height}cm, TT: ${item.bodyFat}%`
                                }
                                withAction={false}
                            />
                        )}
                    />
                </View>
            }
            open={props.open}
            setOpen={props.setOpen}
        />

    )
}

MeasurementAccordion.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}