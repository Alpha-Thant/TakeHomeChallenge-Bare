import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Pressable } from "react-native";
import Header from "../components/Header";
import { AntDesign,  } from '@expo/vector-icons'; 
import CustomCard from "../components/CustomCard";
import CardModal from "../components/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCardList, showModalUpdate } from "../redux/pokemonSlice";
import { useEffect, useState } from "react";
import PaidModal from "../components/PaidModal";
import { Dimensions } from 'react-native';
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCardsPaginated } from "../api/cards";
import TopSection from "../components/TopSection";
import { SafeAreaView } from "react-native-safe-area-context";

// var keys = Object.keys(cardsQuery.data.pages)


export default function Home({ navigation }) {
    const { showModal, selectedCardList, type, rarity, set, cardName } = useSelector(state => state.pokemon);
    const [ totalCount, setTotalCount] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCardList())
    },[])

    useEffect(() => {
        let countTemp = 0;
    
        selectedCardList.map((card) => {
          countTemp += card.count;
        })
    
        setTotalCount(countTemp);    
    
    },[selectedCardList])

    const onPressHandler = () => {
        navigation.goBack();
    }
    const screenWidth = Dimensions.get('window').width;

    const cardsQuery = useInfiniteQuery({
        queryKey: ["cards"],
        getNextPageParam: lastPage => lastPage.cards.page + 1,
        queryFn: ({ pageParam = 1 }) => getCardsPaginated(pageParam),
    })


    if (cardsQuery.status === "loading") {
        return (
            <View style={styles.mainContainer}>
                <Header handlePress={onPressHandler}/>
                <Image style={{position: 'absolute', top: 70, left: screenWidth/2 - 35, zIndex: 1}} source={require('../../assets/logo.png')}/>
                <TopSection/>
                <Text style={{flex: 1, alignSelf: 'center'}}>Loading Cards...</Text>
            </View>
            )
    } 

    if (cardsQuery.status === 'error') {
        return (
            <View style={{flex: 1, alignItems: 'center',justifyContent: 'center',}}>
                <Text>{JSON.stringify(cardsQuery.error)}</Text>
            </View>)
    } 
    
    return (
        <SafeAreaView style={{flex: 1}}>

        <View style={styles.mainContainer}>
            <Header handlePress={onPressHandler}/>

            <TopSection/>

            <View style={styles.container}>
                <ScrollView style={{ width: screenWidth}}>
                    {
                        cardsQuery.data.pages
                        .flatMap(data=> data.cards.data) 
                        .map((item, index) => {

                            //name rarity set type filter here
                            if ((type === '' ? true : item.types.includes(type)) && 
                            (rarity === '' ? true : (item.rarity === rarity))  && 
                            (set === '' ? true : (item.rarity === set)) && 
                            (cardName === '' ? true : item.name.includes(cardName)) &&
                            (cardsQuery.data.pages.length * 12 - 1) != index) {

                                return (<CustomCard key={item.id} data={item}/>)

                            }

                            /// Last item binding to show (show more button)
                            if((cardsQuery.data.pages.length * 12 - 1) == index) {
                                if ((type === '' ? true : item.types.includes(type)) && 
                                (rarity === '' ? true : (item.rarity === rarity))  && 
                                (set === '' ? true : (item.rarity === set)) && 
                                (cardName === '' ? true : item.name.includes(cardName))) {
                                    return (
                                        <View key={item.id} style={{alignItems: 'center' }}>
                                        <CustomCard data={item}/>
    
                                        {!cardsQuery.isFetchingNextPage && <Pressable style={{ flexDirection:'row', paddingBottom: 100, paddingTop: 50}} key={item.id} onPress={cardsQuery.fetchNextPage}>
                                            <FontAwesome style={{marginRight: 10, marginTop: 3}} name="search" size={12} color="grey" />
                                            <Text style={{ color: 'grey'}}>Show more</Text>
                                        </Pressable>} 
                                        
                                        {cardsQuery.isFetchingNextPage && <Image
                                            resizeMode='contain'
                                            style={{height:50, width: 50, marginBottom: 120, marginTop: 50}}
                                            source={require('../../assets/loading-gif.gif')}
                                        />}
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View key={item.id} style={{alignItems: 'center' }}>
                                        {/* <CustomCard data={item}/> */}

                                            
                                        {cardsQuery.isFetchingNextPage ?
                                        (<Image
                                            resizeMode='contain'
                                            style={{height:50, width: 50, marginBottom: 120, marginTop: 50}}
                                            source={require('../../assets/loading-gif.gif')}
                                        />) :
                                        (<Pressable style={{ flexDirection:'row', paddingBottom: 100, paddingTop: 50}} key={item.id} onPress={cardsQuery.fetchNextPage}>
                                            <FontAwesome style={{marginRight: 10, marginTop: 3}} name="search" size={12} color="grey" />
                                            <Text style={{ color: 'grey'}}>Show more</Text>
                                        </Pressable>)}
                                        </View>
                                    )
                                }


                            }

                            
                            
                        })
                    }
                </ScrollView>

                <CardModal/>

                <PaidModal/>
            </View>

            <View style={styles.buttonContainer}>
               { !showModal && 
               <View>
               { selectedCardList.length != 0 && <Text style={styles.floatingText}>{totalCount}</Text>}
               <TouchableOpacity
                    style={styles.buttonOpen}
                    onPress={() => dispatch(showModalUpdate(true))}>
                        <AntDesign name="shoppingcart" size={18} color="white" />
                        <Text style={styles.textStyle}>View cart</Text>
                </TouchableOpacity>
                </View>}
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardContainer: {
        marginBottom: 80,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonOpen: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 2,
        backgroundColor: '#0096ff',
        flexDirection: 'row',
    },
      
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 5,
    },
    floatingText: {
        position:'absolute', 
        fontSize: 15, 
        bottom: 20,
        left: -3, 
        color: 'white', 
        backgroundColor: 'red',
        borderRadius: 20,
        zIndex: 3,
        paddingHorizontal: 7,
        fontWeight: 'bold'
    }
})
