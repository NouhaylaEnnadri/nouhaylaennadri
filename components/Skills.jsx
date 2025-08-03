    import { useState } from "react";
    import {
    FaCloud,
    FaDatabase,
    FaServer,
    FaCode,
    FaLinkedin,
    } from "react-icons/fa";
    import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiTailwindcss,
    SiHtml5,
    SiCss3,
    SiPython,
    SiBootstrap,
    SiFigma,
    } from "react-icons/si";

    const skillData = {
    frontend: {
        title: "Frontend Development",
        description:
        "I focus on building intuitive and responsive interfaces using tools like React, Tailwind CSS, HTML/CSS, and Figma.",
        tools: [SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiHtml5, SiCss3, SiBootstrap, SiFigma],
    },
    backend: {
        title: "Backend Development",
        description:
        "I work with server-side technologies and APIs, focusing on Node.js and Python to build scalable systems.",
        tools: [SiJavascript, SiPython],
    },
    database: {
        title: "Database Technologies",
        description:
        "I’ve handled structured and unstructured data using technologies like MySQL and MongoDB.",
        tools: [FaDatabase],
    },
    devops: {
        title: "Cloud & DevOps",
        description:
        "Experience with automation, deployment, and CI/CD workflows using GitHub Actions and cloud platforms.",
        tools: [FaCloud],
    },
    };

    const Skills = () => {
    const [active, setActive] = useState("frontend");

    const tabs = [
        { key: "devops", label: "Cloud & DevOps", icon: <FaCloud /> },
        { key: "backend", label: "Backend Development", icon: <FaServer /> },
        { key: "database", label: "Database Technologies", icon: <FaDatabase /> },
        { key: "frontend", label: "Frontend Development", icon: <FaCode /> },
    ];

    const { title, description, tools } = skillData[active];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-10">
            Skills & Tooling
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Tabs */}
            <div className="flex md:flex-col gap-4 w-full md:w-1/3">
            {tabs.map((tab) => (
                <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-left transition-all ${
                    active === tab.key
                    ? "bg-secondary text-base-100"
                    : "border-secondary text-base-content hover:bg-secondary/10"
                }`}
                >
                {tab.icon}
                <span className="text-sm font-semibold">{tab.label}</span>
                </button>
            ))}
            </div>

            {/* Panel */}
            <div className="border border-secondary p-6 rounded-xl w-full md:w-2/3 space-y-4 bg-base-200 backdrop-blur-md">
            <h3 className="text-xl font-semibold text-base-content">{title}</h3>
            <p className="text-sm text-base-content/80">{description}</p>

            <div className="flex flex-wrap gap-4 pt-4">
                {tools.map((Icon, index) => (
                <Icon
                    key={index}
                    className="text-3xl text-secondary hover:scale-110 transition-transform"
                />
                ))}
            </div>

            <a
                href="https://www.linkedin.com/in/nouhayla-en-nadri-845778231/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-sm font-medium text-secondary hover:underline"
            >
                <FaLinkedin className="mr-2" />
                View my LinkedIn
            </a>
            </div>
        </div>
        </section>
    );
    };

    export default Skills;
