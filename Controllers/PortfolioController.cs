using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JulhashWebsite.Models;
using System.Configuration;
using JulhashWebsite.Helpers;

namespace JulhashWebsite.Controllers
{
    public class PortfolioController : Controller
    {
      static string xmlPath = ConfigurationManager.AppSettings["PortfolioXMLPath"].ToString();

        JulhashRepository julhashRepository = new JulhashRepository(xmlPath);


        public ActionResult Index(int? page)
        {
            //
            // GET: /Portfolio/Page/2

            const int pageSize = 15;

            var Portfolios = julhashRepository.GetPortfolios();
            //var paginatedImages = images.Skip((page ?? 0) * pageSize).Take(pageSize).ToList();

            var paginatedPortfolios = new PaginatedList<Portfolio>(Portfolios, page ?? 0, pageSize);
            return View(paginatedPortfolios);
        }
    }
}
