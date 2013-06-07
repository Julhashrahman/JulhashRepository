using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mail;
using System.Net.Mail;
using RestSharp;

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
                smtpClient.Host = "smtp.mailgun.org";   // We use gmail as our smtp client
                smtpClient.Port = 587;                
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = new System.Net.NetworkCredential("postmaster@app17685.mailgun.org", "7x778e-84zt4");

                smtpClient.Send(message);
                msg = "Successful<br/>";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public static IRestResponse SendSimpleMessage(string from, string subject, string body)
        {
            RestClient client = new RestClient();
            client.BaseUrl = "https://api.mailgun.net/v2";
            client.Authenticator =
                    new HttpBasicAuthenticator("api",
                                               "key-4cu69owqyama83tn5y6t-3fau9y2fm89");
            RestRequest request = new RestRequest();
            request.AddParameter("domain",
                                 "app17685.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", from);
            request.AddParameter("to", "julhash.rahman@gmail.com");
            //request.AddParameter("to", "julhash.rahman@gmail.com");
            request.AddParameter("subject", subject);
            request.AddParameter("text", body);
            request.Method = Method.POST;
            return client.Execute(request);
        }

    }
}