import { useEffect } from 'react'
import Waves from '../utils/wave'

import styles from '../styles/Home.module.css'

export default function WaveCanvas() {
  useEffect(() => {
    const canvasRef = document.querySelector('canvas')
    const waves = new Waves(canvasRef, window.innerWidth, window.innerHeight, {
      numberOfWaves: 1,
      waveGap: 10
    })
    waves.draw()
    // requestAnimationFrame(() => {
    //   // waves.update()
    //   waves.draw()
    // })
  }, [])

  return (
    <canvas className={styles.fountain} />
  )
}