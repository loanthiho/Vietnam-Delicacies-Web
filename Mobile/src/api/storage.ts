import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserCredentials = async (data: any) => {
    await AsyncStorage.setItem('user', JSON.stringify(data))
        .then(res => ({ msg: "Storage data user successfully" }))
        .catch(err => console.log("Error Storage user credentials", err));
};


const getUserCredentials = async () => await AsyncStorage.getItem('user',
    (error, result) => {
        if (error) {
            return console.log("Error get data user:", error);
        }
        else if (result) {
            return JSON.parse(result);
        }
    }
)



export { getUserCredentials, setUserCredentials }