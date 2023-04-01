import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardRemove, decreaseCardCount, increaseCardCount, } from "../redux/pokemonSlice";

function SmallCard({data}) {
    const [ showCross, setShowCross ] = useState(true);
    const dispatch = useDispatch();
    const { selectedCardList } = useSelector(state => state.pokemon);

    useEffect(() => {
        if(data.count > 1) {
            setShowCross(false);
        } else {
            setShowCross(true);
        }
    },[selectedCardList])


    const increment = () => {
        dispatch(increaseCardCount(data.id));
    }

    const decrement = () => {
        dispatch(decreaseCardCount(data.id));
    }

    const removeItem = () => {
        dispatch(cardRemove({
            id: data.id,
        }));
    }




    return (
        <View style={styles.container}>
            <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={{
                uri:data.photo
                }}
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <Text>${data.price}<Text style={{ color: 'grey'}}> per card</Text></Text>

                <View style={{ marginTop: 40, alignContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={{color:'red', fontWeight: 'bold'}}>{data.total}</Text>
                    <Text style={{color:'grey', fontWeight: '400', fontSize: 14}}>  cards left</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Text style={styles.blueText}>
                    {data.count}
                    <View>
                        <MaterialIcons onPress={()=> {increment()}} name="keyboard-arrow-up" size={15} color="#0096ff" />
                       { !showCross && <MaterialIcons onPress={()=> {decrement()}} name="keyboard-arrow-down" size={15} color="#0096ff" />}
                       { showCross && <Entypo onPress={()=> {removeItem()}} name="cross" size={15} color="red" /> }           
                    </View>
                </Text>
                <View style={{ marginTop: 30, alignContent: 'flex-end'}}>
                    <Text>price</Text>
                    <Text style={styles.blueText}>${data.count * data.price}</Text>
                </View>
            </View>


        </View>
    )
}

SmallCard.propTypes = {
    data: PropTypes.object
}
  
export default SmallCard;

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 130,
        overflow : 'hidden',
        flexDirection: 'row',
        marginBottom: 10
    },
    textContainer : {
        flex: 5,
        marginTop: 10,
        marginLeft: 10,
    },
    actions : {
        flex: 2,
        alignItems: 'flex-end',
        marginTop: 10,
    },
    imageStyle: {
        flex: 2,
        height: 130,
        width: 100,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    blueText: {
        color: '#0096ff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})