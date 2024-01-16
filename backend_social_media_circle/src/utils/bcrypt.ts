import bcrypt from "bcrypt";

class BcryptConfig {
  private saltRound = 10;

  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRound);
      return hashedPassword;
    } catch (error) {
      throw new Error("Hashing failed");
    }
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
  }
}

export default BcryptConfig;
