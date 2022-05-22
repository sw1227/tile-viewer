export const TILE_CATALOG = {
  hillshademap: {
    name: '陰影起伏図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png',
  },
  pale: {
    id: '',
    name: '淡色地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
  },
  std: {
    name: '標準地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  },
  blank: {
    name: '白地図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
  },
  seamlessphoto: {
    name: '航空写真',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
  },
  relief: {
    name: '色別標高図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
  },
  slopemap: {
    name: '傾斜量図',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png',
  },
  anaglyphmap_color: {
    name: 'アナグリフ',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/anaglyphmap_color/{z}/{x}/{y}.png',
  },
  lcm25k_2012: {
    name: '[一部地域のみ] 数値地図25000（土地条件）',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png',
  },
  lcmfc2: {
    name: '[一部地域のみ] 治水地形分類図 更新版（2007～2020年）',
    url: 'https://cyberjapandata.gsi.go.jp/xyz/lcmfc2/{z}/{x}/{y}.png',
  },
} as const

export type TileId = keyof typeof TILE_CATALOG
