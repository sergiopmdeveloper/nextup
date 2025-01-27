import db from '@/db';
import { type Session } from '@prisma/client';

/**
 * Session repository.
 */
export default class SessionRepository {
  /**
   * Finds a session via their ID.
   * @param {string} id - The ID of the session.
   * @returns {Promise<Session | null>} The session in case it exists.
   */
  static async findById(id: string): Promise<Session | null> {
    return await db.session.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new session for a user.
   * @param {string} userId - The ID of the user to create a session for.
   * @param {string} token - The token of the session to be created.
   * @returns {Promise<Session>} - The created session.
   */
  static async create(userId: string, token: string): Promise<Session> {
    return await db.session.create({
      data: {
        userId,
        token,
      },
    });
  }
}

// TODO: Improve repository functionalities.
