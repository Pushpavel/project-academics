import FIREBASE_CONFIG from './firebase.config';
import { sampleFacultyUser } from './local.config';

/**
 * TODO: Create local.config.ts with content
 *
 * import {AcademicUser} from '@lib/models/user.model';
 *
 * export const sampleFacultyUser: AcademicUser = {
 *   displayName: 'Ricardo Prohaska',
 *   uid: 'RicardoProhaska38@gmail.com',
 *   email: 'richardoProhaska38@nitpy.ac.in',
 *   isFaculty: true,
 * };
 *
 */

export const environment = {
  production: false,
  localUser: null,
  FIREBASE_CONFIG,
};
