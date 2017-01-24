using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VirtualMemoryBox.Repository.Abstract;
using VirtualMemoryBox.Domain;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace MemoryBoxGit.Controllers
{
    public class HomeController : Controller
    {
        private IUserRepository _iUser;
        private IDiaryRepository _iDiary;

        public HomeController(IUserRepository userRepo, IDiaryRepository diaryRepo)
        {
            _iUser = userRepo;
            _iDiary = diaryRepo;

        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [AllowAnonymous]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult ChildStart()
        {

            VirtualMemoryBox.Domain.User myUser = new VirtualMemoryBox.Domain.User();
            myUser = _iUser.GetUser(User.Identity.Name);
            ViewData["swatch"] = myUser.Swatch;

            ViewBag.Message = "Child Home Page";

            return View();
        }
        public ActionResult Diary()
        {
            ViewBag.Message = "Diary Page";

            return View();
        }
        public ActionResult MyProfile()
        {
            ViewBag.Message = "Profile Page";

            return View();
        }
        public ActionResult Theme()
        {
            ViewBag.Message = "Theme Choice Page";

            return View();
        }

        public string SaveTheme(string themein)
        {
            _iUser.SaveSwatch(User.Identity.Name, themein);
            return ("it seems to have worked");
        }

        public ActionResult Pending()
        {
            ViewBag.Message = "Your account is yet to be approved by a Social Worker";
            return View();
        }
        public ActionResult Error()
        {
            return View();
        }
        public string GetDiaryEntries(string start, string end)
        {
            //DateTime startdate = Convert.ToDateTime(start + " 00:00:00");
            //DateTime enddate = Convert.ToDateTime(end + " 23:59:59");

            string startdate = start + " 00:00:00";
            string enddate = end + " 23:59:59";

            string childID = User.Identity.Name;
            //List<VirtualMemoryBox.Domain.Diary.DiaryEntry> MyDiary = new List<VirtualMemoryBox.Domain.Diary.DiaryEntry>();
            List<VirtualMemoryBox.Domain.Diary.DiaryCal> MyDiary = new List<VirtualMemoryBox.Domain.Diary.DiaryCal>();
            MyDiary = _iDiary.ReturnDiaryEntry(childID, startdate, enddate);



            string myJson = JsonConvert.SerializeObject(MyDiary);
            return myJson;
        }
        [HttpPost, ValidateInput(false)]
        //public string CreateDiaryEntry(string start, string end, string title, string comment, string feeling, int id)
        public string CreateDiaryEntry(Diary.DiaryEntry model)

        {
            VirtualMemoryBox.Domain.Diary.DiaryEntry newEntry = new VirtualMemoryBox.Domain.Diary.DiaryEntry();
            newEntry.id = model.id;
            newEntry.ChildID = User.Identity.Name;
            newEntry.title = model.title;
            newEntry.start = Convert.ToDateTime(model.start);
            newEntry.DiaryText = model.DiaryText;
            newEntry.CreatedDate = DateTime.Now;
            newEntry.CreatedBy = User.Identity.Name;
            newEntry.UpdatedDate = DateTime.Now;
            newEntry.UpdatedBy = User.Identity.Name;
            newEntry.DiaryFeeling = model.DiaryFeeling;
            newEntry.end = Convert.ToDateTime(model.end);
            if (model.id > 0)
            {
                _iDiary.UpdateDiaryEntry(newEntry);
            }
            else
            {
                _iDiary.CreateDiaryEntry(newEntry);
            }

            return "ok";
        }
    }
}