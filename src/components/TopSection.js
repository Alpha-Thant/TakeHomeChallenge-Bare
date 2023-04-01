import { StyleSheet, TextInput, View, Text } from "react-native"
import { globalSytles } from "../../styles/globalStyle";
import { useQuery } from "@tanstack/react-query";
import { getRarities, getSets, getTypes } from "../api/cards";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { changeCardName, changeRarity, changeSet, changeType } from "../redux/pokemonSlice";
import { useDispatch } from "react-redux";

export default function TopSection() {

    const RarityQuery = useQuery({
        queryKey: ["rarity"],
        queryFn: getRarities,
    })

    const SetQuery = useQuery({
        queryKey: ["set"],
        queryFn: getSets,
    })

    const TypeQuery = useQuery({
        queryKey: ["type"],
        queryFn: getTypes,
    })


    const [selectedType, setSelectedType] = useState(null);
    const [selectedRarity, setSelectedRarity] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);

    const [isFocusType, setIsFocusType] = useState(false);
    const [isFocusRarity, setIsFocusRarity] = useState(false);
    const [isFocusSet, setIsFocusSet] = useState(false);

    const dispatch = useDispatch();

    const onCardNameChange = (newText) => {
        const str = newText.charAt(0).toUpperCase() + newText.slice(1); // Change first letter to upper case becasue includes is case sensative
        dispatch(changeCardName(str));
    }

    if (RarityQuery.status === "error" || SetQuery.status === 'error' || TypeQuery.status === 'error') {
        return (
            <View>
                <Text>{JSON.stringify(RarityQuery.error)}</Text>
                <Text>{JSON.stringify(SetQuery.error)}</Text>
                <Text>{JSON.stringify(TypeQuery.error)}</Text>
            </View>
        )
    } 

    if (RarityQuery.status === "loading" || SetQuery.status === 'loading' || TypeQuery.status === 'loading') {
        return (
            <View>
                <Text>{JSON.stringify(RarityQuery.status)}</Text>
                <Text>{JSON.stringify(SetQuery.status)}</Text>
                <Text>{JSON.stringify(TypeQuery.status)}</Text>
            </View>
        )
    }


    return (
        <View>
            <View style={styles.firstRow}>
                <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                    <View style={globalSytles.cardContainer}>
                        <TextInput onChangeText={(newText) => onCardNameChange(newText)} style={[globalSytles.input, styles.inputText]} placeholder="Name"></TextInput>
                    </View>
                </View>
            </View>


            <View style={styles.secondRow}>
                <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                    <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                    <Dropdown
                        style={[styles.dropdown, isFocusType && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        data={TypeQuery.data}
                        placeholder={!isFocusType ? 'Type' : '...'}
                        value={selectedType}
                        onFocus={() => setIsFocusType(true)}
                        onBlur={() => setIsFocusType(false)}
                        onChange={item => {
                            setSelectedType(item.value);
                            setIsFocusType(false);
                            dispatch(changeType(item.value))
                        }}
                        />
                    </View>
                </View>

                <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                    <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                    <Dropdown
                        style={[styles.dropdown, isFocusRarity && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        data={RarityQuery.data}
                        placeholder={!isFocusRarity ? 'Rarity' : '...'}
                        value={selectedRarity}
                        onFocus={() => setIsFocusRarity(true)}
                        onBlur={() => setIsFocusRarity(false)}
                        onChange={item => {
                            setSelectedRarity(item.value);
                            setIsFocusRarity(false);
                            dispatch(changeRarity(item.value))
                        }}
                        />
                    </View>
                </View>

                <View style={[globalSytles.cardShadow ,styles.textInputWrapper]}>
                    <View style={[globalSytles.cardContainer, styles.iconContainer]}>
                    <Dropdown
                        style={[styles.dropdown, isFocusSet && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        data={SetQuery.data}
                        placeholder={!isFocusSet ? 'Set' : '...'}
                        value={selectedSet}
                        onFocus={() => setIsFocusSet(true)}
                        onBlur={() => setIsFocusSet(false)}
                        onChange={item => {
                            setSelectedSet(item.name);
                            setIsFocusSet(false);
                            dispatch(changeSet(item.id))
                        }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    firstRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    secondRow: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    textInputWrapper: {
        flex:1,
        marginHorizontal: 10,
    },
    inputText: {
        textAlign: 'center'
    },  
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconStyle: {
        marginTop: 12,
        marginRight: 20,
        color: 'lightgrey'
    },
    dropdown: {
        width: 100,
        paddingHorizontal: 10,
    },
    placeholderStyle: {
        fontSize: 10,
    },
    selectedTextStyle: {
        fontSize: 10,
    },
    itemTextStyle: {
        fontSize: 10
    }
})