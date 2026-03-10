import React, { useContext, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addContactAction,
    setContactsAction,
    editContactAction,
    removeContactAction,
} from '../store/store';
import {
    openRealm,
    createContactRealm,
    readAllContacts,
    updateContactRealm,
    deleteContactRealm,
} from '../db/realm';

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);

    // Al montar, abre Realm y carga contactos en Redux
    useEffect(() => {
        const initRealm = async () => {
            await openRealm();
            const allContacts = readAllContacts();
            dispatch(setContactsAction(allContacts.map(c => ({ ...c, id: c._id }))));
        };
        initRealm();
    }, []);

    const addContact = (contact) => {
        const newId = createContactRealm(contact);
        dispatch(addContactAction({ ...contact, id: newId, _id: newId }));
    };

    const editContact = (id, newData) => {
        updateContactRealm(id, newData);
        dispatch(editContactAction(id, newData));
    };

    const removeContact = (id) => {
        deleteContactRealm(id);
        dispatch(removeContactAction(id));
    };

    const value = { contacts, addContact, editContact, removeContact };

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};

export const useContactsContext = () => useContext(ContactsContext);