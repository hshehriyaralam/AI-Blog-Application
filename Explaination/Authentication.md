 headers: { Authorization: `Bearer ${accessToken}` },

 1) headers :
 headers request ke sath additionally information hoti hai jo server ko btati ha request kis type ka hai e.g Content Type, Authentication , Language 

 2) Authorization : 
    authorization ek HTTP header hota hai jo Authentication ke lye use hOta hai , server ko btata hai request krne wala kon hai and iske pass Konsa valid Token hai 

3) Bearer : 
    bearer authentication sheme ka name hai ye mostly  QAuth2.0 me use hOta hai   

***************----------------------**************************************


const appToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  )

1) jwt.sign(): ye function jsonwebtoken library ka hOta hai . iska kam apke provder data ek securly encode kr ke ek signed token bnana hai


2) extraReducers : async action thunk ko handle krne ke lye use hOte hain 


