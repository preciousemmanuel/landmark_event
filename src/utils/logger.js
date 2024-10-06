const { createLogger, format, transports } = require("winston");
const AWS = require("aws-sdk");
const WinstonCloudWatch = require("winston-cloudwatch");
const {
  CLOUDWATCH_GROUP_NAME,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  NODE_ENV,
} = process.env;

AWS.config.update({ region: AWS_REGION });
console.log("groupname", CLOUDWATCH_GROUP_NAME)

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});


  const cloudwatchConfig = {
    logGroupName: CLOUDWATCH_GROUP_NAME,
    logStreamName: `${CLOUDWATCH_GROUP_NAME}-event`,
    awsAccessKeyId: AWS_ACCESS_KEY_ID,
    awsSecretKey: AWS_SECRET_ACCESS_KEY,
    awsRegion: AWS_REGION,
    messageFormatter: ({ level, message, additionalInfo }) =>
      `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
        additionalInfo
      )}}`,
  };
  logger.add(new WinstonCloudWatch(cloudwatchConfig));


module.exports = logger;
