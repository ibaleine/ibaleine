import rough from 'roughjs'
import { getWaveColor } from './tool'

export default class Wave {
  generator
  points: Array<number>

  constructor(generator, points) {
    this.generator = rough.canvas(generator)
  }

  draw() {
    this.generator.curve(this.points, { fill: getWaveColor() })
  }
}
