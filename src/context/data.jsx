
export const data = {

    navigation: {
        brandText: "AJD",
        links: [
            {
                text: "Demos",
                ref: "#Demonstrations"
            },
            {
                text: "Projects",
                ref: "#Projects"
            },
            {
                text: "Résumé",
                ref: "#Resume"
            },
            {
                text: "Contact",
                ref: "#Contact"
            }
        ]
    },

    introduction: {
        name: "Alexander Daigh",
        title: "B.S. Software Engineering",
        subtitle: "Summa Cum Laude",
        message: "I am a driven worker and a motivated developer.",
        description: "I graduated from <link_0> in December 2023.\nSince then, I've been pursuing MERN stack development while working with <link_1> as a Quality Assurance Tester as well as working as a freelance web developer.",
        links: [
            {
                text: "Arizona State University",
                ref: "https://asuonline.asu.edu/online-degree-programs/undergraduate/bachelor-science-software-engineering/?utm_source=google&utm_medium=cpc&utm_content=search_UG_Software%20Engineering_NB&utm_campaign=22-fy20_q4_phase2_2022-BR_Verticals_Engineering_Non&utm_ecd22=22&utm_term=asu%20software%20engineering&gclid=CjwKCAjwrNmWBhA4EiwAHbjEQOXodBHfMgQNK5MNhaUpgaFA_tJg6YCXJp_br1MiC2PFPa5p9ysZfRoC8vcQAvD_BwE&gclsrc=aw.ds"
            },
            {
                text: "DataAnnotation",
                ref: "https://www.dataannotation.tech/"
            }
        ],
        img: {
            ref: "./profilepic.webp",
            altText: "Portrait photo of Alexander D."
        }
    },

    demos: {
        header: {
            title: "Demonstrations",
            message: [
                "This section contains demonstrations for various programming concepts",
                "To begin, I've created visualizations of Dijkstra's and the A* pathfinding algorithm",
                "These take advantage of client-side rendering, all the magic happens on your machine!",
                "For performance, these demonstartions won't load until you click the button"
            ]
        },
        astar: {
            title: "A* Pathfinding animation",
            description: [
                "This is a demonstration of the A* pathfinding algorithm",
                "It finds the shortest path by path length and est. remaining distance",
                "The heuristic used is the standard point-distance function",
                "This version explores the 2D grid in four directions (NSEW)"
            ]
        },
        dijkstra: {
            title: "Dijkstra's Pathfinding animation",
            description: [
                "This is a demonstration of Dijsktra's pathfinding algorithm",
                "The algorithm determines the shortest path to each cell",
                "It does this for all neighbor cells until it finds the target cell",
                "This version explores the grid in four directions (NSEW)"
            ]
        }

    },

    project: {
        header: {
            title: "Projects",
            message: [
                "Here you can see some of the bigger projects I've been working on.",
                "This page itself utilizes Vite + React and Bootstrap!",
                "<u>You can click the pictures to cycle through different images.</u>",
                "Remember to check back often, more projects are coming!"
            ]
        },
        projects: [
            {
                title: {
                    type: "link",
                    text: "STMspokane.com (Call-To-Action)",
                    ref: "https://stmspokane.com/"
                },
                description: [
                    "Updated single-page call-to-action site for STMspokane.com.",
                    "Refining STM Tuning's website to reduce scope and potentially increase conversion rate."
                ],
                bullets: [
                    "Vite (React/TS) using Bootstrap styling",
                    "Hosted on AWS using Amplify, S3, and Route 53",
                    "Improved SEO",
                    "Additional accessibility features",
                    "Focused experience for customers",
                    "Reduced employee workload"
                ],
                slides: [
                    './stm_2025_1.webp', './stm_2025_2.webp', './stm_2025_3.webp'
                ],
            },
            {
                title: {
                    type: "text",
                    text: "STMspokane.com (MERN)",
                },
                description: [
                    "Mobile-responsive web application with scheduling services and automated email notifications.",
                    "Implements common features such as https, user access control and authentication, password encrytion, and a database api."
                ],
                bullets: [
                    "MERN stack SPA using Vite (React/JS), Express, and MongoDB Atlas",
                    "Docker microservice-style implementation for frontend/backend/HTTPS server",
                    "Utilizes Mailtrap platform for SMTP",
                    "Deployed on AWS EC2",
                    "DNS service hosted on AWS Route 53"
                ],
                slides: [
                    './stmspa_1.webp', './stmspa_2.webp', './stmspa_3.webp'
                ],
            },
            {
                title: {
                    type: "text",
                    text: "STMspokane.com (Version 1, HTML/CSS/JS)"
                },
                description: [
                    "Version 1 of STMspokane.com (now inactive)",
                    "Static website developed along owner's creative guidelines",
                    "Increased monthly average walk-ins by 120% and return customers by 30%",
                ],
                bullets: [
                    "HTML, CSS, and JavaScript",
                    "Deployed via AWS S3 and Route 53"
                ],
                slides: [
                    "./stmspokane_1.webp", "./stmspokane_2.webp", "./stmspokane_3.webp"
                ],
            },
            {
                title: {
                    type: "text",
                    text: "PON Health Alert (Angular/Python/Mongo)"
                },
                description: [
                    "Senior class project",
                    "Deep querying component to find errors throughout a complex optical network",
                    "Scalable to vast network sizes and various arrangements",
                    "<r>(IP protected content excluded)</r>",
                ],
                bullets: [
                    "Angular",
                    "Python/Django",
                    "MongoDB"
                ],
                slides: [
                    "./PON_HA_1.webp", "./PON_HA_2.webp"
                ],
            },
            {
                title: {
                    type: "text",
                    text: "Excel Property Ledger Management (VBA/Excel/Access)"
                },
                description: [
                    "Class prototyping project",
                    "Functional prototype of ledger software",
                    "User authentication, multiple modes, and many common ledger functions."
                ],
                bullets: [
                    "Microsoft Excel",
                    "Microsoft Access",
                    "Visual Basic for Applications (VBA)"
                ],
                slides: [
                    "./EPM_1.webp", "./EPM_2.webp"
                ],
            },
        ],
    },

    resume: {
        header: {
            title: "Résumé",
            message: [
                "Here are my educational accomplishments and recent employers.",
                "For further information, please contact me via email (see bottom)."
            ]
        },
        education: [
            {
                institution: "Arizona State University",
                certificate: "B.S. Software Engineering",
                gpa: 3.89,
                period: "August 2020 - December 2023",
                location: "Tempe, AZ (Online)",
            },
            {
                institution: "Naval Nuclear Power School",
                certificate: " Nuclear Electronic Technician",
                gpa: 3.64,
                period: "May 2011 - May 2012",
                location: "Goose Creek, SC",
            },
            {
                institution: "Lake City High School",
                certificate: "H.S. Diploma",
                gpa: 3.69,
                period: "Graduated June 2008",
                location: "Coeur d'Alene, ID",
            },
        ],
        employment: [
            {
                employer: "DataAnnotation",
                position: "Quality Assurance Tester",
                period: "Feb 2024 - Present",
            },
            {
                employer: "Arizona State University",
                position: "Undergraduate Teaching Assistant",
                period: "Spring/Summer session of 2022",
            },
            {
                employer: "STM Tuning",
                position: "Web Developer, Automotive Technician",
                period: "June 2022 - Present",
            },
            {
                employer: "Spiceology Inc.",
                position: "Automation Team Leader",
                period: "June 2021 - June 2022",
            },
        ]
    },

    contact: {
        header: {
            title: "Contact Information",
            message: [
                "I'm currently located in Spokane, WA.",
                "Please feel free to check out my links!"
            ]
        },
        email: "alexdaigh@gmail.com",
        linkedin: "https://www.linkedin.com/in/alexanderdaigh/",
        github: "https://github.com/Adaigh",
    }
}