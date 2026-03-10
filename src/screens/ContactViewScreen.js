import { View } from 'react-native';
import ContactCard from '../components/ContactCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactViewScreen = ({ navigation, route }) => {
    const { contact } = route.params;
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, padding: 10, marginBottom: insets.bottom }}>
            <ContactCard contact={contact} />
        </View>
    );
};
export default ContactViewScreen;