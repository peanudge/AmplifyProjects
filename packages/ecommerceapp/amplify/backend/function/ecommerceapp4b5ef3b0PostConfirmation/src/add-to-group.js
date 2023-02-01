const aws = require("aws-sdk");

const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  let isAdmin = false;
  const adminEmails = ["dabit3@gmail.com"];

  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true;
  }

  if (!isAdmin) return;

  const groupParams = {
    GroupName: "Admin",
    UserPoolId: event.userPoolId,
  };
  const userParams = {
    UserPoolId: event.userPoolId,
    Username: event.userName,
    GroupName: "Admin",
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoidentityserviceprovider
    .adminAddUserToGroup(userParams)
    .promise();
  return event;
};
