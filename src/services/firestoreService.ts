import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { CommuteEntry, UserProfileType, Post } from '../types';

export class FirestoreService {
  // Commute entries
  static async addCommuteEntry(userId: string, commute: Omit<CommuteEntry, 'id' | 'date'>): Promise<string> {
    try {
      const commuteData = {
        ...commute,
        userId,
        date: Timestamp.now(),
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, 'commutes'), commuteData);
      
      // Update user's total CO2 saved
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfileType;
        await updateDoc(userRef, {
          totalCO2Saved: userData.totalCO2Saved + commute.co2Saved
        });
      }
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding commute entry:', error);
      throw error;
    }
  }

  static async getUserCommutes(userId: string, limitCount: number = 50): Promise<CommuteEntry[]> {
    try {
      const q = query(
        collection(db, 'commutes'),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate().toISOString()
      })) as CommuteEntry[];
    } catch (error) {
      console.error('Error getting user commutes:', error);
      throw error;
    }
  }

  // User profiles
  static async getUserProfile(userId: string): Promise<UserProfileType | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfileType;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfileType>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Posts and social features
  static async addPost(userId: string, post: Omit<Post, 'id' | 'timestamp' | 'userId' | 'userName' | 'userAvatar'>): Promise<string> {
    try {
      // Get user info
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data() as UserProfileType;
      
      const postData = {
        ...post,
        userId,
        userName: userData.name,
        userAvatar: userData.profileImage || '',
        timestamp: Timestamp.now(),
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, 'posts'), postData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }

  static async getPosts(limitCount: number = 20): Promise<Post[]> {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString()
      })) as Post[];
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }

  // Leaderboard
  static async getLeaderboard(limitCount: number = 10): Promise<UserProfileType[]> {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('totalCO2Saved', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc, index) => ({
        ...doc.data(),
        rank: index + 1
      })) as UserProfileType[];
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  }
}