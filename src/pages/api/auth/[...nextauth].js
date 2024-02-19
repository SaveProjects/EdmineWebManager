import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import sequelize from "../../../module/sequelize";
import {createHash} from 'crypto'

export const authOptions = {
  debug:true,
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

        // if(userQuery[0].length>1) return null

        if(user){

          const hash = createHash('sha256').update(credentials.password).digest('hex');

          if(hash==user?.player_password){
            
            return {
              name: user?.player_name,
              id:user?.player_uuid
            };

          }else{
            return null
          }
  

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
      try {
        const [userResults, userMetadata] = await sequelize.query(`SELECT * FROM ed_login WHERE player_name LIKE '${token.name}%';`)
        const users = userResults[0]
        const uuid = users[`player_uuid`]
        const [rankResults, rankMetadata] = await sequelize.query(`SELECT * FROM ed_ranks WHERE player_uuid LIKE '${uuid}%';`)
        const rankUser = rankResults[0]
        const rank = rankUser?.player_modulable_rank

        if(uuid){

          session.user.id=uuid
          session.user.modulable_rank = rank|0

        }else{

          session.user.id="bizzard"

        }
      } catch (error) {
        console.log(error)
      }
      // Send properties to the client, like an access_token from a porvider.
      // session.accessToken = token.accessToken
      // session.user.id = user.id
      return session
    }
  },
  jwt: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    // WARNING (define secret)
    secret: `Xx1RXditvzNgtF/dUNIWMRa8i6Nlc/1Sl2mCq5HxmcE=`,
  },
}

export default NextAuth(authOptions)