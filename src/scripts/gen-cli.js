const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

function getSection(section, str) {
  const reCommandsSection = new RegExp(`${section}:\\n((?: {2}.*\\n)*)`, 'g')
  const commandSection = [...str.matchAll(reCommandsSection)]
  if (commandSection.length === 0) {
    return ''
  }
  return commandSection[0][1]
}

function getSubCommands(help) {
  const commandsSection = getSection('Commands', help)
  const reCommandNames = /([\w-]+).*/g
  return [...commandsSection.matchAll(reCommandNames)].map(([, subCommand]) => subCommand).filter((subCommand) => subCommand !== 'help')
}

function writeCommandGroup(cmd, subCommands) {
  const dirPath = path.join('docs', 'cli', ...cmd)
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
  const filePath = path.join('docs', 'cli', ...cmd)
  const fileContent = `\`\`\`\n${help}\n\`\`\``
  fs.writeFile(`${filePath}.md`, fileContent, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

function processCommandHelp(cmd) {
  exec(`${['peridio', ...cmd].join(' ')} --help`, (_error, stdout) => {
    const help = stdout
    const subCommands = getSubCommands(help)
    if (subCommands.length >= 1) {
      writeCommandGroup(cmd, subCommands)
    } else {
      writeCommand(cmd, help)
    }
  })
}

exec('peridio --version', (_error, stdout) => {
  const requiredVersion = 'peridio 0.8.0 81541cb'
  if (stdout.includes(requiredVersion)) {
    processCommandHelp([])
  } else {
    console.error(`Your local Peridio CLI has version (${stdout.trim()}) but this script requires version (${requiredVersion})`)
  }
})
