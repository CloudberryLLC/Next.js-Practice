import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from "next"
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'


export const getServerSideProps: GetServerSideProps = async () => {
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', {ascending: true})

  const { data: notices } = await supabase
  .from('notices')
  .select('*')
  .order('created_at', {ascending: true})

  console.log({data: notices})

  return { props: { tasks, notices } }
}

type ServerSideProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssr: NextPage<ServerSideProps> = ({tasks, notices}) => {
  const router = useRouter()

  return (
   <Layout title='SSR'>
    <p className="mb-3 text-blue-500">SSR</p>
    <ul className="mb-3">
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <p className="text-lg font-extrabold">{task.title}</p>
          </li>
        )
      })}
    </ul>
    <ul className="mb-3">
      {notices.map((notice) => {
        return (
          <li key={notice.id}>
            <p className="text-lg font-extrabold">{notice.content}</p>
          </li>
        )
      })}
    </ul>
    <Link href="/ssg" prefetch={false}>
      <a className="my-3 text-xs">Link to SSG</a>
    </Link>
    <Link href="/isr" prefetch={false}>
      <a className="my-3 text-xs">Link to ISR</a>
    </Link>
    <button className="mb-3 text-xs" onClick={() => router.push ('/ssg')}>Route to SSG</button>
    <button className="mb-3 text-xs" onClick={() => router.push ('/isr')}>Route to ISR</button>
   </Layout>
  )
}

export default Ssr