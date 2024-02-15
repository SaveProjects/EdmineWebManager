import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import sequelize from "../../../module/sequelize";
import {createHash} from 'crypto'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "****" }
      },
      async authorize(credentials, req) {
        
        const userQuery = await sequelize.query(`SELECT * FROM ed_login WHERE player_name LIKE '${credentials.name}%';`)
        const user = userQuery[0][0]
        
        
        const hash = createHash('sha256').update(credentials.password).digest('hex');
        console.log('||||||||||')
        console.log(hash)
        console.log(credentials.password)
        console.log(user)
        console.log(user?.player_password)
        console.log(userQuery[0].length)
        console.log('||||||||||')

        return null

        if(userQuery[0].length>1) return null

        if(userData&&userData.player_uuid){

          return null
  
          // return {
          //   name: user.firstname,
          //   id:user.id,
          //   email: user.email,
          // };

        }else{
          return null;
        }
        
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },

    async session({ session, token, user }) {

      // PUT ID
      // const uerss = await User.findOne({where:{email:session.user.email}})

      // if(uerss){

      //   session.user.id=uerss.dataValues.id

      // }else{

      //   session.user.id="bizzard"

      // }
      // // Send properties to the client, like an access_token from a porvider.
      // session.accessToken = token.accessToken
      // // session.user.id = user.id
      // return session
    }
  },
  jwt: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  }
}

export default NextAuth(authOptions)