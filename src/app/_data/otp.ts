import db from '@/db';
import { type Otp } from '@prisma/client';

/**
 * Otp repository.
 */
export default class OtpRepository {
  /**
   * Finds an OTP via their ID.
   * @param {string} id - The ID of the OTP.
   * @returns {Promise<Otp | null>} The OTP in case it exists.
   */
  static async findById(id: string): Promise<Otp | null> {
    return await db.otp.findUnique({
      where: {
        id,
      },
    });
  }

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

// TODO: Improve repository functionalities.
