import amplitude from 'amplitude-js'

export default function getAnalytics(loadAnalytics) {
  if (loadAnalytics) {
    // Google Tag Manager
    const gaId = "AW-974426358";
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      window.dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', gaId);

    // Amplitude
    const amplitudeClient = amplitude.getInstance();
    amplitudeClient.init("49ec6a6d9495df07df03ab4fc60a0288");

    // Segment.io
    // eslint-disable-next-line
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
      analytics.load("9PatX3O1J8vgCguRDiiueFlHuJDvsv2C");
      analytics.page();
    }}();

    // Autopilot App Tracking Code
    (function(o){var b="https://api.autopilothq.com/anywhere/",t="4d5b93e18d25494aa00b315c266be16a587c07a44b0e4f258650fbb67b56735e",a=window.AutopilotAnywhere={_runQueue:[],run:function(){this._runQueue.push(arguments);}},c=encodeURIComponent,s="SCRIPT",d=document,l=d.getElementsByTagName(s)[0],p="t="+c(d.title||"")+"&u="+c(d.location.href||"")+"&r="+c(d.referrer||""),j="text/javascript",z,y;if(!window.Autopilot) window.Autopilot=a;if(o.app) p="devmode=true&"+p;z=function(src,asy){var e=d.createElement(s);e.src=src;e.type=j;e.async=asy;l.parentNode.insertBefore(e,l);};y=function(){z(b+t+'?'+p,true);};if(window.attachEvent){window.attachEvent("onload",y);}else{window.addEventListener("load",y,false);}})({"app":true});

    // Twitter
    // eslint-disable-next-line
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    // Insert Twitter Pixel ID and Standard Event data below
    window.twq('init','ny495');
    window.twq('track','PageView');

    // HubSpot Script Loader. Please do not block this resource. See more: http://hubs.ly/H0702_H0
        (function (id, src) {if (document.getElementById(id)) { return; }var js = document.createElement('script');js.src = src;js.type = 'text/javascript';js.id = id;var e = document.getElementsByTagName('script')[0];e.parentNode.insertBefore(js, e);
        })('hs-analytics', '//js.hs-analytics.net/analytics/1517155800000/2786416.js');

    return {
      addGoogleEvent: (event) => {
        gtag("event", event.type, {"send_to": gaId + "/" + event.id});
      },
      addAmplitudeEvent: (eventType, username) => {
        if (username) {
          amplitudeClient.setUserId(username);
        }

        amplitudeClient.logEvent(eventType);
      }
    };
  } else {
    return {
      addGoogleEvent: () => {},
      addAmplitudeEvent: () => {}
    };
  }
}