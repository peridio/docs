#!/usr/bin/env node

const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const BASE_DOCS_DIR = path.resolve(
  __dirname,
  '..',
  'docs',
  'avocado-linux',
  'tools',
  'avocado-cli',
  'commands'
)

function getSection(section, str) {
  const reCommandsSection = new RegExp(`${section}:\n((?: {2}.*\n)*)`, 'g')
  const commandSection = [...str.matchAll(reCommandsSection)]
  if (commandSection.length === 0) {
    return ''
  }
  return commandSection[0][1]
}

function getSubCommands(help) {
  const commandsSection = getSection('Commands', help)
  const reCommandNames = /([\w-]+).*/g
  return [...commandsSection.matchAll(reCommandNames)]
    .map(([, subCommand]) => subCommand)
    .filter((subCommand) => subCommand !== 'help')
}

function writeCommandGroup(cmd, subCommands) {
  const dirPath = path.join(BASE_DOCS_DIR, ...cmd)
  fs.mkdir(dirPath, (err) => {
    if (err) {
      if (err.code !== 'EEXIST') {
        return err
      }
    }
    return subCommands.map((subCommand) => processCommandHelp([...cmd, subCommand]))
  })
}

function writeCommand(cmd, help) {
  const filePath = path.join(BASE_DOCS_DIR, ...cmd)
  const fileContent = `\`\`\`\n${help}\n\`\`\``
  fs.writeFile(`${filePath}.md`, fileContent, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

function processCommandHelp(cmd) {
  exec(`${['avocado', ...cmd].join(' ')} --help`, (_error, stdout) => {
    const help = stdout
    const subCommands = getSubCommands(help)
    if (subCommands.length >= 1) {
      writeCommandGroup(cmd, subCommands)
    } else {
      writeCommand(cmd, help)
    }
  })
}

exec('avocado upgrade', (_error, stdout) => {
  const latest = 'CLI already up to date'

  if (stdout.includes(latest)) {
    processCommandHelp([])
  } else {
    console.error('You must update your Avocado CLI before generating docs')
  }
})
