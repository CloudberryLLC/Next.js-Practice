import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from "next"
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Csr: NextPage = () => {

  const [ tasks, setTasks ] = useState<Task[]>([])
  const [ notices, setNotices ] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', {ascending: true})
      setTasks(tasks as Task[])
    }

    const getNotices = async () => {
      const { data: notices } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', {ascending: true})
      setNotices(notices as Notice[])
    }

    getTasks()
    getNotices()
  }, [])

  const router = useRouter()

  return (
   <Layout title='CSR'>
    <p className="mb-3 text-blue-500">SSG + CSR</p>
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

export default Csr