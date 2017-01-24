using CKSource.CKFinder.Connector.Config;
using CKSource.CKFinder.Connector.Core.Builders;
using CKSource.CKFinder.Connector.Core.Logs;
using CKSource.CKFinder.Connector.Host.Owin;
using CKSource.CKFinder.Connector.Logs.NLog;
using CKSource.CKFinder.Connector.KeyValue.EntityFramework;
using CKSource.FileSystem.Local;
using Microsoft.Owin;
using Owin;
using CKSource.CKFinder.Connector.Core.Acl;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System;

[assembly: OwinStartupAttribute(typeof(MemoryBoxGit.Startup))]
namespace MemoryBoxGit
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            /*
             * If you installed CKSource.CKFinder.Connector.Logs.NLog you can start the logger:
             * LoggerManager.LoggerAdapterFactory = new NLogLoggerAdapterFactory();
            * Keep in mind that the logger should be initialized only once and before any other CKFinder method
             * is invoked.
             */

            /*
             * Register the "local" type backend file system.
             */
            FileSystemFactory.RegisterFileSystem<LocalStorage>();

            /*
             * Map the CKFinder connector service under a given path. By default the CKFinder JavaScript client
             * expect the ASP.NET connector to be accessible under the "/ckfinder/connector" route.
             */
            app.Map("/ckfinder/connector", SetupConnector);

        }

        private static void SetupConnector(IAppBuilder app)
        {
            /*
             * Create a connector instance using ConnectorBuilder. The call to the LoadConfig() method
             * will configure the connector using CKFinder configuration options defined in Web.config.
             */
            var connectorFactory = new OwinConnectorFactory();
            var connectorBuilder = new ConnectorBuilder();

            /*
             * Create an instance of authenticator implemented in the previous step.
             */
            var customAuthenticator = new App_Start.CustomCKFinderAuthenticator();

            /*
             * Provide the global configuration.
             *
             * If you installed CKSource.CKFinder.Connector.Config you may load static configuration from XML:
             * connectorBuilder.LoadConfig();
             */
            connectorBuilder
                .SetAuthenticator(customAuthenticator)
                .SetRequestConfiguration(
                    (request, config) =>
                    {
                        var userName = request.Principal?.Identity?.Name;
                        if (userName != null)
                        {
                            config.LoadConfig();
                            var sha = new SHA1CryptoServiceProvider();
                            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(userName));
                            var folderName = BitConverter.ToString(hash).Replace("-", string.Empty);

                            //config.AddResourceType("private", builder => builder.SetBackend("default", folderName));
                            //config.SetThumbnailBackend("default", $"App_Data/{folderName}");
                            //config.SetThumbnailBackend("CKFinderPrivate", $"/{folderName}");
                            config.RemoveBackend("default");
                            // FAO DAVE - i changed this to not have ckfinder in as below to fix ckeditor integration - seems to have worked but we need to check ckfinder not affected
                            // PS - seems ok so far !! 22-12-16
                            //config.AddBackend("default", new LocalStorage(@"userfiles/" + folderName, "/ckfinder/userfiles/" + folderName));
                            config.AddBackend("default", new LocalStorage(@"userfiles/" + folderName, "/userfiles/" + folderName));
                            config.SetThumbnailBackend("default", "/" + folderName + "T");

                            config.SetKeyValueStoreProvider(new EntityFrameworkKeyValueStoreProvider(
                                "CacheConnectionString", string.Empty, folderName));
                        }
                        //config.LoadConfig();
                        /*
                        * If you installed CKSource.CKFinder.Connector.Config, you may load the static configuration
                        * from XML:
                        * config.LoadConfig();
                        *
                       * If you installed CKSource.CKFinder.Connector.KeyValue.EntityFramework, you may enable caching:
                       * */
                        config.SetKeyValueStoreProvider(
                             new EntityFrameworkKeyValueStoreProvider("CacheConnectionString"));
                    });

            /*
             * Build the connector middleware.
             */
            var connector = connectorBuilder
                .Build(connectorFactory);

            /*
             * Add the CKFinder connector middleware to the web application pipeline.
             */
            app.UseConnector(connector);

        }
    }
}

