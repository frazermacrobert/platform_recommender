// Category metadata and platform scores
// You can edit this file to update descriptions or scores.

window.CATEGORIES = [
  {
    key: "UX",
    name: "User experience & visual appeal",
    description: `We wanted to see the overall experience of using the product from an end-user’s perspective. This not only included the branding / look-and-feel that can be achieved with the site, but how people may choose to consume the content.
This scenario explored:
• The overall quality of the user experience, such as whether notifications are easy to find and whether the interface is contemporary in its approach.
• How easily users can navigate through the site using well-structured menus, targeted menu options, and visual cues.
• Whether the branding options are flexible, without any platform constraints or issues with upgrades applied at a later point. The overall visual impact of the product was also considered here.
• What support was offered for businesses that may want sub-brands, such as where part of the organisation has a distinct identity (for example PlayStation within Sony) or where a business may want to reflect multiple locations (such as Hilton in Las Vegas vs Hilton in Paris).`
  },
  {
    key: "Publishing",
    name: "Publishing & communications management",
    description: `Internal communicators will often rely on these platforms to reach their audiences, so we wanted to see what tools were available to help them create and manage the flow of news to appropriate audiences. This included different news types, crisis communications, and ways of reaching people beyond the given platform.
We tested:
• What tools were available to build appealing and effective content using a range of media, as well as how easy this experience was.
• How content could be dynamically and flexibly targeted to individuals or groups, and whether individuals could also opt in or out of channels.
• What tools were available to manage the quality of content, such as publication workflow settings, as well as the flow of articles, for example a news calendar.
• Ways messages could be published in one place but reach audiences wherever they may be, such as through digital signage.`
  },
  {
    key: "Community",
    name: "Community & engagement",
    description: `To really engage employees, we need to give them a voice. We wanted to see how platforms facilitated dialogue with employees, the gathering of feedback, and the ability to take a ‘temperature check’. Some of the best internal content can come from people sharing thoughts and generating ideas together, so we also looked at how internal communities were cultivated.
We explored:
• How users could react or interact with content, such as through liking and commenting (including what moderation features were available).
• What social collaboration or communities of practice features were available, such as themed discussion boards, wikis, blogs, or activity feeds (similar to those that could be found on a social media site).
• How HR or internal communicators could gather thoughts and opinions, for example using surveys, polls, or ideation tools.
• What other ‘people’ oriented features were included to help encourage themes of wellbeing, engagement, and inclusion. This could include recognition schemes, mindfulness features, or onboarding processes.`
  },
  {
    key: "Integrations",
    name: "Integrations & services (incl. M365)",
    description: `Digital workplaces are often a fragmented set of tools, so we wanted to see how the products helped simplify an employee’s experience. For example, integrations with systems to reduce the number of sites, apps, or platforms someone must visit, which could be through links, iframes, or fuller integrations, and where an ‘external’ activity is brought through into the intranet. Additionally, the Microsoft suite is pervasive, and many companies want their intranet to work well alongside their M365 investment, even if they have chosen not to use SharePoint as a publishing platform.
We explored:
• How integrations with common enterprise systems, such as Salesforce, Workday, or Zendesk, were presented on the intranet. This could include dashboards, iframes, or actionable notifications, and we wanted to see the end user and administrator experience.
• How the products supported sources such as SharePoint, Google Drive, Dropbox and Box as cloud file sources to collaborate and share.
• What kinds of content could be integrated into the intranet product from SharePoint. For example, could users post into SharePoint news or show SharePoint news stories, or was there an overview of sites?
• How an integration worked with MS Teams, covering conversations, documents, and calls. MS Teams can generate a lot of notifications, so we wanted to see how these were handled too.
• How far Viva applications have been integrated, particularly Viva Engage and Viva Connections.`
  },
  {
    key: "Search",
    name: "Information finding & search",
    description: `Finding information can be a challenge for users, not only within intranets but across the broader digital workplace. We wanted to see how the products approached findability and ease of information seeking. Some platforms support enterprise-wide search and we welcomed any demonstrations that went beyond the intranet.
We wanted to see:
• What the search service and experience was like on the platform. This included clear and accurate results being returned, the potential to refine results dynamically, the indexing of content (documents in particular), and an attractive interface.
• How admins could influence results, such as through promoted results or topic tagging.
• Whether the search would federate content from some or all integrated systems.
• What the people search experience was like, again through clear and attractive results, plus a detailed organisation chart, and useful suggestions such as type-ahead or alternate spellings (Suzie – Susie – Susy – Suzy etc).`
  },
  {
    key: "Admin",
    name: "Administrator experience",
    description: `It’s important for all users to have a good experience when working with an intranet, particularly where there is a decentralised model to intranet management. We therefore wanted to see how easy it was for administrators and publishers to manage the site as a separate experience from end-users.
This scenario explored:
• The different menus and options that were open to admins and how complex tasks were made easier.
• What tools were available to build or configure the home page(s) and / or other landing pages. We wanted to see features such as templates, a variety of web parts / widgets, and elements to help such as info buttons.
• Mechanisms for managing content life cycles with easy ways for people (including devolved content owners and publishers) to update content and / or associated dates.
• How multiple languages were supported from a user and publisher point of view. For example, the ability to change languages for both the interface and content or helping publishers with translation workflow.
• How well multimedia was stored and presented to employees.`
  },
  {
    key: "Analytics",
    name: "Analytics",
    description: `Intranet managers and content owners need to be able to measure the effectiveness of their intranet, which not only shows the performance but will lend guidance to ways to improve the site too.
We have tested:
• What information was available to admins so that they can get an idea for site-wide and individual section content usage and adoption.
• How the analytics deliver actionable insights that help improve the way the intranet is managed, not just generating numbers because they can; and how the data could be adapted to suit a business’ specific goals.
• Analytics and tools for communicators, such as ways to measure individual article and overall communication campaign performance.
• Support of mandatory reads and search analytics, such as to help admins identify when users give up on search terms or where there are gaps in results.`
  },
  {
    key: "Mobile",
    name: "Mobile & frontline support",
    description: `People often need to access information or check updates away from their desk (or have a role that is entirely deskless). We asked vendors to show us how their product made it easy to deliver an engaging experience on devices such as mobiles, tablets and on shared screens.
We wanted to see:
• What solutions were offered to help businesses enroll users onto the mobile version of the site, particularly where users may not be on central databases or where centrally held contact information may be incomplete.
• The ease of use and whether the experience mirrors a consumer app.
• What features were present on the mobile experience to support the needs of frontline workers.
• How easily admins could control the content and layout of the app, ensuring that anything presented was suitable and relevant to mobile users.`
  }
];

// Platform scores (0-5). Keys must match CATEGORIES.key values.
window.PLATFORMS = [
  { name: "Akumina", UX:3.5, Publishing:4.5, Community:3, Integrations:4, Search:4, Admin:3.5, Analytics:3, Mobile:3, strengths:"Highly flexible M365 personalisation and branded UX; strong publishing." },
  { name: "Appspace", UX:4, Publishing:4.5, Community:4, Integrations:3, Search:3.5, Admin:3.5, Analytics:2.5, Mobile:4, strengths:"Unified multi-channel comms with digital signage bridging physical spaces." },
  { name: "Blink", UX:4.5, Publishing:3.5, Community:4, Integrations:2.5, Search:2.5, Admin:3, Analytics:3, Mobile:5, strengths:"Frontline-first mobile experience with hands-on rollout and adoption." },
  { name: "Colibo", UX:4, Publishing:3.5, Community:3.5, Integrations:2, Search:3.5, Admin:4, Analytics:3.5, Mobile:3.5, strengths:"Simple, intuitive intranet with solid collaboration and onboarding." },
  { name: "Fresh", UX:4, Publishing:4, Community:3.5, Integrations:3, Search:4, Admin:4, Analytics:3, Mobile:2.5, strengths:"SharePoint in-a-box that improves branding, targeting and editorial workflow." },
  { name: "Haiilo", UX:4.5, Publishing:4, Community:4, Integrations:1.5, Search:3.5, Admin:3.5, Analytics:3, Mobile:4, strengths:"Social/engagement focus with accessible mobile comms and communities." },
  { name: "Interact", UX:4.5, Publishing:4.5, Community:4, Integrations:3, Search:4.5, Admin:4.5, Analytics:4, Mobile:4, strengths:"Feature-rich editor and strong multi-channel publishing for IC teams." },
  { name: "Involv Intranet", UX:4.5, Publishing:4, Community:3.5, Integrations:2, Search:3.5, Admin:3.5, Analytics:3.5, Mobile:3, strengths:"Practical SharePoint enhancement with templates and governance at good value." },
  { name: "Jalios", UX:3, Publishing:3.5, Community:3.5, Integrations:2.5, Search:3, Admin:3, Analytics:3, Mobile:3.5, strengths:"Comprehensive, customisable digital workplace with deep collaboration options." },
  { name: "Lightspeed 365", UX:4, Publishing:3.5, Community:3, Integrations:2.5, Search:4, Admin:3.5, Analytics:2, Mobile:2.5, strengths:"Targeted SharePoint web parts for fast UX wins and alerts." },
  { name: "MangoApps", UX:3.5, Publishing:4, Community:4, Integrations:2.5, Search:4, Admin:4, Analytics:3.5, Mobile:3.5, strengths:"Versatile intranet + collaboration/learning; strong mobile at mid-price." },
  { name: "Mozzaik365", UX:3.5, Publishing:3, Community:3, Integrations:4, Search:4, Admin:3.5, Analytics:2, Mobile:3.5, strengths:"SharePoint UX/search enhancements with high M365 compatibility." },
  { name: "Oak Engage", UX:4, Publishing:4, Community:4.5, Integrations:2, Search:4, Admin:4, Analytics:3.5, Mobile:3.5, strengths:"Flexible, easy intranet with strong community features and mobile." },
  { name: "Omnia", UX:4.5, Publishing:4.5, Community:4.5, Integrations:3, Search:4.5, Admin:4, Analytics:4.5, Mobile:4, strengths:"Top SharePoint-based all-rounder; rich design beyond SP constraints." },
  { name: "Powell Intranet", UX:4, Publishing:4, Community:4, Integrations:3.5, Search:4, Admin:3.5, Analytics:3, Mobile:3, strengths:"Enhanced SharePoint experience with templates and admin options." },
  { name: "SharePoint & Viva", UX:3.5, Publishing:3, Community:3, Integrations:3, Search:4, Admin:3, Analytics:2, Mobile:2.5, strengths:"Integrated M365 core with fast-moving AI roadmap; best as part of broader EX." },
  { name: "Sociabble", UX:4, Publishing:4.5, Community:3, Integrations:2, Search:2.5, Admin:4, Analytics:4, Mobile:4.5, strengths:"Employee communications and advocacy with mobile-first multimedia." },
  { name: "Staffbase", UX:4, Publishing:4.5, Community:4, Integrations:3.5, Search:2.5, Admin:4.5, Analytics:4, Mobile:4.5, strengths:"Mature multi-channel communications suite with strong analytics." },
  { name: "ThoughtFarmer", UX:3.5, Publishing:3.5, Community:3, Integrations:2, Search:4, Admin:3.5, Analytics:3.5, Mobile:3, strengths:"Simple layouts, powerful search, easy page building." },
  { name: "Unily", UX:4.5, Publishing:4.5, Community:4.5, Integrations:3, Search:4.5, Admin:4, Analytics:4, Mobile:3.5, strengths:"Premium enterprise EX with targeting depth and robust mobile/community." }
];
