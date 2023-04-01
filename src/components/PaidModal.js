import { Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { paidModalUpdate } from '../redux/pokemonSlice';

export default function PaidModal() {
  const { paidModal } = useSelector(state => state.pokemon);
  const dispatch = useDispatch();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={paidModal}
        onRequestClose={() => {
          dispatch(paidModalUpdate(!paidModal))
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>   


            <View style={styles.bottomView}>
                <Ionicons name="ios-checkmark-circle" size={150} color="#00E400" />
                <Text style={styles.totalCard}>Payment success!</Text>
            </View>

              { paidModal && <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => dispatch(paidModalUpdate(false))}>
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

  totalCard: {
    fontWeight: '500',
    fontSize: 20
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

  buttonClose: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    position: 'absolute',
    bottom: -10,
  },
});

