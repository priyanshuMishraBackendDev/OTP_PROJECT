const _ = require('lodash');
const fs = require('fs');
const bodyParser = require('body-parser');
const excluded = ['index'];

/**
 * reqDataToLog - request data to log format
 *
 * @param  {type} req description
 * @return {type}     description
 */
function reqDataToLog(req) {
  const bodyClone = Object.assign({}, req.body);
  delete bodyClone.password;
  const id = req.session ? req.session.userId : null;

  return {
    userId: id,
    url: req.url,
    method: req.method,
    body: bodyClone,
    params: JSON.stringify(req.params),
    query: JSON.stringify(req.query),
  };
}


const loadDirectory = (app, path) => {
  const dirbase = __dirname + (path || '');

  fs.readdirSync(dirbase).forEach(function(file) {
    // Remove extension from file name
    const fileOrFolderName = file.split('.')[0];
    const fileType = _.last(file.split('.'));
    const absolutePath = dirbase + '/' + file;
    const isDir = fs.lstatSync(absolutePath).isDirectory();

    const apiPath = (path || '') + '/' + fileOrFolderName;
    const filepath = '.' + path + '/' + file;
    // Only load files that aren't directories and aren't blacklisted
    if (isDir && fileOrFolderName !== 'env') {
      loadDirectory(app, path + '/' + fileOrFolderName);
    } else if (!fs.lstatSync(dirbase + '/' + file).isDirectory() &&
        !_.includes(excluded, fileOrFolderName) &&
        fileType === 'js') {
      console.log( // eslint-disable-line
          '[ROUTE]',
          apiPath,
      );
      console.log(apiPath + '/' + filepath)
      app.use(
          apiPath,
          require(filepath)
      );
    }
  });
};

module.exports = function(app) {
  app.use(bodyParser.json());

  app.get('/status', (req, res) => {
    const uptime = {uptime: 0};
    try {
      uptime.uptime = process.uptime();
      uptime.pid = process.pid;
      uptime.memory = process.memoryUsage();
      uptime.version = process.env.IMAGE_COMMIT;
      res.status(200).json(uptime);
    } catch (e) {
      return res.status(500).send();
    }
  });

  loadDirectory(app, '');
};
