import emailjs from 'emailjs-com'
import { FormEvent } from 'react'

const sendEmail = async (e: FormEvent<HTMLFormElement>) => emailjs.sendForm(
  'fromBlog',
  'template_ued8hvt',
  e.currentTarget,
  'user_8xAaUCdPIJZt4XCJfeOqk',
)

export default sendEmail
