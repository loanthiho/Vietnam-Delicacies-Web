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
import { useMutation } from '@tanstack/react-query';
import api from '../../../api/request';
import LoaderKit from 'react-native-loader-kit';
import { showMessage } from 'react-native-flash-message';

const ChooseRole = ({ navigation }: any) => {
    // const { signUp, onChange, userCredentials } = userSignUp;
    const [role, setRole] = useState<string>('customer');
    const [formData, setFormData] = useState<object>({});
    // const [disableChooseRole, setDisableChooseRole] = useState<boolean>(false);
    const onChangeRole = async (role: string) => {
        setRole(role);
        setFormData({
            ...formData,
            role: role
        })
    }
    const fectDataUserLocal = async () => {
        try {
            const dataUser = await getUserCombineData();
            if (dataUser) {
                setFormData({
                    ...dataUser,
                    role: role
                })
            }
        } catch (error) {
            console.log("Error when fetch combine:", error);
        }
    }
    useEffect(() => {
        fectDataUserLocal();
    }, []);

    const mutation = useMutation({
        mutationFn: async (data: {}) => {
            return await api.post('users/sign-up', data, {}, {})
        }
    })

    useEffect(() => {
        if (mutation.isSuccess) {
            showMessage({
                message: "Successful Register!",
                type: "success",
            })
        }
        if (mutation.isError) {
            showMessage({
                message: "Failed when register!",
                type: "danger",
            })
        }
    }, [mutation.isError, mutation.isSuccess])


    const handleConfirm = async () => {
        mutation.mutate(formData);
    }
    return (
        <View style={styles.choose_role__container}>
            <View
                style={{
                    rowGap: 20,
                    alignItems: 'center'
                }}>
                <Image source={require('../../../assets/img_login_sigup/Logo-app.png')} />
                <TouchableOpacity
                    onPress={() => onChangeRole('customer')}
                    style={[
                        styles.role__touchable,
                        role === 'customer' ? { borderWidth: 3, } : null
                    ]}>
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
                    onPress={() => onChangeRole('seller')}
                    style={[
                        styles.role__touchable,
                        role === 'seller' ? { borderWidth: 3 } : null
                    ]}>
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
                    <TouchableOpacity style={[styles.goback_button]} onPress={() => navigation.goBack()}>
                        <Text style={styles.goback_button__text}>Quay Lại</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleConfirm}
                        style={[styles.goback_button, { flexDirection: 'row', columnGap: 20 }]}
                    >
                        <Text style={styles.comfirm_button__text}>Xác nhận</Text>
                        {
                            mutation.isPending ?
                                <View style={{ justifyContent: 'center' }}>
                                    <LoaderKit
                                        style={{ width: 20, height: 20 }}
                                        name={'BallPulse'} // Optional: see list of animations below
                                        color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                                    />
                                </View>
                                : null
                        }
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
        justifyContent: 'center',
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
