import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema"
import Credentials from "next-auth/providers/credentials"
interface User {
    id: string;
    email: string;
    password: string;
    // Add other fields as needed
  }

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [google, 
//       Credentials({
//         credentials: {
//             email: {},
//             password: {},
//         },
   
       



























//  authorize: async (
//             credentials: Partial<Record<"email" | "password", unknown>>,
//             request: Request
//           ): Promise<User | null> => {
//             let user;
//             if (
//               typeof credentials.email === 'string' &&
//               typeof credentials.password === 'string'
//             ) {
//               console.log(credentials);
//               if (credentials.email === 'abc@gmail.com') {
//                 user ={
//                     id:'12',
//                     email: credentials.email,
//                     password: credentials.password,
//                 }
//                 return  user
//               }
//             }
//             return Promise.reject(null);
//           },
//         }),
    
        

    
//     ],
//     callbacks: {
//         async redirect({ url, baseUrl }) {
//             if (url.split('/')[1] === "sign-up") {
//               // Redirect to a different URL after credentials login
//               return "/";
//             }
//             return baseUrl;
//           },
//           async jwt(params) {
//             const  { token, user } = params
//             console.log(params)
//             if (user) {
//               token.id = user.id;
//               token.email = user.email;
//             }
//             console.log(token)
//             return token;
//           },
          
//           async session({ session, token, user }) {
//             // Send properties to the client, like an access_token from a provider.
//     session.user.id = token.id;
//       session.user.email = token.email;
//       session.accessToken = token.accessToken;
//       console.log('session - ', session)
//       return session;
//           }
        
//         },
//         session: {strategy: "jwt"}
//         ,
//         secret: process.env.NEXTAUTH_SECRET,
    ]

    })