import React from 'react';
import PropTypes from "prop-types";
import { View, FlatList,} from "react-native";
import {Accordion} from "../../../../components/common/accordion/Accordion";
import {ListItem} from "../../../../components/common/list-item/ListItem";
import {globalStyles} from "../../../../global-styles/globalStyles";


export const FoodAccordion = (props) => {

    return (
        <Accordion
            title={"Posiłki"}
            body={
                <View style={globalStyles.accordionList}>
                    <FlatList
                        data={props.data}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => (
                            <ListItem
                                title={item.name}
                                description={
                                    `kcal: ${item.kcal}, b: ${item.proteins}g, t: ${item.fats}g, w: ${item.carbs}g`
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

FoodAccordion.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}