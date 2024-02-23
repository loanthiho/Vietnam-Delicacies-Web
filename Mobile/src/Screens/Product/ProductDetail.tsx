import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProductDetailScreen = ({route}) => {
  if (!route.params || !route.params.selectedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Không có thông tin sản phẩm!</Text>
      </View>
    );
  }
  const {selectedItem} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: selectedItem.uri}} style={styles.image} />
      <Text style={styles.text}>{selectedItem.text}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star-outline" style={styles.starIcon} />
        <Text style={styles.textIcon}>4.5 - 26 phút</Text>
      </View>
      <Text style={styles.textscript}>
        Gấc bổ đổi lấy hết hạt để riêng ra bát, sau đó cho 1/2 bát con rượu
        trắng vào ngâm 30 phút cho gấc phai hết màu ra nước. Tiếp đó bạn đeo
        găng tay nilon bóp lại cho hạt gấc ra hết màu hoàn toàn rồi bỏ hạt đen
        đi.
      </Text>
      <View style={{flexDirection: 'row', gap: 100}}>
        <TouchableOpacity>
          <Text style={styles.tabButton}>Xem shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.tabButton}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffa000',
    marginBottom: '1%',
    right:'30%'
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    bottom:'10%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    right:'15%'
  },
  starIcon: {
    fontSize: 20,
    color: 'yellow',
    marginRight: 5,
  },
  textIcon: {
    fontSize: 15,
  },
  textscript: {
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderRadius: 10,
    width: 'auto',
    paddingHorizontal: 20,
    height: 'auto',
   color:'white',
    alignItems: 'center',
    top:'100%',
  },
});
