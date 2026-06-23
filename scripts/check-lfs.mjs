#!/usr/bin/env node
// Build guard: make sure the Git-LFS-tracked portfolio PDFs are *real* files, not
// unresolved LFS pointer stubs. A CI without LFS fetched (e.g. Vercel with Git LFS
// disabled) would otherwise silently ship 133-byte pointer files where the embedded
// PDFs should be — so we attempt `git lfs pull` once, then fail loud if any remain.
import { openSync, readSync, closeSync, readdirSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const DIR = 'public/media/pdf'
const POINTER_PREFIX = 'version https://git-lfs.github.com/spec/v1'

const listPdfs = () =>
  existsSync(DIR)
    ? readdirSync(DIR).filter(f => f.endsWith('.pdf')).map(f => join(DIR, f))
    : []

const head = (file, n = 64) => {
  const fd = openSync(file, 'r')
  try {
    const buf = Buffer.alloc(n)
    const len = readSync(fd, buf, 0, n, 0)
    return buf.subarray(0, len).toString('utf8')
  } finally {
    closeSync(fd)
  }
}

const isPointer = file => head(file).startsWith(POINTER_PREFIX)

const files = listPdfs()
if (files.length === 0) {
  console.log(`[check-lfs] no PDFs under ${DIR} — skipping`)
  process.exit(0)
}

let pointers = files.filter(isPointer)
if (pointers.length > 0) {
  console.log(`[check-lfs] ${pointers.length} unresolved LFS pointer(s); attempting "git lfs pull"…`)
  try {
    execSync('git lfs pull', { stdio: 'inherit' })
  } catch {
    // verification below will report and exit
  }
  pointers = listPdfs().filter(isPointer)
}

if (pointers.length > 0) {
  console.error('\n[check-lfs] ERROR: Git LFS objects were not fetched. Still pointer files:')
  for (const f of pointers) {
    console.error(`  - ${f}`)
  }
  console.error('\nFix: install git-lfs and run "git lfs pull" before building.')
  console.error('On Vercel: enable Settings → Git → Git LFS, then redeploy.\n')
  process.exit(1)
}

console.log(`[check-lfs] OK — ${files.length} PDF(s) resolved (not LFS pointers).`)
