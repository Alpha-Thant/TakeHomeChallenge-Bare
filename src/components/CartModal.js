import {Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import SmallCard from './SmallCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearCardList, paidModalUpdate, showModalUpdate } from '../redux/pokemonSlice';
import { useEffect, useState } from 'react';


export default function CardModal() {
  const { showModal, selectedCardList } = useSelector(state => state.pokemon);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let countTemp = 0;
    let priceTemp = 0;

    for(card of selectedCardList) {
      countTemp += card.count;
      priceTemp += (card.count * card.price)
    }

    setTotalCount(countTemp);
    setTotalPrice(priceTemp.toFixed(2));


},[selectedCardList])

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          dispatch(showModalUpdate(!showModal))
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>   
            <View style={styles.cardContainer}>
                <ScrollView>
                        {
                            selectedCardList.map((item) => {
                                return (
                                    <SmallCard key={item.id} data={item}/>
                                )
                            })
                        }
                </ScrollView>
              </View>


            <View style={styles.bottomView}>
                <TouchableOpacity onPress={() => dispatch(clearCardList())}>
                  <Text style={styles.clearAll}>Clear all</Text>
                </TouchableOpacity>
                <View style={styles.bottomViewOne}>
                    <Text style={styles.totalCard}>Total cards</Text>
                    <Text style={{marginLeft: 30, color: 'red', fontWeight: 'bold'}}>{totalCount}</Text>
                </View>
                <View style={styles.bottomViewTwo}>
                    <Text style={styles.totalPrice}>Total price</Text>
                    <Text style={{marginLeft: 30, color: 'red', fontWeight: '900', fontSize: 18}}>${totalPrice}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => dispatch(paidModalUpdate(true))}
                  style={styles.payNow}>
                  <Text style={styles.textStyle}>Pay now</Text>
                </TouchableOpacity>
            </View>

              { showModal && <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => dispatch(showModalUpdate(false))}>
                  <Entypo name="cross" size={16} color="white" />
              </TouchableOpacity> }


          </View>
        </View>


      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  bottomViewOne: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  bottomViewTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  redText: {
    color: 'red'
  },
  bottomView: {
    alignItems: 'center',
  },
  clearAll: {
    fontWeight: 400,
    color: 'grey',
    textDecorationLine: 'underline',
  },
  totalCard: {
    fontWeight: 600,
    fontSize: 16
  },
  totalPrice: {
    fontWeight: '900',
    fontSize: 19,
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  payNow: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
    elevation: 2,
    backgroundColor: '#0096ff',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  },
  buttonClose: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    position: 'absolute',
    bottom: -10,
  },
  cardContainer: {
    width: '100%',
    height: 390,
  }
});

