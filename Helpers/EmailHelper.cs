using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mail;
using System.Net.Mail;

namespace JulhashWebsite.Helpers
{
    public class EmailHelper
    {

        public string SendMail(string toList, string from, string ccList, string subject, string body)
        {

            MailMessage message = new MailMessage();
            SmtpClient smtpClient = new SmtpClient();
            string msg = string.Empty;
            try
            {
                MailAddress fromAddress = new MailAddress(from);
                message.From = fromAddress;
                message.To.Add(toList);
                if (ccList != null && ccList != string.Empty)
                    message.CC.Add(ccList);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = body;
                smtpClient.Host = "smtp.gmail.com";   // We use gmail as our smtp client
                smtpClient.Port = 587;
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = new System.Net.NetworkCredential("julhash.rahman", "japlin80");

                smtpClient.Send(message);
                msg = "Successful<br/>";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

    }
}