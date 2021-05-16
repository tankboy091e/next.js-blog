import getConfig from 'next/config'
import emailjs from 'emailjs-com'
import { FormEvent } from 'react'

const { publicRuntimeConfig } = getConfig()

const sendEmail = async (e: FormEvent<HTMLFormElement>) => emailjs.sendForm(
  publicRuntimeConfig.EMAILJS_SERVICE_ID,
  publicRuntimeConfig.EMAILJS_TEMPLATE_ID,
  e.currentTarget,
  publicRuntimeConfig.EMAILJS_USER_ID,
)

export default sendEmail
