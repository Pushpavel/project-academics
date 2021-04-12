import * as admin from 'firebase-admin';
import { CallableContext } from 'firebase-functions/lib/providers/https';

const firestore = admin.firestore();

export async function _createGrade(p: any, context: CallableContext) {
    return {}
}