import { StyleSheet, Image, Dimensions } from "react-native"
const styles = StyleSheet.create({
    image:{
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    }
})

export const Background = ()=>{
    return(
        <Image blurRadius={1} source={require('../assets/bg5.jpg')} resizeMode={'cover'} style={styles.image} />
    )
}
