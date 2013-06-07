using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JulhashWebsite.Helpers;

namespace JulhashWebsite.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            //new EmailHelper().SendMail("julhash.rahman@gmail.com","julhash.rahman@gmail.com","","testing","my testing");

            return View();
        }

    }
}
