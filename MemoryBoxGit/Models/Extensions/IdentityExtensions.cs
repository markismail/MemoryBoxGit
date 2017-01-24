using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace MemoryBoxGit.Models.Extensions
{
    public static class IdentityExtensions
    {
        //public static string GetHash(this IIdentity identity)
        //{
        //    var user = HttpContext.Current.GetOwinContext().Get<ApplicationUserManager>().FindById(identity.GetUserId());
        //    return (user != null) ? user.HashedFolder : string.Empty;
        //}
    }
    //public static class IdentityExtensions
    //{
    //    public static string GetHashFolder(this IIdentity identity)
    //    {
    //        var hashF = ((ClaimsIdentity)identity).FindFirst("HashedFolder");
    //        // Test for null to avoid issues during local testing
    //        return (hashF != null) ? hashF.Value : string.Empty;
    //    }
    //}
}