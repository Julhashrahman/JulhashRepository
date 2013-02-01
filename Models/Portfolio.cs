using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JulhashWebsite.Models
{
    public class Portfolio
    {
        public int ID { get; set; }

        public string Category { get; set; }

        public string Path { get; set; }

        public string Title { get; set; }

        public string Caption { get; set; }

        public int SortOrder { get; set; }

    }
}