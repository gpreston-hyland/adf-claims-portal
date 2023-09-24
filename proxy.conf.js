var winston = require('winston'); //(1)

function logProvider() { //(2)
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

module.exports = {

    '/alfresco': {
        target: "https://sse.dev.alfrescocloud.com",
        secure: true,
        "logProvider": logProvider,
        logLevel: 'debug',
        changeOrigin: true,
        onProxyReq: function(request) {
            if(request["method"] !== "GET")
                request.setHeader("origin", "https://sse.dev.alfrescocloud.com");
        },
        // workaround for REPO-2260
        onProxyRes: function (proxyRes, req, res) {
            const header = proxyRes.headers['www-authenticate'];
            if (header && header.startsWith('Basic')) {
                proxyRes.headers['www-authenticate'] = 'x' + header;
            }
        }

    },
    "/auth/admin/realms/myrealm": {
        "target": "https://sse.dev.alfrescocloud.com",
        "secure": true,
        "pathRewrite": {
            "^/auth/admin/realms/myrealm": ""
        },
        "logProvider": logProvider,
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/auth/realms/myrealm": {
        "target": "https://sse.dev.alfrescocloud.com",
        "secure": true,
        "pathRewrite": {
            "^/auth/realms/myrealm": ""
        },
        "changeOrigin": true,
        "logProvider": logProvider,
        "logLevel": "debug"
    },
    "/": {
        "target": "https://sse.dev.alfrescocloud.com",
        "secure": true,
        "changeOrigin": true,
        "logProvider": logProvider,
        "logLevel": "debug"
    }

}
