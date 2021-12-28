using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MRF__UserLogin.Models
{
    public class MrfLoginModel
    {
        public  string Userid { get; set;}
        public int id { get; set; }
        public string PositionName { get; set; }
        public DateTime MRFCreatedDate { get; set; }
        public int MRFCreatedBy { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Positiontobefilledbefore { get; set; }
        public int VacancyFor { get; set; }
        public string Vacancy { get; set; }
        public int VacancyType { get; set; }
        public string MrfVacancyType { get; set; }
        public string Territory_HQ { get; set; }
        public string DivisionName { get; set; }
        public int Minyrs { get; set; }
        public int Maxyrs { get; set; }
        public int Maxctc { get; set; }
        public int Minctc { get; set; }
        public string AdditionalRequirement { get; set; }
        public string status { get; set; }
        public int Reqstatus { get; set; }
    //hibro//
}
}