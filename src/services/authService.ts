import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  updatePassword,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfileType } from '../types';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  college?: string;
  department?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp(data: SignUpData): Promise<{ user: User; profile: UserProfileType }> {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: data.name
      });

      // Send email verification
      await sendEmailVerification(user);

      // Create user profile in Firestore
      const userProfile: UserProfileType = {
        id: user.uid,
        name: data.name,
        email: data.email,
        department: data.department || '',
        college: data.college || '',
        totalCO2Saved: 0,
        streak: 0,
        badges: [],
        bio: '',
        phone: '',
        joinDate: new Date().toISOString(),
        followers: [],
        following: [],
        profileImage: '',
        emailVerified: false
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);

      return { user, profile: userProfile };
    } catch (error) {
      console.error('Sign up error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async signIn(data: SignInData): Promise<{ user: User; profile: UserProfileType }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      const profile = userDoc.data() as UserProfileType;
      
      // Update email verification status
      if (user.emailVerified !== profile.emailVerified) {
        await updateDoc(doc(db, 'users', user.uid), {
          emailVerified: user.emailVerified
        });
        profile.emailVerified = user.emailVerified;
      }

      return { user, profile };
    } catch (error) {
      console.error('Sign in error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfileType>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
      
      // Update Firebase Auth profile if name changed
      if (updates.name && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: updates.name
        });
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  static async updateUserPassword(newPassword: string): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      console.error('Update password error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async resendEmailVerification(): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error('Resend verification error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError): Error {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('Email is already registered');
      case 'auth/weak-password':
        return new Error('Password should be at least 6 characters');
      case 'auth/invalid-email':
        return new Error('Invalid email address');
      case 'auth/user-not-found':
        return new Error('No account found with this email');
      case 'auth/wrong-password':
        return new Error('Incorrect password');
      case 'auth/too-many-requests':
        return new Error('Too many failed attempts. Please try again later');
      default:
        return new Error(error.message || 'Authentication error occurred');
    }
  }
}