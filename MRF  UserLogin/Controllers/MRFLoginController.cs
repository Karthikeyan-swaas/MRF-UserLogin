using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MRF__UserLogin.Models;

namespace MRF__UserLogin.Controllers
{
    public class MRFLoginController : Controller
    {

        MRFLoginDal mrfDb = new MRFLoginDal();
        // GET: MRFLogin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MRFIndex(string Email)
        {
            ViewBag.UserName = Email;
            return View();
        }

        public JsonResult Add(MrfLoginModel mrf)
        {

            return Json(mrfDb.Add(mrf), JsonRequestBehavior.AllowGet);
        }

        public JsonResult MrfList()
        {
            return Json(mrfDb.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int id)
        {
            var MRF = mrfDb.ListAll().Find(x => x.id.Equals(id));
            return Json(MRF, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateRequest(int ID, int Reqstatus)
        {
            return Json(mrfDb.UpdateRequest(ID, Reqstatus), JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckingloginDetails(string Email, string password)
        {
            ViewBag.Userid = Email;
            return Json(mrfDb.CheckingloginDetails(Email, password), JsonRequestBehavior.AllowGet);
        }
        //welcome to project bro//

    }
}