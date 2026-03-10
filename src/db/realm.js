import Realm from 'realm';

const ContactSchema = {
    name: 'Contact',
    properties: {
        _id: 'int',
        name: 'string',
        phone: 'string',
        email: 'string?'
    },
    primaryKey: '_id',
};

let realm;

export const openRealm = async () => {
    realm = await Realm.open({
        path: 'contactsRealm.realm',
        schema: [ContactSchema],
    });
};

export const createContactRealm = newData => {
    let newId;
    realm.write(() => {
        const maxId = realm.objects('Contact').max('_id');
        newId = maxId ? maxId + 1 : 1;
        realm.create('Contact', { ...newData, _id: newId });
    });
    return newId;
};

export const readAllContacts = () => {
    const contacts = realm.objects('Contact');
    return contacts.map(c =>
        ({ _id: c._id, name: c.name, phone: c.phone, email: c.email }));
};

export const updateContactRealm = (id, newData) => {
    realm.write(() => {
        let contact = realm.objectForPrimaryKey('Contact', id);
        if (contact) {
            contact.name = newData.name;
            contact.phone = newData.phone;
            contact.email = newData.email;
        }
    });
};

export const deleteContactRealm = (id) => {
    realm.write(() => {
        let contact = realm.objectForPrimaryKey('Contact', id);
        if (contact) {
            realm.delete(contact);
        }
    });
};