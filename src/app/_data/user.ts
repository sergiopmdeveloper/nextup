import db from '@/db';
import { type User } from '@prisma/client';
import argon2 from 'argon2';

/**
 * User repository.
 */
export default class UserRepository {
  /**
   * Creates a new user.
   * @param {string | undefined} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<User>} - The created user.
   */
  static async create(
    name: string | undefined,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);

    return await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<User | null>} - The user in case it exists.
   */
  static async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
