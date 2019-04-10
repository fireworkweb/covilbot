const find = require('local-devices');

module.exports = {
  command: 'online',
  desc: 'Gets a list of who is online',
  aliases: ['online'],
  handler: function (argv) {
    find().then(device => {
      console.log(argv)
      console.log(device)
    });
    // if (argv.db.settings.history === true) {
    //   argv.db.updateHistoryState()
    // }
    // argv.db.post(argv.db.attachments.state(argv.db.state))
  }
}
