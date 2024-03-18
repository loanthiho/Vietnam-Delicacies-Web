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

const Help = () => {
  const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={styles.Title}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.SubTitle}>Dịch vụ chăm sóc khách hàng</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: 60, gap:10, paddingTop:10}}>
          <Text style={styles.textCenter}>
            <Text style={styles.Part}>Tìm Kiếm và Duyệt Sản Phẩm:</Text> Khám
            phá danh mục đa dạng của chúng tôi và tìm kiếm những sản phẩm đặc
            biệt từ khắp các vùng miền của Việt Nam. Dễ dàng duyệt qua danh sách
            sản phẩm, tìm kiếm theo danh mục hoặc từ khóa để tìm ra những món
            đặc sản bạn quan tâm.
          </Text>
          <Text style={styles.textCenter}>
            <Text style={styles.Part}>Đặt Hàng và Thanh Toán: </Text> Hướng dẫn
            chi tiết về cách đặt hàng và thanh toán một cách nhanh chóng. Chúng
            tôi cung cấp nhiều phương thức thanh toán linh hoạt để đảm bảo rằng
            bạn có thể hoàn thành quá trình mua hàng một cách dễ dàng nhất.
          </Text>
          <Text style={styles.textCenter}>
            <Text style={styles.Part}>Quản Lý Đơn Hàng: </Text> Hướng dẫn chi
            tiết về cách đặt hàng và thanh toán một cách nhanh chóng và an toàn.
            Chúng tôi cung cấp nhiều phương thức thanh toán linh hoạt để đảm bảo
            rằng bạn có thể hoàn thành quá trình mua hàng một cách dễ dàng nhất.
          </Text>
          <Text style={styles.textCenter}>
            <Text style={styles.Part}>Chính Sách và Hỗ Trợ: </Text> Hiểu rõ về
            các chính sách của chúng tôi, bao gồm chính sách đổi trả, bảo mật
            thông tin và hỗ trợ khách hàng. Đảm bảo rằng bạn có mọi thông tin
            cần thiết để có trải nghiệm mua sắm trực tuyến an tâm nhất.
          </Text>
          <Text style={styles.textCenter}>
            <Text style={styles.Part}>Liên Hệ và Phản Hồi: </Text> Chia sẻ ý
            kiến, đề xuất hoặc yêu cầu hỗ trợ từ đội ngũ chăm sóc khách hàng của
            chúng tôi. Chúng tôi luôn sẵn lòng lắng nghe và cung cấp sự giúp đỡ
            để đảm bảo bạn có trải nghiệm tuyệt vời nhất khi sử dụng ứng dụng
            của chúng tôi.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Help;

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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  textCenter: {
    textAlign: 'justify',
  },
});
