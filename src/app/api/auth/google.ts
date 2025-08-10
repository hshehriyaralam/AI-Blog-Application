import type { NextApiRequest, NextApiResponse } from "next";
import { googleLogin } from "../../lib/googleAuth";
import { error } from "console";


export default  async  function handler(req: NextApiRequest , res: NextApiResponse){
    if(req.method !== "POST"){
        return res.status(405).json({error: "Method Not Allowed"})
    }

    try{

    }catch(error : any){
        res.status(500).json({ error: error.message })
    }
}

