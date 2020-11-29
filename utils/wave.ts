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

function Wave($canvas, $y, $color) {
  this.ctx = $canvas.getContext('2d')
  this.force = 0
  this.wavePower = 40
  this.count = $y
  this.y = $y + Waves.globalY
  this.alpha = 0.1

  this.update = function () {
    this.y = $y + Waves.globalY
    this.force = Math.sin(this.count)
    this.count += 0.05
  }

  this.draw = function () {
    this.ctx.fillStyle = $color + '1A'
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.y)
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
    this.ctx.lineTo(Waves.width, Waves.height)
    this.ctx.lineTo(0, Waves.height)
    this.ctx.lineTo(0, this.y)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

export default class Waves {
  ctx
  numberOfWaves: number
  waveGap
  move
  color
  wavesArr
  beginingY

  static width
  static height
  static globalY

  constructor($canvas, $width, $height, { numberOfWaves = 5, waveGap = 20 }) {
    this.numberOfWaves = numberOfWaves
    this.waveGap = waveGap

    Waves.width = $width
    Waves.height = $height
    Waves.globalY = 0

    this.move = 1
    this.ctx = $canvas.getContext('2d')

    this.color = getWaveColor()

    this.wavesArr = new Array()

    this.beginingY = 0
    while (this.numberOfWaves--) {
      this.wavesArr.push(new Wave($canvas, this.beginingY, getWaveColor()))
      this.beginingY += this.waveGap
    }
    console.log(this.wavesArr)
  }

  update() {
    var len = this.wavesArr.length
    while (len--) {
      this.wavesArr[len].update()
    }
    Waves.globalY += this.move
    if (Waves.globalY > Waves.height / 2 - 50) {
      this.move = -1
    } else if (Waves.globalY < -(Waves.height / 2)) {
      this.move = 1
    }
  }

  draw() {
    this.ctx.save()
    var len = this.wavesArr.length
    while (len--) {
      this.wavesArr[len].draw()
    }
    this.ctx.restore()
  }
}