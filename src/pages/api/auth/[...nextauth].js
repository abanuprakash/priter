import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
      clientId: '78717558144-07r9e7phmns23pun8ngni5bueu8gif8t.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ]
}

export default NextAuth(authOptions)