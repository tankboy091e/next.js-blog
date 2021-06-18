import { useResize } from 'lib/hooks'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/background.module.scss'

interface Canvas {
  context: CanvasRenderingContext2D
  width: number
  height: number
}

interface Data {
  animation: number
  balls: Ball[]
}

export default function Background() {
  const ref = useRef<HTMLCanvasElement>()

  const data : Data = {
    animation: null,
    balls: [],
  }

  const canvas : Canvas = {
    context: null,
    width: null,
    height: null,
  }

  const animate = () => {
    data.animation = requestAnimationFrame(animate)
    canvas.context.clearRect(0, 0, canvas.width, canvas.height)
    data.balls.forEach((ball) => ball.animate(canvas))
  }

  const resize = () => {
    ref.current.width = document.body.clientWidth
    ref.current.height = document.body.clientHeight
    canvas.width = ref.current.clientWidth
    canvas.height = ref.current.clientHeight
  }

  const initializeCanvas = () => {
    canvas.context = ref.current.getContext('2d')
    resize()
    data.animation = requestAnimationFrame(animate)
  }

  const intializeBalls = () => {
    for (let i = 0; i < 7; i++) {
      data.balls.push(new Ball(
        { r: 10, g: 60, b: 255 },
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() + 1) * canvas.width * 0.25,
        0.07,
      ))
    }
    for (let i = 0; i < 7; i++) {
      data.balls.push(new Ball(
        { r: 0, g: 0, b: 0 },
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() + 1) * canvas.width * 0.25,
        0.7,
      ))
    }
  }

  useResize(resize)

  useEffect(() => {
    initializeCanvas()
    intializeBalls()
    return () => {
      cancelAnimationFrame(data.animation)
    }
  }, [])

  return <canvas className={styles.container} ref={ref} />
}

interface RGB { r: number, g: number, b: number }

class Ball {
  private rgb: RGB
  private x : number
  private y : number
  private radius: number
  private speed: { x: number, y: number }
  private acc: {x: number, y: number}
  private opacity: number

  constructor(rgb: RGB, x: number, y: number, radius: number, opacity: number = 0.5) {
    this.rgb = rgb
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    }
    this.acc = {
      x: 1,
      y: 1,
    }
    this.opacity = opacity
  }

  animate(canvas : Canvas) {
    this.move(canvas)
    const { context } = canvas
    const gradient = context.createRadialGradient(
      this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius,
    )
    gradient.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${this.opacity})`)
    gradient.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`)
    context.fillStyle = gradient
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }

  move(canvas: Canvas) {
    const { width, height } = canvas
    this.x += this.speed.x * this.acc.x
    this.y += this.speed.y * this.acc.y
    this.acc.x += Math.random() < 0.5 ? 0.01 : -0.01
    if (this.acc.x < 0.5) {
      this.acc.x = 0.5
    }
    if (this.acc.x > 1.5) {
      this.acc.x = 1.5
    }
    this.acc.y += Math.random() < 0.5 ? 0.01 : -0.01
    if (this.acc.y < 0.5) {
      this.acc.y = 0.5
    }
    if (this.acc.y > 1.5) {
      this.acc.y = 1.5
    }
    if (this.x > width) {
      this.speed.x *= -1
    }
    if (this.x < 0) {
      this.speed.x *= -1
    }
    if (this.y > height) {
      this.speed.y *= -1
    }
    if (this.y < 0) {
      this.speed.y *= -1
    }
  }
}
