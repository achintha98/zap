import * as bcrypt from "bcrypt";

export async function generateSalt(SALT_ROUND: String) {
    try {
        const generatedSalt = await bcrypt.genSalt(Number(SALT_ROUND));
        console.log('Generated Salt:', generatedSalt);
        return generatedSalt;
    } catch (error) {
        console.error('Error generating salt:', error);
        throw error;
    }
}

export async function hashPassword(actualPassword: string, generatedSalt: Promise<string>) {
    try {
        const hashedPassword = await bcrypt.hash(actualPassword, generatedSalt);
        console.log('Hashed Password:', hashedPassword);
        return generatedSalt;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}