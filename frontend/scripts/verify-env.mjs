/**
 * Vite는 `vite` / `vite dev` → mode development, `vite build` → mode production.
 * loadEnv(mode)로 같은 규칙으로 읽는지 확인한다.
 */
import { loadEnv } from 'vite'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const dev = loadEnv('development', root, '')
const prod = loadEnv('production', root, '')

const wantDev = 'development-file'
const wantProd = 'production-file'
const key = 'VITE_ENV_CHECK'

const gotDev = dev[key]
const gotProd = prod[key]

const fail = (msg) => {
  console.error(msg)
  console.error(
    '\nfrontend/.env.development 과 .env.production 에 다음을 넣거나,\n' +
      '.env.development.example / .env.production.example 을 복사하세요.\n',
  )
  process.exit(1)
}

if (gotDev !== wantDev) {
  fail(
    `[development] ${key} 기대값 ${JSON.stringify(wantDev)}, 실제 ${JSON.stringify(gotDev)}`,
  )
}
if (gotProd !== wantProd) {
  fail(
    `[production] ${key} 기대값 ${JSON.stringify(wantProd)}, 실제 ${JSON.stringify(gotProd)}`,
  )
}

console.log('OK: development → .env.development*, production → .env.production* (Vite 규칙과 동일)')
