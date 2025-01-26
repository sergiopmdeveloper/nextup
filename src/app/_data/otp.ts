import db from '@/db';
import { type Otp } from '@prisma/client';

/**
 * Otp repository.
 */
export default class OtpRepository {
  /**
   * Creates a new OTP for a user.
   * @param {string} userId - The ID of the user to create a otp for.
   * @param {string} process - The process for which the OTP needs to be created.
   * @param {string} value - The otp to be created.
   * @returns {Promise<Otp>} - The created otp.
   */
  static async create(
    userId: string,
    process: string,
    value: string
  ): Promise<Otp> {
    return await db.otp.create({
      data: {
        userId,
        process,
        value,
      },
    });
  }
}
