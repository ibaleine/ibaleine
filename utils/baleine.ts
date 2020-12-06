export default class Baleine {
  ctx
  x: number
  y: number
  imgSrc: string

  constructor($canvas, $x, $y) {
    this.ctx = $canvas.getContext('2d')
    this.x = $x
    this.y = $y
    this.imgSrc = '/ibaleine.svg'
  }
}
