import { NextApiRequest, NextApiResponse} from "next"
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "config"

import { prepareConnection } from "db/index"
import { User, UserAuth} from 'db/entity/index'

export default withIronSessionApiRoute(login, ironOptions)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '' } = req.body
  const db = await prepareConnection();

  const userRepo = db.getRepository(User)
  console.log('用户打印', await userRepo.find())
  res?.status(200).json({
    phone,
    verify,
    code: 0
  })
}
