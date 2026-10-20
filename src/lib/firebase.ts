import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  serverTimestamp,
  collection,
  setDoc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with specific database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const ADMIN_EMAIL = 'ace2act.carbon@gmail.com';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears to be offline.');
      return false;
    }
    // Permissions error or non-existent document is expected and means client is connected
    return true;
  }
}

// Survey document data interface
export interface SurveyRecord {
  id?: string;
  clientSubmissionId: string;
  ageGroup: string;
  traveledPastYear: string;
  carbonOffsetUnderstanding: string;
  trustFactor: string;
  willingnessToContribute: string;
  biggestBarrier: string;
  createdAt: Timestamp | any;
}

// Contact document data interface
export interface ContactRecord {
  id?: string;
  clientSubmissionId: string;
  name: string;
  email: string;
  university?: string;
  requestType: 'full_paper' | 'feedback' | 'question' | string;
  note?: string;
  createdAt: Timestamp | any;
}

/**
 * Save survey submission to Firestore
 */
export async function saveSurveySubmission(
  answers: Record<string, string>, 
  submissionId: string
): Promise<void> {
  const path = `surveys/${submissionId}`;
  try {
    const docRef = doc(db, 'surveys', submissionId);
    await setDoc(docRef, {
      clientSubmissionId: submissionId,
      ageGroup: answers['ageGroup'] || '',
      traveledPastYear: answers['traveledPastYear'] || '',
      carbonOffsetUnderstanding: answers['carbonOffsetUnderstanding'] || '',
      trustFactor: answers['trustFactor'] || '',
      willingnessToContribute: answers['willingnessToContribute'] || '',
      biggestBarrier: answers['biggestBarrier'] || '',
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Save contact submission to Firestore
 */
export async function saveContactSubmission(
  contactData: {
    name: string;
    email: string;
    university?: string;
    requestType: string;
    note?: string;
  },
  submissionId: string
): Promise<void> {
  const path = `contacts/${submissionId}`;
  try {
    const docRef = doc(db, 'contacts', submissionId);
    await setDoc(docRef, {
      clientSubmissionId: submissionId,
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      university: contactData.university?.trim() || '',
      requestType: contactData.requestType,
      note: contactData.note?.trim() || '',
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Fetch all survey records for admin
 */
export async function fetchAllSurveys(): Promise<SurveyRecord[]> {
  const path = 'surveys';
  try {
    const q = query(collection(db, 'surveys'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SurveyRecord));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all contact records for admin
 */
export async function fetchAllContacts(): Promise<ContactRecord[]> {
  const path = 'contacts';
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ContactRecord));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
