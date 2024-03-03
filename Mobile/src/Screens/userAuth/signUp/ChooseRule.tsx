import React from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import colors from '../../../ultils/_colors';

const ChooseRole: React.FC = ({ navigation }: any) => {
    return (
        <View style={styles.choose_role__container}>
            <View
                style={{
                    rowGap: 20,
                }}>
                <TouchableOpacity
                    style={styles.role__touchable}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require("D:\Tech\graduation_project\Vietnam-Delicacies\Mobile\src\assets\img_login_sigup\customer_role.jpg")}
                            resizeMode="contain"
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: '#000222',
                                    fontSize: 20,
                                    fontWeight: '900',
                                }}>
                                Customer
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.role__touchable}>
                    <View style={styles.role__touchable_frame}>
                        <Image
                            style={styles.role__image}
                            source={require('../../../assets/img_login_sigup/seller_role.jpg')}
                            resizeMode="contain"
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: '#000222',
                                    fontSize: 20,
                                    fontWeight: '900',
                                }}>
                                Seller
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    choose_role__container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center'
    },
    role__touchable: {
        width: '100%',
        height: 'auto',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.brown,
        borderRadius: 15
    },
    role__touchable_frame: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    role__image: {
        width: 100,
        height: 100
    }
});
export default ChooseRole;
