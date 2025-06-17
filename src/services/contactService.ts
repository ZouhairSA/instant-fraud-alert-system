
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp;
  status?: 'new' | 'read' | 'replied';
}

export const submitContactForm = async (contactData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    
    console.log('Contact form submitted with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form: ', error);
    return { success: false, error };
  }
};

export const getContactMessages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const contacts: ContactMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      contacts.push({
        id: doc.id,
        ...doc.data()
      } as ContactMessage);
    });
    
    return contacts;
  } catch (error) {
    console.error('Error fetching contact messages: ', error);
    return [];
  }
};
