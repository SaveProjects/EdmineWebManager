import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/module/sequelize';
import { UserSanction } from '@/types/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {id} = req.body;

    const getName = async (uuid:string) => {
      const [queryName,metaNave] = await sequelize.query(`SELECT * FROM ed_accounts WHERE player_uuid LIKE '${uuid}%';`)
      // @ts-ignore
      const username = queryName[0].player_name
      return username
    }

    const addName = async (item:Array<UserSanction>) => {
      let tmpArray = []
      for(let x of item){
        let tmpVar = x
        tmpVar.name=await getName(x.player_uuid)
        tmpArray.push(tmpVar)
      }
      return tmpArray
    }

    const [queryMute,metaMute] = await sequelize.query(`SELECT * FROM ed_mute;`)
    const [queryKick,metaKick] = await sequelize.query(`SELECT * FROM ed_kick;`)
    const mutes = queryMute
    const kicks = queryKick
    //@ts-ignore
    const mutess = mutes.map((item)=>{return Object.assign(item,{type:`mute`})})
    //@ts-ignore
    const kickss = kicks.map((item)=>{return Object.assign(item,{type:`kick`})})
    //@ts-ignore
    const mutes2 = await addName(mutess)
    //@ts-ignore
    const kicks2 = await addName(kickss)
    //@ts-ignore
    // console.log(mutes2,kicks2)
    // return;
    const sanctions = mutes2.concat(kicks2)
    res
      .status(201)
      .json({ success: true, message: 'sanction geted succesfully', sanctions });
    return;
    
  } else {
    res.status(400).json({ success: false, message: 'Invalid method' });
  }
}
