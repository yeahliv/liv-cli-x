#! /usr/bin/env node

const program = require('commander');
const download = require('download-git-repo');
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const ask = require('./lib/ask')

const spinner = ora('Loading unicorns');

program.version('v1.0.0', '-v, --version')
  .command('init [pprojectname]')
  .action(async (projectname) => {

    let cwd = process.cwd()
    let cwdParse = process.cwd().split('\\')
    let cwdName = cwdParse[cwdParse.length - 1]

    // Config
    let config = {
      generate_cur: false,
      path: process.cwd(),
      template: 'vue-h5-tpl-x',
      name: cwdName
    }


    if (projectname === undefined) {
      // Project name not exists

      // Whether to build the project in the current directory
      let res = await inquirer.prompt(ask.generate_cur)

      // The current directory generates the project
      config.generate_cur = res.generate_cur
    } else {
      // Project name exists

      if (fs.existsSync(path.join(process.cwd(), projectname))) {

        // Rename project
        let res = await inquirer.prompt(ask.project_name)

        // Project path
        config.path = path.join(process.cwd(), res.project_name)

        // Project name
        config.name = res.project_name
      } else {

        // Project path
        config.path = path.join(process.cwd(), projectname)

        // Project path
        config.name = projectname
      }
    }

    // Select the template that you want to pull
    let res = await inquirer.prompt(ask.select_template)
    config.template = res.select_template

    // Tips to download animation
    spinner.start('Downloading...')


    download(`github:yeahliv/${config.template}`, config.path, error => {

      // error
      if (error) {
        return console.log(chalk.redBright('\n  Failure!'))
      }

      // Close download spinner
      spinner.stop()

      // Complete
      console.log(chalk.hex('#00FF00').bold('\n    Complete!'))

      if (config.path != process.cwd()) {
        console.log(chalk.hex('#00F5FF').bold(`\n    cd ${config.name}`))
      }
      console.log(chalk.hex('#00F5FF').bold('\n    npm install'))
      console.log(chalk.hex('#00F5FF').bold('\n    npm run dev'))
    })
  })

program.parse(process.argv)
