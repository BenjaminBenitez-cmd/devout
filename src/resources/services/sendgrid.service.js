const sgMail = require("@sendgrid/mail");
const { default: config } = require("../../config");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sender_email = config.SENDER_EMAIL;

let templates = {
  verification_email: "d-fce4a4bf853e421b8b7614bed46f706f",
  receipt: "d-262d84868da3406f8222cab0ae51dad6",
};

export const sendVerificationMail = (
  receiver_email,
  recipient_name,
  unique_url
) => {
  return new Promise(async (resolve, reject) => {
    const msg = {
      to: receiver_email,
      from: sender_email,
      template_id: templates.verification_email,
      dynamic_template_data: {
        recipient_name: recipient_name,
        unique_url: unique_url,
      },
    };
    try {
      const response = await sgMail.send(msg);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const sendReceiptEmail = (
  receiver_email,
  order_id,
  order_items,
  client_url
) => {
  return new Promise(async (resolve, reject) => {
    const msg = {
      to: receiver_email,
      from: sender_email,
      template_id: templates.receipt,
      dynamic_template_data: {
        order_items: order_items,
        recipient_email: receiver_email,
        order_id: order_id,
        client_url: client_url,
      },
    };
    try {
      const response = await sgMail.send(msg);
      resolve(response);
    } catch (err) {
      reject(err.response.body);
    }
  });
};

const SendGridService = {
  sendVerificationMail,
  sendReceiptEmail,
};

export default SendGridService;
