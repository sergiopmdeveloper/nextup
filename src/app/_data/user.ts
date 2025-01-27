import SessionRepository from '@/app/_data/session';
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

  /**
   * Finds a user via their ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<User | null>} The user in case it exists.
   */
  static async findById(userId: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  /**
   * Finds a user by an ID of one of its sessions.
   * @param {string} sessionId - The ID of the session.
   * @returns {Promise<User | null>} The user in case it exists.
   */
  static async findBySession(sessionId: string): Promise<User | null> {
    const session = await SessionRepository.findById(sessionId);

    if (session) {
      return await this.findById(session.userId);
    }

    return null;
  }

  /**
   * Updates the name of a user.
   * @param {string} userId - The ID of the user.
   * @param {string | undefined} name - The new name.
   * @returns {Promise<User>} The updated user.
   */
  static async updateName(
    userId: string,
    name: string | undefined
  ): Promise<User> {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });
  }

  /**
   * Updates the pasword of a user.
   * @param {string} userId - The ID of the user.
   * @param {string} password - The new password.
   * @returns {Promise<User>} The updated user.
   */
  static async updatePassword(userId: string, password: string): Promise<User> {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}

// TODO: Improve repository functionalities.
