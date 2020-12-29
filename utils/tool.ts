export function getWaveColor(): string {
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
