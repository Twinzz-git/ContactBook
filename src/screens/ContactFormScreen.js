import { View } from 'react-native';
import ContactForm from '../components/ContactForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContactsContext } from '../context/ContactsContext';

const ContactFormScreen = ({ navigation, route }) => {
    const { contact = {} } = route.params || {};
    const insets = useSafeAreaInsets();
    const { addContact, editContact } = useContactsContext();

    const onSubmit = ({ name, phone, email }) => {
        if (contact.id) {
            // Si el contacto ya tiene ID, es una edición
            editContact(contact.id, { name, phone, email });
        } else {
            // Si no tiene ID, es un contacto nuevo
            addContact({ name, phone, email });
        }
        navigation.navigate('ContactList');
    };

    return (
        <View style={{ flex: 1, padding: 10, marginBottom: insets.bottom }}>
            <ContactForm contact={contact} onSubmit={onSubmit} />
        </View>
    );
};

export default ContactFormScreen;