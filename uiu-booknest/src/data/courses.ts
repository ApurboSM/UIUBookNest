import type { School } from "@/types";

export const ELMS_BASE = "https://elms.uiu.ac.bd";
export const ELMS_SPRING_2026 = `${ELMS_BASE}/course/index.php?categoryid=64`;

export const schools: School[] = [
  {
    slug: "science-engineering",
    name: "School of Science and Engineering",
    shortName: "Science & Engineering",
    description:
      "CSE, EEE, and Civil Engineering — the largest school by enrolment, with strong lab facilities and ACM/IEEE student chapters.",
    elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=68`,
    departments: [
      {
        code: "CSE",
        name: "Department of Computer Science & Engineering",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=72`,
        sampleCourses: [
          { code: "CSE 1115", title: "Discrete Mathematics", credits: 3 },
          { code: "CSE 2215", title: "Data Structures", credits: 3 },
          { code: "CSE 4495", title: "Machine Learning", credits: 3 },
        ],
      },
      {
        code: "EEE",
        name: "Department of Electrical & Electronic Engineering",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=73`,
        sampleCourses: [
          { code: "EEE 2101", title: "Electrical Circuits I", credits: 3 },
          { code: "EEE 3209", title: "Power System Analysis", credits: 3 },
        ],
      },
      {
        code: "CE",
        name: "Department of Civil Engineering",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=74`,
        sampleCourses: [
          { code: "CE 1101", title: "Engineering Drawing", credits: 1.5 },
          { code: "CE 3201", title: "Structural Mechanics", credits: 3 },
        ],
      },
    ],
  },
  {
    slug: "business-economics",
    name: "School of Business and Economics",
    shortName: "Business & Economics",
    description:
      "BBA, AIS, MBA, EMBA, and Economics — UIU's flagship business school with ACBSP-accredited programs and 200+ active Spring 2026 courses.",
    elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=70`,
    departments: [
      {
        code: "BBA",
        name: "BBA, AIS, MBA, EMBA",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=70`,
        sampleCourses: [
          { code: "MGT 2202", title: "Principles of Management", credits: 3 },
          { code: "MKT 2335", title: "Principles of Marketing", credits: 3 },
          { code: "AIS 2101", title: "Financial Accounting", credits: 3 },
        ],
      },
      {
        code: "ECO",
        name: "Department of Economics",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=70`,
        sampleCourses: [
          { code: "ECO 1101", title: "Microeconomics", credits: 3 },
          { code: "ECO 1102", title: "Macroeconomics", credits: 3 },
        ],
      },
    ],
  },
  {
    slug: "humanities-social",
    name: "School of Humanities and Social Sciences",
    shortName: "Humanities & Social Sciences",
    description:
      "English, Environment & Development Studies, and Media Studies & Journalism — interdisciplinary programs with strong field-research components.",
    elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=71`,
    departments: [
      {
        code: "ENG",
        name: "Department of English",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=75`,
        sampleCourses: [
          { code: "ENG 1011", title: "English Composition", credits: 3 },
          { code: "ENG 3203", title: "Modern Drama", credits: 3 },
        ],
      },
      {
        code: "EDS",
        name: "Department of Environment & Development Studies",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=76`,
        sampleCourses: [
          { code: "EDS 1101", title: "Introduction to Environment & Sustainability", credits: 3 },
          { code: "EDS 3201", title: "Climate Change & Bangladesh", credits: 3 },
        ],
      },
      {
        code: "MSJ",
        name: "Department of Media Studies & Journalism",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=77`,
        sampleCourses: [
          { code: "MSJ 1101", title: "Introduction to Media Studies", credits: 3 },
          { code: "MSJ 2207", title: "Reporting & News Writing", credits: 3 },
        ],
      },
    ],
  },
  {
    slug: "life-sciences",
    name: "School of Life Sciences",
    shortName: "Life Sciences",
    description:
      "Pharmacy and Biotechnology & Genetic Engineering — research-driven, lab-intensive programs with active publishing faculty.",
    elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=66`,
    departments: [
      {
        code: "PHR",
        name: "Department of Pharmacy",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=66`,
        sampleCourses: [
          { code: "PHR 1103", title: "Organic Chemistry I", credits: 3 },
          { code: "PHR 2105", title: "Pharmaceutics I", credits: 3 },
        ],
      },
      {
        code: "BGE",
        name: "Department of Biotechnology & Genetic Engineering",
        elmsUrl: `${ELMS_BASE}/course/index.php?categoryid=67`,
        sampleCourses: [
          { code: "BGE 1101", title: "Introduction to Biology", credits: 3 },
          { code: "BGE 2103", title: "Introduction to Biotechnology", credits: 3 },
        ],
      },
    ],
  },
];

export const schoolBySlug = Object.fromEntries(
  schools.map((s) => [s.slug, s])
) as Record<School["slug"], School>;
