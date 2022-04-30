import { prepareConnection } from "db/index"
import { Article } from "db/entity"
import { Divider } from 'antd'
import ListItem from 'components/ListItem'
import { IArticle } from 'pages/api/index'

interface IProps {
  articles: IArticle[]
}

export async function getServerSideProps() {
  const db = await prepareConnection()
  const articles = await db.getRepository(Article).find({
    relations: ['user']
  })

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) || []
    }
  }
}

const Home = (props: IProps) => {
  const { articles } = props
  console.log('获取到的文章数据', articles)
  return (
    <div>
      {
        articles?.map((article) => (
          <>
            <ListItem article={article} />
            <Divider/>
          </>
        ))
      }
    </div>
  )
}

export default Home