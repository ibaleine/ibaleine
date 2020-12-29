import rough from 'roughjs'
import Wave from './wave'

function getStartY(innerHeight = 1080) {
  return (innerHeight * 2) / 5
}

function getEndY(innerHeight = 1080) {
  return innerHeight / 4
}

export default class Animation {
  generator
  numberOfWaves: number
  waveList: Array<Wave>

  static startY = getStartY()
  static endY = getEndY()
  static step = 0.3

  constructor(domRef, numberOfWaves: number) {
    const roughtCanvas = rough.canvas(domRef)
    this.generator = roughtCanvas.generator
    this.waveList = []
    this.numberOfWaves = numberOfWaves
    for (let i = 0; i < numberOfWaves; i++) {
      // draw sine curve
      let points = []
      for (let i = 0; i < 20; i++) {
        let x = (400 / 20) * i + 10
        let xdeg = (Math.PI / 100) * x
        let y = Math.round(Math.sin(xdeg) * 90) + 500
        points.push([x, y])
      }

      const wave = new Wave(this.generator, points)
      this.waveList.push(wave)
    }
  }

  animate() {
    this.waveList.forEach(w => {
      w.draw()
    })
  }

  start() {
    this.animate()
    requestAnimationFrame(() => {
      this.start()
    })
  }
}
