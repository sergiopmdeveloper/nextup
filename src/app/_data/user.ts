import db from '@/db';
import { type User } from '@prisma/client';

/**
 * User repository.
 */
export default class UserRepository {
  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<User | null>} - The user if it exists otherwise null.
   */
  static async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
