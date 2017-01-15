using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SketchBoard.Models;
using System.Text;

namespace SketchBoard.Controllers
{
    public class SketchController : Controller
    {
        private SketchBoardContext db = new SketchBoardContext();



        // GET: SketchModels
        public ActionResult Index()
        {
            return View(db.SketchModels.ToList());
        }

        // GET: SketchModels/View/
        [HttpGet, ActionName("View")]
        public ActionResult ViewGet(int ?id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SketchModel sketchModel = db.SketchModels.Find(id);
            if (sketchModel == null)
            {
                return HttpNotFound();
            }
            return View("View",sketchModel);
        }

       
        // GET: SketchModels/New
        public ActionResult New()
        {
            SketchModel sketchModel = new SketchModel();
            return View(sketchModel);
        }

        // POST: SketchModels/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult New(SketchModel sketchModel)
        {
            var password = Request["password"];


            if (ModelState.IsValid)
            {
                sketchModel.PasswordHash = SketchModel.GetHash(password + sketchModel.Salt);
                db.SketchModels.Add(sketchModel);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sketchModel);
        }

        // POST: SketchModels/Delete/
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int? id, string password)
        {
            SketchModel sketchModel = db.SketchModels.Find(id);
            if (sketchModel.CheckPassword(password) || !sketchModel.HasPassword)
            {
                db.SketchModels.Remove(sketchModel);
                db.SaveChanges();
                return RedirectToAction("Index", "Sketch");
            }

            ViewBag.Message = "Password Incorrect";
            return View("Index",db.SketchModels.ToList());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
