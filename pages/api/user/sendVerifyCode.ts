// 参考文档：http://doc.yuntongxun.com/pe/5a533de33b8496dd00dce07c
import { format } from "date-fns"
import md5 from 'md5'
import { NextApiRequest, NextApiResponse} from "next"
import { encode } from "js-base64"
import request from 'service/fetch'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "config"
import { ISession } from "pages/api/index"

export default withIronSessionApiRoute(sendVerifyCode, ironOptions)

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) { 
  const session = req.session as ISession
  const { to = '', templateId = '1' } = req.body
  const AppId = '8a216da8806a75aa01806f2a080801c7'
  const AccountId = '8a216da8806a75aa01806f2a06ff01c1'
  const AuthToken = '2e33e753c4e141a3b1de52cf41e2edd2'
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`)
  const Authorization = encode(`${AccountId}:${NowDate}`)

  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
  const expireMinute = '5' // 五分钟
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`

  const response = await request.post(url, {
    to,
    templateId,
    appId: AppId,
    datas: [verifyCode, expireMinute]
  }, {
    headers: {
      Authorization
    }
  })
  
  // TODO：暂时性写any，后面还要定义response的类型
  const { statusCode, statusMsg, templateSMS } = response as any
  if (statusCode === '000000') {
    session.verifyCode = verifyCode
    await session.save()
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: {
        templateSMS
      }
    })
  } else {
    res.status(200).json({
      code: statusCode,
      data: statusMsg
    })
  }
}