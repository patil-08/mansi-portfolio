import sys
import os

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
except ImportError:
    print("Installing reportlab...")
    os.system(f"{sys.executable} -m pip install reportlab")
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

pdf_path = os.path.join(os.path.dirname(__file__), "Mansi_Patil_Resume.pdf")

# Page setup: letter size with compact margins to ensure 1-page fit
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=24,
    leftMargin=24,
    topMargin=20,
    bottomMargin=20
)

styles = getSampleStyleSheet()

# Typography matching clean professional resume standard
title_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=16,
    leading=18,
    alignment=1,
    textColor=colors.HexColor('#0F172A')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.0,
    leading=10.5,
    alignment=1,
    textColor=colors.HexColor('#334155')
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=11.5,
    textColor=colors.HexColor('#0F172A'),
    spaceAfter=1,
    spaceBefore=2
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.8,
    leading=10.0,
    textColor=colors.HexColor('#1E293B')
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.8,
    leading=9.8,
    leftIndent=10,
    firstLineIndent=-6,
    textColor=colors.HexColor('#1E293B')
)

subhead_style = ParagraphStyle(
    'SubheadCustom',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.0,
    leading=10.2,
    textColor=colors.HexColor('#0F172A')
)

subhead_meta_style = ParagraphStyle(
    'SubheadMeta',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.5,
    leading=9.5,
    textColor=colors.HexColor('#475569')
)

story = []

# 1. HEADER
story.append(Paragraph("MANSI PATIL", title_style))
story.append(Spacer(1, 2))
contact_text = "+91 8767827166 &nbsp;|&nbsp; mansipatil71899@gmail.com &nbsp;|&nbsp; <a href='https://github.com/patil-08' color='#1D4ED8'><u>https://github.com/patil-08</u></a> &nbsp;|&nbsp; <a href='https://mansi-portfolio-nine.vercel.app/' color='#1D4ED8'><u>https://mansi-portfolio-nine.vercel.app/</u></a>"
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 2.5))

def add_section_header(title):
    story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#1E293B'), spaceAfter=2.5, spaceBefore=0.5))

# 2. PROFESSIONAL SUMMARY
add_section_header("PROFESSIONAL SUMMARY")
summary_p = ("Computer Science graduate with experience in Python, Machine Learning, Data Science, and AI Engineering. "
             "Skilled in building ML pipelines, REST APIs, Dockerized microservices, and AI agents using FastAPI, Django, Scikit-learn, "
             "Pandas, OpenAI, Gemini, and Groq APIs. Experience with agentic AI, LLM integration, and automated systems. "
             "Seeking roles in Python Development, Machine Learning, Data Science, or AI Engineering.")
story.append(Paragraph(summary_p, body_style))
story.append(Spacer(1, 2))

# 3. TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
skills_data = [
    ("<b>Languages:</b>", "Python, SQL"),
    ("<b>ML & Data Science:</b>", "Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, OpenCV, YOLO, PySpark, PyTorch"),
    ("<b>ML Concepts:</b>", "Data Preprocessing, Feature Engineering, Model Deployment, EDA, Classification, Anomaly Detection, Hyperparameter Tuning"),
    ("<b>Backend & API:</b>", "FastAPI, Django, Django Ninja, Node.js, REST APIs, Firebase, SQLite | <b>Databases:</b> MySQL, MongoDB, PostgreSQL"),
    ("<b>Frontend:</b>", "Streamlit, React.js, HTML, CSS, Figma | <b>Visualization:</b> Power BI, Matplotlib, Seaborn"),
    ("<b>Tools & DevOps:</b>", "Docker, Git, GitHub, Postman, Jupyter Notebook, OpenAI API, MLflow"),
    ("<b>Generative AI:</b>", "LLM, Chat Models, Embedding Models, Prompt Engineering, Semantic Search, Embeddings, RAG Concepts, LangChain Fundamentals, OpenAI GPT, Claude, Gemini, Hugging Face, Groq API")
]

for label, val in skills_data:
    p = Paragraph(f"{label} {val}", body_style)
    story.append(p)
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# 4. EDUCATION
add_section_header("EDUCATION")
edu_text = "<b>Maharashtra Institute of Technology</b> — B.Tech, CSE &nbsp;|&nbsp; <b>CGPA: 8.74/10</b>"
story.append(Paragraph(edu_text, body_style))
story.append(Spacer(1, 2))

# 5. EXPERIENCE
add_section_header("EXPERIENCE")

exp_title = "<b>Data Science Intern</b> | <b>Amdox Technologies</b> | April 2025 – Present"
story.append(Paragraph(exp_title, subhead_style))

exp_links = "GitHub: <a href='https://github.com/patil-08/NeuralRetail.git' color='#1D4ED8'><u>https://github.com/patil-08/NeuralRetail.git</u></a> &nbsp;&nbsp; Live Demo: <a href='https://neuralretail-production-1569.up.railway.app/docs' color='#1D4ED8'><u>https://neuralretail-production-1569.up.railway.app/docs</u></a>"
story.append(Paragraph(exp_links, subhead_meta_style))

exp_sub = "<b>Project: NeuralRetail – AI-Powered Sales Intelligence and Predictive Analytics Platform</b>"
story.append(Paragraph(exp_sub, body_style))
story.append(Spacer(1, 1))

exp_bullets = [
    "Built a retail ML platform for demand forecasting, churn prediction, and inventory optimization.",
    "Developed a demand forecasting model using Prophet and LSTM for 30-day SKU-level predictions.",
    "Created churn prediction models using XGBoost and LightGBM with explainability features.",
    "Designed Spark and Delta Lake ETL pipelines with automated data quality checks.",
    "Delivered a Streamlit analytics dashboard integrated with FastAPI, Redis caching, MLflow tracking, and Airflow orchestration."
]

for b in exp_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# 6. PROJECTS
add_section_header("PROJECTS")

# Project 1: Newsly
p1_head = "<b>Newsly – AI-Powered Daily News Digest Agent</b> | Python, FastAPI, Docker, Groq API (Llama 3.3-70B), Google News RSS, Gmail SMTP, GitHub Actions, Render | 2026"
story.append(Paragraph(p1_head, subhead_style))
p1_links = "GitHub: <a href='https://github.com/patil-08/Newsly' color='#1D4ED8'><u>https://github.com/patil-08/Newsly</u></a> &nbsp;&nbsp; Live Demo: <a href='https://newsly-b74f.onrender.com/' color='#1D4ED8'><u>https://newsly-b74f.onrender.com/</u></a>"
story.append(Paragraph(p1_links, subhead_meta_style))
story.append(Spacer(1, 0.8))

p1_bullets = [
    "Developed an AI-powered news aggregation platform that fetches and summarizes news across five categories (Technology & AI, Finance & Markets, Politics, Sports, Fashion) using Google News RSS and the Groq Llama 3.3-70B model.",
    "Built a responsive FastAPI dashboard and implemented automated email delivery of daily news digests via Gmail SMTP.",
    "Containerized the application using Docker and automated daily news generation via GitHub Actions deployed on Render.",
    "Managed secure configuration using environment variables with python-dotenv."
]
for b in p1_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# Project 2: Loan Approval
p2_head = "<b>Loan Approval Prediction System with AI Chatbot</b> | Python, Scikit-learn, FastAPI, Streamlit, OpenAI API | 2026"
story.append(Paragraph(p2_head, subhead_style))
p2_links = "GitHub: <a href='https://github.com/patil-08/loan-approval-ml.git' color='#1D4ED8'><u>https://github.com/patil-08/loan-approval-ml.git</u></a> &nbsp;&nbsp; Live Demo: <a href='https://loan-approval-ml-hmhp.onrender.com' color='#1D4ED8'><u>https://loan-approval-ml-hmhp.onrender.com</u></a>"
story.append(Paragraph(p2_links, subhead_meta_style))
story.append(Spacer(1, 0.8))

p2_bullets = [
    "Built end-to-end ML pipeline to predict loan approval using applicant financial data; stored predictions and history in SQLite.",
    "Developed FastAPI backend for predictions and user authentication; Streamlit dashboard for real-time visualization.",
    "Integrated OpenAI API chatbot to explain results and provide suggestions; managed version control via Git and GitHub."
]
for b in p2_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# Project 3: AI-Based Road Safety Detection System
p3_head = "<b>AI-Based Road Safety Detection System</b> | Python, OpenCV, YOLO, Pandas | 2025"
story.append(Paragraph(p3_head, subhead_style))
p3_links = "GitHub: <a href='https://github.com/patil-08/roadsaftetydetection.git' color='#1D4ED8'><u>https://github.com/patil-08/roadsaftetydetection.git</u></a>"
story.append(Paragraph(p3_links, subhead_meta_style))
story.append(Spacer(1, 0.8))

p3_bullets = [
    "Built real-time road safety detection using YOLO for traffic violation identification; used Pandas and Matplotlib for analysis."
]
for b in p3_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# Project 4: E-Commerce Website
p4_head = "<b>E-Commerce Website</b> | Node.js, MongoDB, JavaScript | 2024"
story.append(Paragraph(p4_head, subhead_style))
p4_links = "GitHub: <a href='https://github.com/patil-08/Style-Up-E-commerce-Website.git' color='#1D4ED8'><u>https://github.com/patil-08/Style-Up-E-commerce-Website.git</u></a>"
story.append(Paragraph(p4_links, subhead_meta_style))
story.append(Spacer(1, 0.8))

p4_bullets = [
    "Developed full-stack e-commerce platform with product browsing, cart management, and secure checkout."
]
for b in p4_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.8))

# 7. CERTIFICATIONS
add_section_header("CERTIFICATIONS")
certs = [
    "Deloitte: Data Analyst Certificate | 2025",
    "Business Intelligence with Advanced Excel and Power BI | 2024",
    "CSRBOX: Agentic AI – From Learner to Builder: AI Agent Architect | 2025",
    "Oracle Academy: Database Management System | 2024",
    "STTP: Master Industry-Grade Python Skills | 2024"
]

for c in certs:
    story.append(Paragraph(f"• {c}", bullet_style))
    story.append(Spacer(1, 0.8))

doc.build(story)
print("Successfully generated updated 1-page Mansi_Patil_Resume.pdf!")
