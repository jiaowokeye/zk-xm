using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using webmanager.DAL;

namespace webmanager.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public void CheckUserName(string username,string callback)
        {
            UserDAL userDal = new UserDAL();
            var user=userDal.checkname(username);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                var result = callback + "(" + data + ")";
                Response.Write(result);
            }
        }
        [HttpPost]
        //重置
        public void register(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var exist = userDal.checkname(name);
            if (exist<0)
            {
                var result1=userDal.insertUser(name, password);
                var data = JsonConvert.SerializeObject(result1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    var result = callback + "(" + data + ")";
                    Response.Write(result);
                }
            }
            else
            {
                var data = JsonConvert.SerializeObject(-1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    var result = callback + "(" + data + ")";
                    Response.Write(result);
                }
            }
        }

        [HttpPost]
        public void login(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.getUser(name);
            try
            {
                var result = 1;
                if (user.password == password)
                {
                    result = 1;
                }
                else
                {
                    result = -1;
                }
                var data = JsonConvert.SerializeObject(result);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    Response.Write(callback + "(" + data + ")");
                }
            }
            catch (Exception ex)
            {
                var data = JsonConvert.SerializeObject(-1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    Response.Write(callback + "(" + data + ")");
                }
            }
        }

        [HttpGet]
        //查看是否已经注册  如果已经注册返回1  没有注册返回-1；
        public void CheckUserNameGet(string username, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.checkname(username);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                var result = callback + "(" + data + ")";
                Response.Write(result);
            }
        }

        [HttpGet]
        //没找到用这种重置的方法来创建一个用户
        public void registerGet(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var exist = userDal.checkname(name);
            if (exist < 0)
            {
                var result1 = userDal.insertUser(name, password);
                var data = JsonConvert.SerializeObject(result1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    var result = callback + "(" + data + ")";
                    Response.Write(result);
                }
            }
            else
            {
                var data2 = JsonConvert.SerializeObject(-1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data2);
                }
                else
                {
                    var result = callback + "(" + data2 + ")";
                    Response.Write(result);
                }
            }
        }


        [HttpGet]
        //获得所有的用户信息
        public void getAllUsers(string callback)
        {
            UserDAL userDal = new UserDAL();
            var users = userDal.getAllUsers();
            var data = JsonConvert.SerializeObject(users);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                var result = callback + "(" + data + ")";
                Response.Write(result);
            }
        }

        [HttpGet]
        //登录验证 如果匹配到那么返回1  没有返回-1
        public void loginGet(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.getUser(name);
            try
            {
                var result = 1;
                if (user.password == password)
                {
                    result = 1;
                }
                else
                {
                    result = -1;
                }
                var data = JsonConvert.SerializeObject(result);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    Response.Write(callback + "(" + data + ")");
                }
            }
            catch (Exception ex)
            {
                var data = JsonConvert.SerializeObject(-1);
                if (string.IsNullOrEmpty(callback))
                {
                    Response.Write(data);
                }
                else
                {
                    Response.Write(callback + "(" + data + ")");
                }
            }
        }

        [HttpGet]
        //根据现有的密码设置新的密码 如果验证旧密码正确，那么久设置为新的密码 并返回1 如果验证失败，返回-1   get方法
        public void updatepasswordget(string name, string password,string newpassword, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.updatepassword(name, password, newpassword);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                Response.Write(callback + "(" + data + ")");
            }
        }
        //根据现有的密码设置新的密码 如果验证旧密码正确，那么久设置为新的密码 并返回1 如果验证失败，返回-1   post方法
        [HttpPost]
        public void updatepassword(string name, string password, string newpassword, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.updatepassword(name, password, newpassword);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                Response.Write(callback + "(" + data + ")");
            }
        }


        [HttpGet]
        //删除用户  get方法
        public void deleteuserget(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.deletepassword(name, password);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                Response.Write(callback + "(" + data + ")");
            }
        }
        //删除用户  post方法
        [HttpPost]
        public void deleteuser(string name, string password, string callback)
        {
            UserDAL userDal = new UserDAL();
            var user = userDal.deletepassword(name, password);
            var data = JsonConvert.SerializeObject(user);
            if (string.IsNullOrEmpty(callback))
            {
                Response.Write(data);
            }
            else
            {
                Response.Write(callback + "(" + data + ")");
            }
        }




    }
}
