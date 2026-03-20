import React, { useContext, useEffect, useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfo } from '@react-native-community/netinfo';
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

    // Option 1: Using useNetInfo hook (from PDF)
    const netInfo = useNetInfo();
    useEffect(() => {
        if (netInfo.isConnected) {
            triggerSync();
        }
    }, [netInfo.isConnected]);

    // Option 2: Using NetInfo.addEventListener (from PDF)
    const [isOnline, setIsOnline] = useState(false);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(!!state.isConnected); // !! converts truthy to bool
        });
        return () => unsubscribe();
    }, []);

    const triggerSync = async () => {
        // TODO: implement sync logic with your API
        console.log('Syncing contacts with server...');
    };

    // Abre Realm y carga contactos al iniciar
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

    const value = { contacts, addContact, editContact, removeContact, isOnline, triggerSync };

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};

export const useContactsContext = () => useContext(ContactsContext);