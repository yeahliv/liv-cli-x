const ask = {}

ask.generate_cur = {
  name: 'generate_cur',
  type: 'confirm',
  message: 'Generate project in current directory? (yes/no)'
}

ask.project_name = {
  name: 'project_name',
  type: 'string',
  default: 'projectname',
  message: 'Directory already exists, please use another project name:'
}

ask.select_template = {
  name: 'select_template',
  type: 'list',
  default: 0,
  message: 'Select a template:',
  choices: [
    { name: 'vue-h5-tpl-x', value: 'vue-h5-tpl-x' },
    { name: 'vue-admin-tpl-x', value: 'vue-admin-tpl-x' },
    { name: 'vue-base-tpl-x', value: 'vue-base-tpl-x' }
  ]
}


module.exports = ask