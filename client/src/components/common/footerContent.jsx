const footerContent = {
  about: {
    heading: "About Us",
    text: "JobSphere is a comprehensive job board application designed to streamline the job search and application process for job seekers while providing employers with effective tools to manage job postings and applications. Utilizing modern web technologies, JobSphere aims to offer a user-friendly and efficient platform to connect job seekers with employers.",
  },
  contact: {
    heading: "Contact",
    address: "123 Main St. Waterloo, On, Canada 85486",
    email: "info@jobsphere.com",
    phone: "+1 (254) 265-5555",
  },
  links: {
    heading: "Important Links",
    items: [
      { name: "Home", to: "/" },
      { name: "Find a job", to: "/jobs" },
      { name: "Contact Us", to: "/contact" },
      { name: "About Us", to: "/about" },
      { name: "Post a Job", to: "/employer" },
    ],
  },
  copyright: "© 2024 All rights reserved by JobSphere",
};

const footerContentEmployer = {
  about: {
    heading: "About Us",
    text: "JobSphere is a comprehensive job board application designed to streamline the job search and application process for job seekers while providing employers with effective tools to manage job postings and applications. Utilizing modern web technologies, JobSphere aims to offer a user-friendly and efficient platform to connect job seekers with employers.",
  },
  contact: {
    heading: "Contact",
    address: "123 Main St. Waterloo, On, Canada 85486",
    email: "info@jobsphere.com",
    phone: "+1 (254) 265-5555",
  },
  links: {
    heading: "Important Links",
    items: [
      { name: "Home", to: "/employer" },
      { name: "Contact Us", to: "/contact" },
      { name: "About Us", to: "/about" },
      { name: "Post a Job", to: "/employer/job-creation" },
    ],
  },
  copyright: "© 2024 All rights reserved by JobSphere",
};

export { footerContent, footerContentEmployer };
