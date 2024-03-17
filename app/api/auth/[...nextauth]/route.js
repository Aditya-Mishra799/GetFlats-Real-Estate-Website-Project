
// User authentication logn and creation in mongo DB
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks:{
        async jwt({token, user, session}){
            return token
        },
        async session({session}){
            const sessionUser = await User.findOne({email: session.user.email })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDB();
    
                 //check if a user alreday exists
                const userExists = await User.findOne({email: profile.email})
                //if user does not exits create new user

                if(!userExists){
                    await User.create({
                        email : profile.email,
                        username: String(profile.name),
                        image: profile.picture,
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    },
    secret : process.env.NEXTAUTH_SECRET,
    session: {
        strategy:'jwt',
    }
    
})

export {handler as GET , handler as POST}
