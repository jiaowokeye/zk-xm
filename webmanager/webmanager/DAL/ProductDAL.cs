using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using webmanager.Models;
using System.IO;
using Newtonsoft.Json;

namespace webmanager.DAL
{
    public class ProductDAL
    {

        public List<iData> getall(string type)
        {
            if (string.IsNullOrEmpty(type))
            {
                var userdata = new List<iData>();

                var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"datajson\productdata.json");
                if (File.Exists(path))
                {
                    string str = File.ReadAllText(path);
                    userdata = JsonConvert.DeserializeObject<List<iData>>(str);
                }
                return userdata;
            }
            else
            {
                var userdata = new List<iData>();

                var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"datajson\productdata.json");
                if (File.Exists(path))
                {
                    string str = File.ReadAllText(path);
                    userdata = JsonConvert.DeserializeObject<List<iData>>(str);

                }
                return userdata.FindAll(s=>s.Type==type);
            }            
        }

        public iData getDataById(string id,string type)
        {
            var list = getall(type);
            if(string.IsNullOrEmpty(type)){
                return list.FirstOrDefault(s => s.Id == id);
            }
            else
            {
                return list.FirstOrDefault(s => s.Id == id && s.Type==type);
            }            
        }
        public int CreateUpdateData(string id, string data,string type)
        {
            try
            {
                var userList = getall("");
                var isExist = userList.Exists(s => s.Id == id);
                if (isExist)
                {
                    var u = getDataById(id, type);
                    if (u != null)
                    {
                        for (var i = 0; i < userList.Count; i++)
                        {
                            if (userList[i].Id == u.Id && userList[i].Type == u.Type)
                            {
                                userList.Remove(userList[i]);
                                i--;
                            }
                        }
                    }
                  
                }

                iData userInfo = new iData();
                userInfo.Id = id;
                userInfo.Data = data;
                userInfo.Type = type;
                userList.Add(userInfo);
                var userdata = JsonConvert.SerializeObject(userList);
                var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"datajson\productdata.json");
                File.WriteAllText(path, userdata);
                return 1;
               
                
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
        public int delete(string id,string type)
        {
            try
            {
                var userList = getall("");
                var isExist = userList.Exists(s => s.Id == id);
                if (isExist)
                {
                    var u = getDataById(id, type);
                    for (var i = 0; i < userList.Count; i++)
                    {
                        if (userList[i].Id == id&&userList[i].Type==type)
                        {
                            userList.Remove(userList[i]);
                            i--;
                        }
                    }                   
                    var userdata = JsonConvert.SerializeObject(userList);
                    var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"datajson\productdata.json");
                    File.WriteAllText(path, userdata);                   
                }
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        
        public List<iData> getDataByIds(string ids, string type)
        {
            var list = getall(type);
            var result = new List<iData>();
            var arrIds=JsonConvert.DeserializeObject<IEnumerable<string>>(ids);
            for (var i = 0; i < list.Count; i++)
            {
                for (var j = 0; j < arrIds.Count(); j++)
                {
                    if (list[i].Id == arrIds.ElementAt(j))
                    {
                        list.Add(list[i]);
                    }
                }
            }
            return result;
        }

        public int deleteDataByIds(string ids, string type)
        {
            try
            {
                var userList = getall(type);
                var arrIds = JsonConvert.DeserializeObject<IEnumerable<string>>(ids);
                for (var i = 0; i < userList.Count; i++)
                {
                    for (var j = 0; j < arrIds.Count(); j++)
                    {
                        if (userList[i].Id == arrIds.ElementAt(j)&&userList[i].Type==type)
                        {
                            userList.Remove(userList[i]);
                            i--;
                        }
                    }
                   
                }
                var userdata = JsonConvert.SerializeObject(userList);
                var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"datajson\productdata.json");
                File.WriteAllText(path, userdata);
               
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }

}