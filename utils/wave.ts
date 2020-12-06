function getWaveColor(): string {
  // selected from [iroiro](https://github.com/antfu/iroiro)
  // script: npx iroiro blue
  const SEA_COLOR_SET = {
    SEIJI: '#69B0AC',
    MIZUASAGI: '#66BAB7',
    BYAKUGUN: '#78C2C4',
    KAMENOZOKI: '#A5DEE4',
    MIZU: '#81C7D4',
  }
  const ranIdx = Math.floor(Math.random() * 4)
  return Object.values(SEA_COLOR_SET)[ranIdx]
}

class Wave {
  ctx
  color: string
  force: number
  wavePower: number
  count: number
  y: number
  alpha: number

  constructor($canvas, $y, $color) {
    this.ctx = $canvas.getContext('2d')
    this.color = $color
    this.force = 1
    this.wavePower = 40
    this.count = $y
    this.y = $y
    this.alpha = 0.1
  }

  draw() {
    this.ctx.fillStyle = this.color + '3A'
    this.ctx.beginPath()
    this.ctx.quadraticCurveTo(
      Waves.width / 4,
      this.y + this.wavePower * this.force,
      Waves.width / 2,
      this.y
    )
    this.ctx.quadraticCurveTo(
      Waves.width * 0.75,
      this.y - this.wavePower * this.force,
      Waves.width,
      this.y
    )
    this.ctx.lineTo(Waves.width, 0)
    this.ctx.lineTo(0, 0)
    this.ctx.lineTo(0, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

export default class Waves {
  ctx
  numberOfWaves: number
  waveGap: number
  move: number
  color: string
  wavesArr
  beginingY: number

  static width
  static height
  static globalY

  constructor($canvas, $width, $height, { numberOfWaves = 5, waveGap = 20 }) {
    this.numberOfWaves = numberOfWaves
    this.waveGap = waveGap

    Waves.width = $width
    Waves.height = $height
    Waves.globalY = $height / 3

    this.move = 1
    this.ctx = $canvas.getContext('2d')
    this.ctx.translate(0, Waves.height)
    this.ctx.scale(1, -1)

    this.wavesArr = new Array()

    this.beginingY = Waves.globalY
    while (this.numberOfWaves--) {
      this.wavesArr.push(new Wave($canvas, this.beginingY, getWaveColor()))
      this.beginingY += this.waveGap
    }
  }

  draw() {
    // this.ctx.save()
    var len = this.wavesArr.length
    while (len--) {
      this.wavesArr[len].draw()
    }
    // this.ctx.restore()
  }
}
