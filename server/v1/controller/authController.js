const { request } = require("http");
const CONFIG = require("../../utils/appConfig");
const bcrypt = require("bcrypt");
const userService = require("../service/authQuery");
const BycrpytService = require("../service/bycrpty.service");
const jwtService = require("../service/jwt.service");
const sendEmail = require("../../utils/nodemailer");
const jwt = require("jsonwebtoken");
const generateCustomPassword = require('../../utils/passwordGenerator');
const randomNumberGenerator = require("../../utils/randomNumberGenerator");
const serialize = require('php-serialize');
const authController = {
  async signUp(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      console.log("HELLO")
      const userCheck = await userService().getUserByEmail(email);
      if (userCheck) {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.EMAIL_ALREADY_EXISTS);
      }
      const hashedPassword = await BycrpytService.generatePassword(password);
      if (hashedPassword) {
        const requestObject = {
          user_nicename: first_name + ' ' + last_name,
          display_name: first_name + ' ' + last_name,
          user_email: email,
          user_pass: hashedPassword,
          user_login: first_name + ' ' + last_name,
          user_url: 'j8',
          user_activation_key: 'i',
          user_login: first_name + ' ' + last_name
        };
        console.log(requestObject)
        const userCreated = await userService().createUser(requestObject);
        // console.log("user", userCreated)
        if (userCreated) {
          // Generate the token
          const data = {
            customer: true
          };

          // Convert to PHP serialized format
          const role = serialize.serialize(data);
          const userMetaData = [
            { user_id: userCreated.ID, meta_key: 'nickname', meta_value: first_name + ' ' + last_name },
            { user_id: userCreated.ID, meta_key: 'first_name', meta_value: first_name },
            { user_id: userCreated.ID, meta_key: 'last_name', meta_value: last_name },
            { user_id: userCreated.ID, meta_key: 'description', meta_value: "" },
            { user_id: userCreated.ID, meta_key: 'tqio_capabilities', meta_value: role },
          ]
          for (const data of userMetaData) {
            await userService().saveMetaDataa(data);
          }
          console.log('usermeta', userMetaData)
          const jwtObj = {
            firstName: userCreated?.display_name.split(' ')[0],
            lastName: userCreated?.display_name.split(' ')[1],
            id: userCreated.ID,
            email: email,
            accessToken: "",
            refreshToken: "",
          };
          const token = await jwtService.issueJwtToken(jwtObj);
          const refreshToken = await jwtService.issueJwtRefreshToken(jwtObj);
          jwtObj.accessToken = token;
          jwtObj.refreshToken = refreshToken;
          return res.success(
            CONFIG.SUCCESS_CODE,
            CONFIG.USER_CREATED_SUCCESSFULLY,
            jwtObj
          );
        } else {
          return res.reject(
            CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR,
            CONFIG.ERROR_WHILE_CREATING_USER
          );
        }
      } else {
        return res.reject(
          CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR,
          CONFIG.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
  },
  async customGoogleLogin(req, res) {
    const { token } = req.body;
    const isTokenValid = await jwtService.decodeToken(token)
    if (isTokenValid) {
      const userCheck = await userService().getUserByEmail(isTokenValid.email);
      if (userCheck) {
        const jwtObj = {
          firstName: userCheck.first_name,
          lastName: userCheck.last_name,
          id: userCheck.user_id,
          email: userCheck.email,
          accessToken: "",
          refreshToken: "",
        }
        const token = await jwtService.issueJwtToken(jwtObj);
        const refreshToken = await jwtService.issueJwtRefreshToken(jwtObj);
        jwtObj.accessToken = token;
        jwtObj.refreshToken = refreshToken;
        return res.success(
          CONFIG.SUCCESS_CODE,
          CONFIG.USER_FOUND, {
          token: token,
          refreshToken: refreshToken,
        }
        );
      } else {
        const hashedPassword = await BycrpytService.generatePassword(generateCustomPassword(10));

        const requestObject = {
          first_name: isTokenValid.given_name,
          last_name: isTokenValid.family_name,
          email: isTokenValid.email,
          password: hashedPassword
        }
        const userCreated = await userService().createUser(requestObject);
        if (userCreated) {
          // Generate the token
          const jwtObj = {
            firstName: requestObject.first_name,
            lastName: requestObject.last_name,
            id: userCreated.user_id,
            email: requestObject.email,
            accessToken: "",
            refreshToken: "",
          };
          const token = await jwtService.issueJwtToken(jwtObj);
          const refreshToken = await jwtService.issueJwtRefreshToken(jwtObj);
          jwtObj.accessToken = token;
          jwtObj.refreshToken = refreshToken;
          return res.success(
            CONFIG.SUCCESS_CODE,
            CONFIG.USER_CREATED_SUCCESSFULLY,
            jwtObj
          );
        } else {
          res.reject(CONFIG.INTERNAL_SERVER_ERROR, CONFIG.ERROR_WHILE_CREATING_USER)
        }
      }
    } else {
      res.reject(CONFIG.ERROR_CODE_BAD_REQUEST, CONFIG.INVALID_TOKEN)
    }
  },


  /**
 * @api {post} /api/v1/auth/login LogIn User
 * @apiName LogIn User
 * @apiGroup Users
 * @apiDescription User Service...

 */
  // user_nicename: first_name + ' ' + last_name,
  // display_name: first_name + ' ' + last_name,
  // user_email: email,
  // user_pass: hashedPassword,
  // user_login: first_name + ' ' + last_name,
  // user_url: 'j8',
  // user_activation_key: 'i',
  // user_login: first_name + ' ' + last_name
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userExist = await userService().getUserByEmail(email);
      if (userExist) {
        const verifyPassword = await BycrpytService.comparePassword(
          password,
          userExist.user_pass
        );
        if (verifyPassword) {
          const obj = {
            firstName: userExist.display_name.split(" ")[0],
            lastName: userExist.display_name.split(" ")[1],
            id: userExist.ID,
            email: userExist.user_email,
          };
          const jwtToken = await jwtService.issueJwtToken(obj);
          const refreshToken = await jwtService.issueJwtRefreshToken(obj);

          return res.success(CONFIG.SUCCESS_CODE, CONFIG.USER_FOUND, {
            token: jwtToken,
            id: userExist.ID,
            refreshToken: refreshToken,
          });
        } else {
          return res.reject(CONFIG.SUCCESS_CODE, CONFIG.PASSWORD_INCORRECT);
        }
      } else {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.USER_NOT_FOUND);
      }
    } catch (error) {
      return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
  },
  async resetPassword(req, res) {
    try {
      const { currentPassword, newPassword, email } = req.body;
      const userExist = await userService().getUserByEmail(email);
      if (userExist) {
        const isCurrentPasswordSame = await BycrpytService.comparePassword(
          currentPassword,
          userExist.password
        );
        if (isCurrentPasswordSame) {
          const hashedPassword = await BycrpytService.generatePassword(
            newPassword
          );
          const passwordUpdated = await userService().updateUserPassword(
            hashedPassword,
            email
          );
          if (passwordUpdated) {
            res.success(
              CONFIG.SUCCESS_CODE,
              CONFIG.PASSWORD_SAVED_SUCCESSFULLY
            );
          } else {
            res.reject(
              CONFIG.SUCCESS_CODE,
              CONFIG.ERROR_WHILE_SAVING_THE_PASSWORD
            );
          }
        } else {
          res.reject(
            CONFIG.SUCCESS_CODE,
            CONFIG.CURRENT_PASSWORD_DOES_NOT_MATCH
          );
        }
      } else {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.USER_NOT_FOUND);
      }
    } catch (error) {
      return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
  },
  async sendResetPasswordEmail(req, res) {
    try {
      const { email } = req.body;
      const userExist = await userService().getUserByEmail(email);
      if (userExist) {
        try {
          const otp = randomNumberGenerator();
          const otpSaved = await userService().saveotp(otp, email);
          const mailSent = await sendEmail(
            email,
            "Reset Password",
            `<div>${otp}</div>`
          );
          if (mailSent) {
            return res.success(
              CONFIG.SUCCESS_CODE,
              CONFIG.RESET_PASSWORD_MAIL_SENT_SUCCESSFULLY
            );
          } else {
            return res.reject(
              CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR,
              CONFIG.ERROR_WHILE_SENDING_MAIL
            );
          }
        } catch (error) {
          return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, error.message)
        }
      } else {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.USER_NOT_FOUND);
      }
    } catch (error) {
      return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
  },
  async forgotPassword(req, res) {
    try {
      const { password, email } = req.body;
      const userExist = await userService().getUserByEmail(email);

      if (userExist) {

        const hashedPassword = await BycrpytService.generatePassword(
          password
        );
        const passwordUpdated = await userService().updateUserPassword(
          hashedPassword,
          email
        );
        if (passwordUpdated) {
          return res.success(
            CONFIG.SUCCESS_CODE,
            CONFIG.PASSWORD_SAVED_SUCCESSFULLY
          );
        } else {
          return res.reject(
            CONFIG.SUCCESS_CODE,
            CONFIG.ERROR_WHILE_SAVING_THE_PASSWORD
          );
        }

      } else {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.USER_NOT_FOUND);

      }
    } catch (error) {
      return res.reject(CONFIG.ERROR_CODE_INTERNAL_SERVER_ERROR, CONFIG.INTERNAL_SERVER_ERROR);
    }
  },
  async generateNewAccessToken(req, res) {
    const { token } = req.body;
    try {
      const isTokenValid = await jwtService.verifyJwtRefreshToken(token);
      const obj = {
        firstName: isTokenValid.firstName,
        lastName: isTokenValid.lastName,
        id: isTokenValid.userId,
        email: isTokenValid.email,
      };
      const accessToken = await jwtService.issueJwtToken(obj);
      return res.success(CONFIG.SUCCESS_CODE, { token: accessToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.reject(CONFIG.ERROR_CODE_UNAUTHORIZED, CONFIG.TOKEN_EXPIRED);
      } else {
        return res.reject(CONFIG.ERROR_CODE_UNAUTHORIZED, CONFIG.INVALID_TOKEN);
      }
    }
  },
  async verifyOtp(req, res) {
    const { email, otp } = req.body;
    const userExist = await userService().getOtpByEmail(email);
    if (userExist) {
      console.log(otp, userExist)
      if (otp != userExist.otp) {
        return res.reject(CONFIG.SUCCESS_CODE, CONFIG.OTP_IS_INCORRECT)
      } else if (otp === userExist.otp) {
        await userService().removeOtp(email);
        return res.success(CONFIG.SUCCESS_CODE, CONFIG.OTP_VERIFIED)
      }
    } else {
      return res.reject(CONFIG.SUCCESS_CODE, CONFIG.USER_NOT_FOUND);
    }
  }
};

module.exports = authController;
