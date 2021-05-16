import emailjs from 'emailjs-com'
import { FormEvent } from 'react'

const sendEmail = async (e: FormEvent<HTMLFormElement>) => emailjs.sendForm(
  process.env.EMAILJS_SERVICE_ID,
  process.env.EMAILJS_TEMPLATE_ID,
  e.currentTarget,
  process.env.EMAILJS_USER_ID,
)

export default sendEmail
