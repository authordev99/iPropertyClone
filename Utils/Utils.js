import { Platform, Linking, Share } from "react-native";
import Toast from 'react-native-simple-toast';

export function openUrl(url) {
    return Linking.openURL(url);
}

export function openCall(phoneNumber) {
    openUrl(`tel:${phoneNumber}`)
}

export function openWhatsapp(message, phoneNumber) {
    openUrl('whatsapp://send?text=' + message + '&phone=' + phoneNumber)
}

export async function shareLink(message, link) {
    try {
        await Share.share({
            title:message,
            message: link,

        });
    } catch (error) {
        alert(error.message);
    }
}

export function openSmsUrl(phone) {
    return openUrl(`sms:${phone}${getSMSDivider()}body=`);
}

function getSMSDivider() {
    return Platform.OS === "ios" ? "&" : "?";
}

export function showToast (message) {
    Toast.show(message, Toast.LONG);
};