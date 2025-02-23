import { USER_ACTION_TYPES } from './user.types';
import  createReducer  from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createReducer(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE'

*/

export const checkUserSession = () =>
  createReducer(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createReducer(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createReducer(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createReducer(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createReducer(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName) =>
  createReducer(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = (user, additionalDetails) =>
  createReducer(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) =>
  createReducer(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createReducer(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createReducer(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createReducer(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);