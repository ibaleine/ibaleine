import { useEffect, useState, useRef } from 'react'
import Waves from '../utils/wave'

import styles from '../styles/Home.module.css'

export default function WaveCanvas() {
  const [innerWidth, setInnerWidth] = useState(1920)
  const [innerHeight, setInnerHeight] = useState(1080)
  const canvasRef = useRef()

  useEffect(() => {
    const onResize = () => {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }

    onResize()

    const waves = new Waves(canvasRef.current, innerWidth, innerHeight, {
      numberOfWaves: 3,
      waveGap: 10,
    })
    waves.draw()

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [innerWidth, innerHeight, canvasRef])

  return (
    <canvas ref={canvasRef} className={styles.fountain} width={innerWidth} height={innerHeight} />
  )
}
