import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import colors from '../../../ultils/_colors';
import userSignUp from './useSignUp';
import { getUserCombineData } from '../../../api/storage';

const ChooseRole = ({ navigation }: any) => {
    // const { signUp, onChange, userCredentials } = userSignUp;
    const [role, setRole] = useState<string>('customer')
    const fectDataUserLocal = async () => {
        const dataUser = await getUserCombineData();
    }
    useEffect(() => {
        fectDataUserLocal();
    }, [])
    return (
        <View style={styles.choose_role__container}>
            <View
                style={{
                    rowGap: 20,
                    alignItems: 'center'
                }}>
                <Image source={require('../../../assets/img_login_sigup/Logo-app.png')} />
                <TouchableOpacity
                    style={[styles.role__touchable]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require("../../../assets/img_login_sigup/customer_role_1.jpg")}
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
                    style={[styles.role__touchable]}>
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
                <View style={styles.action_button}>
                    <TouchableOpacity style={[styles.goback_button]}>
                        <Text style={styles.goback_button__text}>Quay Lại</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.goback_button]}>
                        <Text style={styles.comfirm_button__text}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 20,
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
    },
    action_button: {
        flexDirection: 'row',
        columnGap: 100,
    },
    goback_button: {
        backgroundColor: colors.green,
        padding: 15,
        borderRadius: 10
    },
    goback_button__text: {
        color: 'white',
        fontSize: 20
    },
    comfirm_button__text: {
        color: 'white',
        fontSize: 20
    }

});
export default ChooseRole;
