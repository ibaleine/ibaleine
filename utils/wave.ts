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
  wavePower: number
  idx: number = 0
  y: number
  dir: string
  static step: number = 0.3

  constructor($canvas, $y, $color, $index) {
    this.ctx = $canvas.getContext('2d')
    this.color = $color
    this.wavePower = Math.floor((Math.random() + 20) * 3)
    this.y = $y
    this.idx = $index

    this.dir = 'UP'
  }

  draw() {
    this.ctx.fillStyle = this.color + '3A'
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.y)
    this.ctx.quadraticCurveTo(Waves.width / 4, this.y + this.wavePower, Waves.width / 2, this.y)
    this.ctx.quadraticCurveTo(Waves.width * 0.75, this.y - this.wavePower, Waves.width, this.y)
    this.ctx.lineTo(Waves.width, this.y)
    this.ctx.lineTo(Waves.width, Waves.height)
    this.ctx.lineTo(0, Waves.height)
    this.ctx.closePath()
    this.ctx.fill()
  }

  move() {
    if (this.y - Wave.step < Waves.minY) {
      this.dir = 'DOWN'
    } else if (this.y + Wave.step > Waves.maxY) {
      this.dir = 'UP'
    }

    switch (this.dir) {
      case 'UP':
        this.y -= Wave.step
        break
      case 'DOWN':
        this.y += Wave.step
        break
    }

    this.draw()
  }
}

export default class Waves {
  ctx
  numberOfWaves: number
  waveGap: number
  color: string
  wavesArr
  beginingY: number

  static width: number
  static height: number
  static minY: number
  static maxY: number

  constructor($canvas, $width, $height, { numberOfWaves = 5, waveGap = 20 }) {
    this.ctx = $canvas.getContext('2d')
    this.numberOfWaves = numberOfWaves
    this.waveGap = waveGap

    Waves.width = $width
    Waves.height = $height
    Waves.minY = $height / 2
    Waves.maxY = ($height * 3) / 4
    console.log(Waves.height, Waves.minY, Waves.maxY)

    this.wavesArr = new Array()

    this.beginingY = Waves.maxY
    for (let i = 0; i < this.numberOfWaves; i++) {
      this.wavesArr.push(new Wave($canvas, this.beginingY, getWaveColor(), i))
      this.beginingY += this.waveGap
    }

    this.draw()
  }

  draw() {
    var len = this.wavesArr.length
    while (len--) {
      this.wavesArr[len].draw()
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, Waves.width, Waves.height)

    this.wavesArr.forEach(wave => wave.move())

    requestAnimationFrame(() => this.animate())
  }
}
