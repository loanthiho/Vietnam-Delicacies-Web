import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AppInf = () => {
  const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={styles.Title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.SubTitle}>Về Chúng tôi</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: 80, gap: 10, paddingTop: 10}}>
          <Text style={styles.textCenter}>
            <Text style={{fontWeight: 'bold'}}>CHÀO MỪNG </Text>quý khách đến
            với thế giới tinh tế và đậm chất văn hóa của đặc sản Việt Nam tại{' '}
            <Text style={styles.Part}> App VnD </Text> của chúng tôi! Khám phá
            hương vị đặc trưng, sự đa dạng và sự phong phú của ẩm thực Việt Nam.
          </Text>
          <Text style={styles.textCenter}>
            <Text style={{fontWeight: 'bold'}}>Tại đây, </Text> chúng tôi tự hào
            giới thiệu đến bạn những hành trình ẩm thực không ngừng, từ miền Bắc
            đến miền Nam, từ bếp nhà truyền thống đến những đầu bếp đương đại
            đầy sáng tạo.
          </Text>
          <Text style={styles.textCenter}>
            Bạn sẽ được trải nghiệm những hương vị đặc biệt của các món ăn nổi
            tiếng như{' '}
            <Text style={{fontWeight: 'bold'}}>
              {' '}
              Gà nướng, chả giò, cơm niêu, và rất nhiều món ngon khác,
            </Text>{' '}
            mỗi một món đều là một tác phẩm nghệ thuật kết hợp tinh tế giữa
            nguyên liệu tốt nhất và bí quyết truyền thống.
          </Text>
          <Text style={styles.textCenter}>
            Không chỉ dừng lại ở ẩm thực,{' '}
            <Text style={styles.Part}>App VnD </Text> của chúng tôi còn mang đến
            cho bạn cơ hội khám phá về các loại đặc sản như{' '}
            <Text style={{fontWeight: 'bold'}}>
              {' '}
              trà, cà phê, mắc khén, và nhiều sản phẩm độc đáo khác,{' '}
            </Text>{' '}
            là những biểu tượng của đất nước Việt Nam.
          </Text>
          <Text style={styles.textCenter}>
            Hãy cùng chúng tôi trải nghiệm hành trình khám phá văn hóa ẩm thực
            đặc sắc qua từng trang thông tin, hình ảnh sống động và câu chuyện
            hấp dẫn.{' '}
            <Text style={styles.Part}>
              Đặc sản Việt Nam - nơi gặp gỡ văn hóa, nơi thưởng thức hương vị
              đích thực!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default AppInf;

const styles = StyleSheet.create({
  Title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  arrowLeft: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  SubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  Part: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffa000',
  },
  textCenter: {
    textAlign: 'justify',
  },
});
