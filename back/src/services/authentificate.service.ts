import { User } from "../entities";
import bcrypt from 'bcrypt';
import { UserToken } from "../models/userToken.model";
import nodemailer from 'nodemailer';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateTokenForUser = (user: User): string => {
	try {
	   const userToken: UserToken = {id: user.id, name: user.name, email: user.email};
	   return jwt.sign(userToken, process.env.JWT_TOKEN_SECRET);
	} catch (e) {
		console.log(e);
		throw  e;
	}
}


export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);
	return match;
}
export const sendEMailResetPasswordUser = async(user: User): Promise<boolean>  => {
    const tokenPassword = await jwt.sign({id: user.id}, process.env.JWT_RESET_PASSWORD_SECRET, {expiresIn: '300s'});

    const transporter = nodemailer.createTransport({
        host: process.env.SERVER_SMTP,
        port: process.env.PORT_SMTP,
        secure: true,
        service:process.env.TYPE_SERVICE,
        auth: {
            user: process.env.LOGIN_EMAIL,
            pass: process.env.PASSWORD_EMAIL,
        },
    });
    module.exports = { transporter };

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Bonjour ${user.name} !</p><p>Pour changer votre mot de passe, cliquer <a href="${process.env.CORS_ORIGIN}/change-password?token=${tokenPassword}">ICI</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        }
    });

    return true;
}

export const changePasswordUser = async(password: string, token: string, res: Response) => {
  /*  try {
        const { id } = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET) as JwtPayload;
        const user = await usersRepository.findOne({where : { id }});

        if (!user) {
			return res.status(404).send("Le compte pour changer le mot de passe n'existe pas !");
        }

        // Update password
        const hashPwd = await hashPassword(password);

        await usersRepository.update(
            {
                id
            },
            {
                password : hashPwd
            });

		return res.status(200).send("Mot de passe modifié !");
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return Res.send(res, 401, "Token expired");
        } else {
            console.error(error);
            return Res.send(res, 500, "Internal server error");
        }
    } */
}
