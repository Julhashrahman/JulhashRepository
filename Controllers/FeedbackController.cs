using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JulhashWebsite.Models;
using JulhashWebsite.Helpers;

namespace JulhashWebsite.Controllers
{
    public class FeedbackController : Controller
    {
        //
        // GET: /Feedback/

        public ActionResult Index()
        {
            var initialState = new [] {
                new FeedbackModel {FirstName="", LastName="", Email="", Message=""}
                };

            return View(initialState);
        }

        [HttpPost]
        public ActionResult Index([FromJson] IEnumerable<FeedbackModel> feedbacks)
        { 

            FeedbackModel feedbackModel = feedbacks.FirstOrDefault();

            new EmailHelper().SendMail(feedbackModel.Email, "julhash.rahman@gmail.com", "", "Feedback from user", feedbackModel.Message);
        
            ViewBag.Message = "You feedback has been sent successfully.";

            return View(feedbacks);


        }


    }
}
