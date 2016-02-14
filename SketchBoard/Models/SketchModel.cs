using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace SketchBoard.Models
{

    public class SketchModel
    {
        [Key]
        [System.Web.Mvc.HiddenInput(DisplayValue =false)]
        public Int32 Id { get; set; }
        public String Data { get; set; }
        public String PasswordHash { get; set; }
        public String Salt { get; set; }
        public Boolean HasPassword
        {
            get
            {
                return PasswordHash!=GetHash(Salt);
            }
        }


        static public String GetHash(String input)
        {
            var sha = System.Security.Cryptography.SHA256.Create();
            byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            var outputBytes = sha.ComputeHash(inputBytes);
            string hash = Convert.ToBase64String(outputBytes);
            return hash;
        }

        public Boolean CheckPassword(String password)
        {
            return SketchModel.GetHash(password+this.Salt) == this.PasswordHash;
        }

        public SketchModel()
        {
            Salt = Crypto.GenerateSalt(16);
            PasswordHash = SketchModel.GetHash(Salt);
        }
    }
}