// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { mock } from 'mockjs'
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
    mock({
      'list|1-10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          name: '@cname',
          'age|20-40': 25,
          'sex|1': ['男', '女'],
          birthday: '@date',
          email: '@email',
          city: '@city',
        },
      ],
    })
  )
}
