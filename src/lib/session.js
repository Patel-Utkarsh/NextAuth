import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose";
const secret_key = process.env.SECRET_KEY;

const encoded_key = new TextEncoder().encode(secret_key);



export async function encrypt(payload) {
    return new SignJWT(payload)
                    .setProtectedHeader({alg : 'HS256'})
                    .setIssuedAt()
                    .setExpirationTime('7d')
                    .sign(encoded_key);


}

async function decrypt(session) {
    
    try {
        const {payload} = await jwtVerify(session,encoded_key,{
            algorithms : ['HS256']
        })

        return payload
        
    } catch (error) {
        console.log('failed to verify session ',error.message);
        return null
    }
}
export async function createSession(userID) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60*1000);
    const session = await encrypt({userID,expiresAt});
    cookies().set('session',session,{
        httpOnly : true,
        secure : true,
        expires : expiresAt,
        sameSite : 'lax',
        path : '/'
    })
    

}

export async function verifySession() {

    const session = cookies().get('session')?.value;

    if(!session) return null

    const {userID} = await decrypt(session);
   

      return  userID;
    


}