
 
const baseSite = {
  hostUrl: window["base-url"],
  siteUrl: "/sites/dev/CustomerSite",
  AppPage: "/TSG_BPM_APPS_V1_1_0/Pages",
};
 
const menuVersion = {
  MotMotSau: "116",
  MotMotBay: "117",
};
 
const prod = {
  url: {
    API_URL: baseSite.hostUrl + baseSite.siteUrl,
    Site_Relative_Path: baseSite.siteUrl,
  },
  pages: {
    link: baseSite.hostUrl + baseSite.siteUrl + baseSite.AppPage,
    wfDashboard:
      baseSite.hostUrl + baseSite.siteUrl + baseSite.AppPage + "/Default.aspx",
    workflowProcess:
      baseSite.hostUrl +
      baseSite.siteUrl +
      baseSite.AppPage +
      "/workflowProcess/workflowProcess.aspx",
    workflowStatisticals:
      baseSite.hostUrl +
      baseSite.siteUrl +
      baseSite.AppPage +
      "/workflowStatisticals/workflowStatistical.aspx",
    workflowReports:
      baseSite.hostUrl +
      baseSite.siteUrl +
      baseSite.AppPage +
      "/workflowReports/workflowReport.aspx",
  },

  license: {
    today: "2020-04-13",
    numberDay: 30,
    isLimited: false,
  },
  versionMenu: menuVersion.MotMotBay,
};
const hostLocal = "http://localhost:3200";
const dev = {
  url: {
    API_URL: `http://localhost:8089`,
    Site_Relative_Path: baseSite.siteUrl,
  },
  pages: {
    link: hostLocal,
    wfDashboard: hostLocal + "/index.html",
    workflowProcess: hostLocal + "/workflowProcess/workflowProcess.html",
    workflowStatisticals:
      hostLocal + "/workflowStatisticals/workflowStatistical.html",
    workflowReports: hostLocal + "/workflowReports/workflowReport.html",
  },
  
  license: {
    today: "2020-04-13",
    numberDay: 30,
    isLimited: false,
  },
  versionMenu: menuVersion.MotMotBay,
};
 
const config = process.env.NODE_ENV === "development" ? dev : prod;
 
export { config, menuVersion };
 