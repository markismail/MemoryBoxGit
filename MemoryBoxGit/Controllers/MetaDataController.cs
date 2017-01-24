using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VirtualMemoryBox.Domain;
using VirtualMemoryBox.Repository.Abstract;
using VirtualMemoryBox.Repository.Concrete;
using Newtonsoft.Json;

namespace MemoryBoxGit.Controllers
{
    public class MetaDataController : Controller
    {
        private IMetaDataRepository _iMeta;
        public MetaDataController(IMetaDataRepository iMetaRepo)
        {
            _iMeta = iMetaRepo;
        }

        // GET: Media
        public string UpdateMetadata(string filename, string metadata, string feeling)
        {
            if (User.Identity.IsAuthenticated)
            {
                var currentUser = User.Identity.Name;
                Metadata newMeta = new Metadata();
                newMeta.DateCreated = DateTime.Now;
                newMeta.DateUpdated = DateTime.Now;
                newMeta.Feeling = feeling;
                newMeta.Filename = filename;
                newMeta.MetadataText = metadata;
                newMeta.UserName = currentUser;
                _iMeta.WriteMetadata(newMeta);
            }
            return ("Metadata added");
        }
        public string ReadMetadata(string UserName, string Filename)
        {
            Metadata existingMeta = new Metadata();
            if (User.Identity.IsAuthenticated)
            {
                existingMeta = _iMeta.findMetaData(UserName, Filename);
            }

            return (JsonConvert.SerializeObject(existingMeta));
        }
    }
}