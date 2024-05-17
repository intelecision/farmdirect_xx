import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { Pressable } from 'react-native'

type Props = {
    visible: boolean
    children: ReactNode
    onClose: () => void
}

const MessageBox = ({ visible, children, onClose }: Props) => {
    // const [visible, setVisible] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Modal
                animationType="slide"
                visible={visible}
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>{children}</View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default MessageBox
