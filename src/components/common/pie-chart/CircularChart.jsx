import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import PropTypes from "prop-types";
import {styles} from './PieChartStyles'
import {VictoryPie} from "victory-native";



export const CircularChart = (props) => {

    const {totalCarbs, totalProteins, totalFats} = props.data

    const chartData = [
        {
            x: 'Węglowodany',
            y: totalCarbs,
        },
        {
            x: 'Białko',
            y: totalProteins,
        },
        {
            x: 'Tłuszcze',
            y: totalFats,}
    ]

    const colors = ['#036FDA','#CF6679','#FCE086',]

    return (
        <View style={styles.container}>
            <View style={styles.legendContainer}>
                {chartData.map((item, index) => {
                    return (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.itemColor, {backgroundColor: `${colors[index]}`}]}/>
                            <Text style={styles.itemText}>
                                {`${item.x} (${item.y}g)`}
                            </Text>
                        </View>
                    )
                })}
            </View>
            <VictoryPie
                data={chartData}
                width={230}
                height={230}
                labels={() => null}
                innerRadius={45}
                colorScale={colors}
                animate={{
                    duration: 1000
                }}
            />

        </View>
    );
}

CircularChart.propTypes = {
    data: PropTypes.object.isRequired,
}
    