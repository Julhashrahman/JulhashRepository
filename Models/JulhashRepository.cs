using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;


namespace JulhashWebsite.Models
{
    public class JulhashRepository
    {
        private string _path = string.Empty;

        public JulhashRepository(string path)
        {
            _path = HttpContext.Current.Server.MapPath(path);
        }

        public IQueryable<Portfolio> GetPortfolios()
        {  
            XElement doc = XElement.Load(_path);
           return(from imgs in doc.Descendants("Image")
                         select new Portfolio
                         {
                             ID = Convert.ToInt32(imgs.Element("ImageID").Value.ToString()),
                             Category = imgs.Element("Category").Value.ToString(),
                             Path = imgs.Element("Path").Value.ToString(),
                             Title = imgs.Element("Title").Value.ToString(),
                             Caption = imgs.Element("Caption").Value.ToString(),
                             SortOrder = Convert.ToInt32(imgs.Element("SortOrder").Value.ToString())
                         }).AsQueryable();

        }

    }
}