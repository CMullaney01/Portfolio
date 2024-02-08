import { csrn, toshiba, amazon } from "../assets/images";
import {
    iota,
    github,
    javascript,
    react,
    cplus,
    go,
    py,
    blender,
    contact,
    linkedin,
    car,
    cpu,
    server,
    brain,

} from "../assets/icons";

export const skills = [
    {
        imageUrl: go,
        name: "go",
        type: "Development",
    },
    {
        imageUrl: cplus,
        name: "C++",
        type: "Backend",
    },
    {
        imageUrl: iota,
        name: "IOTA",
        type: "Blockchain",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: py,
        name: "Python",
        type: "Development",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: blender,
        name: "Blender",
        type: "Modelling",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
];

export const experiences = [
    {
        title: "Toshiba Research Associate",
        company_name: "Toshiba Europe",
        icon: toshiba,
        iconBg: "#accbe1",
        date: "February 2022 - June 2023",
        points: [
            "Developed Peer-to-Peer (P2P) energy management systems for the Internet of Things (IoT) using Distributed Ledger Technology (DLT), and Electric Vehicles (EVs), resulting in notable publications in IEEE conferences and a pending Patent.",
            "Published paper: Efficient and Secure Energy Trading with Electric Vehicles and Distributed Ledger Technology in IEEE VCC 2023",
            "Published paper: Peer-to-Peer Energy Trading meets IOTA: Toward a Scalable, Low-Cost, and Efficient Trading System in IEEE/ACM UCC 2022:",
        ],
    },
    {
        title: "React Web Developer",
        company_name: "CSRN",
        icon: csrn,
        iconBg: "#fbc3bc",
        date: "June 2021 - December 2021",
        points: [
            "Contributed to website development and feature enhancement of the CSRN platform, facilitating connections between student groups and high-impact management consulting projects. Gained practical experience with the React framework and JavaScript during the process."
        ],
    },
    {
        title: "Operations Associate",
        company_name: "Shopify",
        icon: amazon,
        iconBg: "#b7e4c7",
        date: "May 2020 - August 2020",
        points: [
            "Promoted to a key role in managing the operations of the Amazon distribution center. Responsible for Sortation Associates and Flex Delivery Drivers, ensuring efficient routing of undelivered packages and implementing solutions for missing and damaged packages.",
            "Demonstrated problem-solving skills to enhance overall operational efficiency in a dynamic and fast-paced environment.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: cpu,
        theme: 'btn-back-black',
        name: 'Processor Simulator',
        description: 'Created an advanced RISC-V Processor Simulator with Out-of-Order execution, reservation stations, and branch prediction in C++.',
        link: 'https://github.com/CMullaney01/ProcessorSimulator',
    },
    {
        iconUrl: react,
        theme: 'btn-back-red',
        name: 'Portfolio',
        description: 'This portfolio! This helped me get to grips with Three.js and React again as well as helping me transfer my skills from Maya to Blender',
        link: 'https://github.com/CMullaney01/Portfolio',
    },
    {
        iconUrl: server,
        theme: 'btn-back-green',
        name: 'File Server',
        description: 'Currently developing a Golang-based File Transfer Server for secure storage and retrieval, employing HTTP/HTTPS protocols and a React web app interface.',
        link: 'https://github.com/CMullaney01/FileServer',
    },
    {
        iconUrl: brain,
        theme: 'btn-back-pink',
        name: 'Deep-Neural-Networks-and-Brain-Models',
        description: 'Implemented supervised learning backpropagation for a deep neural network in Python, exploring its potential as a model for brain processing.',
        link: 'https://github.com/CMullaney01/Deep-Neural-Networks-and-Brain-Models',
    },
    {
        iconUrl: car,
        theme: 'btn-back-yellow',
        name: ' Efficient and Secure Energy Trading with Electric Vehicles and Distributed Ledger Technology',
        description: 'A published paper in IEEE VCC 2023 using Distributed Ledger technology and Electric Vehicles and deep neural networks in Peer-to-Peer energy trading',
        link: 'https://arxiv.org/abs/2312.00587',
    },
    {
        iconUrl: iota,
        theme: 'btn-back-blue',
        name: 'Peer-to-Peer Energy Trading meets IOTA: Toward a Scalable, Low-Cost, and Efficient Trading System',
        description: 'A published paper in IEEE/ACM UCC 2022 using IOTA Directed Acyclic Graph based Distributed Ledger technology to facilitate Peer-to-Peer energy trading',
        link: 'https://ieeexplore.ieee.org/document/10061778',
    }
];