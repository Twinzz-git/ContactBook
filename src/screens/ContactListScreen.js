import { FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import ContactListItem from '../components/ContactListitem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContactsContext } from '../context/ContactsContext';

const ContactListScreen = ({ navigation }) => {
    const { contacts } = useContactsContext();
    const insets = useSafeAreaInsets();

    const renderItem = ({ item }) => (
        <ContactListItem
            contact={item}
            onPress={() => navigation.navigate('ContactView', { contact: item })}
        />
    );

    return (
        <View style={{ flex: 1, padding: 10, paddingBottom: insets.bottom }}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <FAB
                icon="plus"
                style={{ position: 'absolute', bottom: 16, right: 16 }}
                onPress={() => navigation.navigate('ContactForm', { contact: {} })}
            />
        </View>
    );
};

export default ContactListScreen;