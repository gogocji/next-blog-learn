import { NextApiRequest, NextApiResponse} from "next"
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from "config"
import { ISession } from "pages/api/index"
import { prepareConnection } from "db/index"
import { User, Article} from 'db/entity/index'
import { EXCEPTION_ARTICLE } from "../config/codes"

export default withIronSessionApiRoute(publish, ironOptions)

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { title = '', content = '' } = req.body;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const articleRepo = db.getRepository(Article);

  const user = await userRepo.findOne({
    id: session.userId,
  });

  const article = new Article();
  article.title = title;
  article.content = content;
  article.create_time = new Date();
  article.update_time = new Date();
  article.is_delete = 0;
  article.views = 0;

  if (user) {
    article.user = user;
  }

  const resArticle = await articleRepo.save(article);
  console.log('resArticle', resArticle)
  if (resArticle) {
    res.status(200).json({ data: resArticle, code: 0, msg: '发布成功' });
  } else {
    res.status(200).json({...EXCEPTION_ARTICLE.PUBLISH_FAILED})
  }
}
