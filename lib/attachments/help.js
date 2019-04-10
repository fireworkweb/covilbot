module.exports = function (commands, settings) {
  function formatCommand (command) {
    return {
      usage: `Usage: ${command.command}`,
      options: command.builder ? Object.keys(command.builder).map(function (key) {
        let opt = command.builder[key]
        let str = `--${key}`
        if (opt.alias) {
          str = `${str}, -${opt.alias}`
        }
        if (opt.desc) {
          str = `${str}, ${opt.desc}`
        }
        let info = ['type', 'default', 'choices'].filter(key => opt[key]).reduce((obj, key) => {
          obj[key] = opt[key]
          return obj
        }, {})
        return {
          spec: str,
          info: info
        }
      }) : []
    }
  }

  if (commands.length === 1) {
    let command = commands.pop()
    let info = formatCommand(command)
    return [{
      'fallback': command.command,
      'color': settings.color,
      'pretext': info.usage,
      'title': command.command,
      'text': command.desc,
      'fields': info.options.concat([{ spec: '--help, -h, Prints this information' }]).map(option => {
        return {
          'title': option.spec,
          'value': option.info && Object.keys(option.info).length > 0 ? JSON.stringify(option.info) : '',
          'short': false
        }
      })
    }]
  } else {
    let usage = 'Usage: <command> [options]'
    return [{
      'fallback': usage,
      'color': settings.color,
      'pretext': 'covilbot',
      'title': usage,
      'fields': commands.map(command => {
        return {
          'title': command.command,
          'value': command.desc,
          'short': false
        }
      })
        .concat({
          'title': '--help, -h, Prints this information',
          'short': false
        })
    }]
  }
}
