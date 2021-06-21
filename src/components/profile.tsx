import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile.module.scss'

interface Canvas {
  context: CanvasRenderingContext2D
  width: number
  height: number
  buffer: number[][]
  min: number
  max: number
}

export default function Profile({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const ref = useRef<HTMLCanvasElement>()

  const data: {
    animation: number
    particleCount: number
    particles: Particle[]
  } = {
    animation: null,
    particleCount: 1000,
    particles: [],
  }

  const canvas: Canvas = {
    context: null,
    width: null,
    height: null,
    buffer: null,
    min: null,
    max: null,
  }

  const loadImage = () => new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.src = '/images/profile.jpg'
    image.onload = () => resolve(image)
  })

  const initialize = async () => {
    const image = await loadImage()
    const { context, width, height } = canvas
    context.drawImage(image, 0, 0, width, height)
    const imageData = context.getImageData(0, 0, width, height)
    const { data } = imageData

    const mapping = []

    for (let y = 0; y < height; y++) {
      const row = []
      for (let x = 0; x < width; x++) {
        const r = data[y * 4 * width + x * 4]
        const g = data[y * 4 * width + (x * 4 + 1)]
        const b = data[y * 4 * width + (x * 4 + 2)]
        const brightness = Math.sqrt(
          r * r * 0.299 + g * g * 0.587 + b * b * 0.114,
        ) / 100
        if (!canvas.min || brightness < canvas.min) {
          canvas.min = brightness
        }
        if (!canvas.max || brightness > canvas.max) {
          canvas.max = brightness
        }
        row.push(brightness)
      }
      mapping.push(row)
    }

    canvas.buffer = mapping
    initializeParticles()
  }

  const initializeCanvas = () => {
    canvas.context = ref.current.getContext('2d')
    ref.current.width = width
    ref.current.height = height
    canvas.width = ref.current.width
    canvas.height = ref.current.height
  }

  const initializeParticles = () => {
    for (let i = 0; i < data.particleCount; i++) {
      data.particles.push(new Particle(canvas))
    }
  }

  const animate = () => {
    data.animation = requestAnimationFrame(animate)
    canvas.context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    )
    data.particles.forEach((value) => {
      value.update()
      value.draw()
    })
  }

  useEffect(() => {
    initializeCanvas()
    initialize()
    data.animation = requestAnimationFrame(animate)
  }, [])

  return (
    <figure className={styles.container}>
      <canvas ref={ref} />
    </figure>
  )
}

class Particle {
  private canvas: Canvas
  private x: number
  private y: number
  public speed: number
  private velocity: number
  private size: number

  constructor(canvas: Canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = 0
    this.speed = 0
    this.velocity = Math.random() * 1
    this.size = 1
  }

  public update() {
    const position = {
      x: Math.floor(this.x),
      y: Math.floor(this.y),
    }
    this.speed = this.canvas.buffer[position.y][position.x]

    this.y += (this.canvas.max - this.speed) * this.velocity
    if (this.y >= this.canvas.height) {
      this.y = 0
      this.x = Math.random() * this.canvas.width
    }
  }

  public draw() {
    const { context } = this.canvas
    context.globalAlpha = (this.speed / this.canvas.max)
    context.fillStyle = 'rgb(35, 86, 210)'
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fill()
  }
}
