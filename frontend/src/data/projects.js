const projects = [
  {
    slug: "fullstack-devops-portfolio",
    title: "Full-Stack Web Application",
    description:
      "Production-ready full-stack web application built with React, Node.js, Express and MySQL, featuring authentication, admin management, automated testing, containerization and cloud deployment.",

    image: "/fullstack-website.jpg",

    github: "#",
    demo: "#",

    tech: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Vitest",
      "Jest",
      "Playwright",
      "Postman",
      "Docker",
    ],

    overview:
      "A complete full-stack web application designed with a React frontend, Node.js and Express backend, and MySQL database. The project focuses on building a maintainable application with authentication, administrative functionality, automated testing and containerized deployment.",

    features: [
      "React-based frontend application",
      "Node.js and Express REST API",
      "MySQL database integration",
      "Authentication and protected admin functionality",
      "Automated frontend and backend testing",
      "Docker-based application containerization",
      "Production-oriented application structure",
    ],

    engineeringFocus: [
      "Full-stack application architecture",
      "REST API development",
      "Database integration",
      "Authentication and authorization",
      "Automated testing",
      "Containerization",
    ],
  },

  {
    slug: "devops-web-application-deployment",
    title: "DevOps Web Application Deployment",

    description:
      "Automated web application deployment pipeline using GitHub Actions and Docker, with testing, container image scanning and production deployment workflows.",

    image: "/devops-v2.jpg",

    github: "#",
    demo: "#",

    tech: [
      "GitHub Actions",
      "Docker",
      "Trivy",
      "CI/CD",
      "Web Application Deployment",
      "Linux",
    ],

    overview:
      "A DevOps project focused on automating the build, test, security scanning and deployment lifecycle of a web application using modern CI/CD practices.",

    features: [
      "GitHub Actions CI/CD workflows",
      "Automated application builds",
      "Docker image creation",
      "Container image vulnerability scanning with Trivy",
      "Automated testing within the pipeline",
      "Linux-based application deployment",
      "Repeatable deployment workflow",
    ],

    engineeringFocus: [
      "CI/CD automation",
      "Docker containerization",
      "Application deployment",
      "Automated testing",
      "Container security scanning",
      "Linux operations",
    ],
  },

  {
    slug: "kubernetes-platform",
    title: "Kubernetes Application Platform",

    description:
      "Containerized web application platform orchestrated with Kubernetes, supporting automated deployments, application scaling and container security scanning.",

    image: "/kubernetes.jpg",

    github: "#",
    demo: "#",

    tech: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Trivy",
      "CI/CD",
      "Web Application Deployment",
    ],

    overview:
      "A container orchestration project demonstrating how a web application can move from Docker containers into a Kubernetes-managed environment with automated deployment workflows.",

    features: [
      "Dockerized web application",
      "Kubernetes application deployment",
      "Container orchestration",
      "Automated deployment through GitHub Actions",
      "Container vulnerability scanning with Trivy",
      "Application scaling configuration",
      "Kubernetes-based service management",
    ],

    engineeringFocus: [
      "Container orchestration",
      "Kubernetes deployments",
      "CI/CD automation",
      "Container security",
      "Application availability",
      "Production-style deployment practices",
    ],
  },

  {
    slug: "aws-cloud-infrastructure",
    title: "AWS Cloud Infrastructure",

    description:
      "AWS infrastructure provisioned as code with Terraform, covering compute resources, IAM, VPC networking and automated infrastructure deployment through GitHub Actions.",

    image: "/cloud.jpg",

    github: "#",
    demo: "#",

    tech: [
      "AWS",
      "Terraform",
      "GitHub Actions",
      "EC2",
      "VPC",
      "IAM",
    ],

    overview:
      "An AWS infrastructure project focused on Infrastructure as Code, automated provisioning and repeatable cloud infrastructure deployment.",

    features: [
      "Terraform Infrastructure as Code",
      "AWS EC2 compute provisioning",
      "VPC networking configuration",
      "IAM roles and permissions",
      "Infrastructure deployment through GitHub Actions",
      "Reusable infrastructure configuration",
      "Cloud resource lifecycle management",
    ],

    engineeringFocus: [
      "Infrastructure as Code",
      "AWS compute",
      "VPC architecture",
      "IAM",
      "Infrastructure automation",
      "Cloud resource management",
    ],
  },

  {
    slug: "aws-cloud-networking",
    title: "AWS Cloud Networking",

    description:
      "Secure AWS networking architecture designed with VPCs, public and private subnets, route tables, internet gateways, security groups and application load balancing.",

    image: "/cloud-networking.jpg",

    github: "#",
    demo: "#",

    tech: [
      "AWS",
      "Terraform",
      "VPC",
      "Subnets",
      "Route Tables",
      "Security Groups",
      "ALB",
    ],

    overview:
      "A cloud networking project focused on designing and provisioning the network foundation required to securely run applications on AWS.",

    features: [
      "Custom AWS VPC",
      "Public and private subnet architecture",
      "Route table configuration",
      "Internet gateway configuration",
      "Security group configuration",
      "Application Load Balancer integration",
      "Terraform-based network provisioning",
    ],

    engineeringFocus: [
      "AWS VPC architecture",
      "Subnet design",
      "Routing",
      "Network security",
      "Load balancing",
      "Terraform networking",
    ],
  },

  {
    slug: "cloud-security-monitoring",
    title: "Cloud Security & Monitoring",

    description:
      "AWS security and observability architecture combining IAM, security groups, WAF, IMDSv2, CloudWatch, Prometheus, Grafana and server health monitoring.",

    image: "/cloud-security.jpg",

    github: "#",
    demo: "#",

    tech: [
      "AWS IAM",
      "Security Groups",
      "WAF",
      "IMDSv2",
      "CloudWatch",
      "Prometheus",
      "Grafana",
    ],

    overview:
      "A cloud security and observability project focused on protecting AWS workloads, controlling access and monitoring infrastructure health.",

    features: [
      "IAM-based access control",
      "EC2 security group configuration",
      "AWS WAF protection",
      "IMDSv2 configuration",
      "CloudWatch infrastructure monitoring",
      "Prometheus metrics collection",
      "Grafana monitoring dashboards",
      "Server health monitoring",
    ],

    engineeringFocus: [
      "Cloud security",
      "Identity and access management",
      "Network security",
      "AWS workload protection",
      "Infrastructure monitoring",
      "Observability",
    ],
  },
];

export default projects;
