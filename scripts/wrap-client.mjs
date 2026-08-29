/**
 * Wrap the tsup-emitted CJS client bundle (lib/client.cjs) in the DSH
 * client-loader protocol. DSH loads a client via
 * window.__ModuleLoader__.load({ id, factory }), where factory receives
 * require() and returns module.exports.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(path.join(here, '..', 'package.json'), 'utf8'))
const srcCjs = path.join(here, '..', 'lib', 'client.cjs')
const outJs = path.join(here, '..', 'lib', 'client.js')

const cjs = readFileSync(srcCjs, 'utf8')
const NL = String.fromCharCode(10)
const wrapped = [
  'window.__ModuleLoader__.load({',
  '  id: ' + JSON.stringify(pkg.name) + ',',
  '  factory: (require) => {',
  '    var module = { exports: {} };',
  '    var exports = module.exports;',
  indent(cjs, 2),
  '    return module.exports;',
  '  }',
  '});'
].join(NL)

writeFileSync(outJs, wrapped + NL)
rmSync(srcCjs, { force: true })
console.log('wrapped lib/client.js for', pkg.name)

function indent(src, n) {
  const pad = '  '.repeat(n)
  return src
    .split('\n')
    .map((l) => (l.trim() ? pad + l : l))
    .join('\n')
}
