import { getAllPostPaths, getPostById } from '../../utils/fireStore';
import Quizzes from '../Components/Quizzes';

export default function Post({ post }) {
  return (
    <div>
      <Quizzes quiz={post} />
    </div>
  )
}

export async function getStaticPaths() {
  // Get the paths for all posts from the database
  const paths = await getAllPostPaths()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Fetch post data by id from the database
  const post = await getPostById(params.user_uid)
  return {
    props: {
      post
    }
  }
}