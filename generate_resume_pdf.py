import sys
import os

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
except ImportError:
    print("Installing reportlab...")
    os.system(f"{sys.executable} -m pip install reportlab")
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

pdf_path = os.path.join(os.path.dirname(__file__), "Mansi_Patil_Resume.pdf")

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom Styles
title_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    alignment=1,
    textColor=colors.HexColor('#000000')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13,
    alignment=1,
    textColor=colors.HexColor('#222222')
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#000000'),
    spaceAfter=4,
    spaceBefore=8
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=colors.HexColor('#111111')
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.2,
    leading=13,
    leftIndent=12,
    firstLineIndent=-8,
    textColor=colors.HexColor('#111111')
)

story = []

# HEADER
story.append(Paragraph("MANSI PATIL", title_style))
story.append(Spacer(1, 4))
contact_text = "+91 8767827166 &nbsp;|&nbsp; mansipatil71899@gmail.com &nbsp;|&nbsp; <a href='https://github.com/patil-08' color='#0000EE'><u>https://github.com/patil-08</u></a> &nbsp;|&nbsp; <a href='https://mansi-portfolio-nine.vercel.app/' color='#0000EE'><u>https://mansi-portfolio-nine.vercel.app/</u></a>"
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 8))

def add_section_header(title):
    story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#222222'), spaceAfter=6, spaceBefore=2))

# PROFESSIONAL SUMMARY
add_section_header("PROFESSIONAL SUMMARY")
summary_p = ("Computer Science graduate with experience in Python, Machine Learning, Data Science, and AI Engineering. "
             "Skilled in building ML pipelines, REST APIs, Dockerized microservices, and AI agents using FastAPI, Django, "
             "Scikit-learn, Pandas, OpenAI, Gemini, and Groq APIs. Experience with agentic AI, LLM integration, and automated "
             "systems. Seeking roles in Python Development, Machine Learning, Data Science, or AI Engineering.")
story.append(Paragraph(summary_p, body_style))
story.append(Spacer(1, 6))

# TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
skills_data = [
    ("<b>Languages:</b>", "Python, SQL"),
    ("<b>ML & Data Science:</b>", "Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, OpenCV, YOLO, PySpark, PyTorch"),
    ("<b>ML Concepts:</b>", "Data Preprocessing, Feature Engineering, Model Deployment, EDA, Classification, Anomaly Detection, Hyperparameter Tuning"),
    ("<b>Backend & API:</b>", "FastAPI, Django, Django Ninja, Node.js, REST APIs, Firebase, SQLite &nbsp;|&nbsp; <b>Databases:</b> MySQL, MongoDB, PostgreSQL"),
    ("<b>Frontend:</b>", "Streamlit, React.js, HTML, CSS, Figma &nbsp;|&nbsp; <b>Visualization:</b> Power BI, Matplotlib, Seaborn"),
    ("<b>Tools & DevOps:</b>", "Docker, Git, GitHub, Postman, Jupyter Notebook, OpenAI API, MLflow"),
    ("<b>Generative AI:</b>", "LLM, Chat Models, Embedding Models, Prompt Engineering, Semantic Search, Embeddings, RAG Concepts, LangChain Fundamentals, OpenAI GPT, Claude, Gemini, Hugging Face, Groq API")
]

for label, val in skills_data:
    p = Paragraph(f"{label} {val}", body_style)
    story.append(p)
    story.append(Spacer(1, 2.5))

story.append(Spacer(1, 4))

# EDUCATION
add_section_header("EDUCATION")
edu_text = "<b>Maharashtra Institute of Technology</b> — <i>B.Tech, CSE</i> &nbsp;|&nbsp; <b>CGPA: 8.74/10</b>"
story.append(Paragraph(edu_text, body_style))
story.append(Spacer(1, 6))

# EXPERIENCE
add_section_header("EXPERIENCE")
exp_title = "<b>Data Science Intern</b> &nbsp;|&nbsp; <b>Amdox Technologies</b> &nbsp;|&nbsp; April 2026 – Present"
exp_links = "<b>GitHub:</b> <a href='https://github.com/patil-08/NeuralRetail.git' color='#0000EE'><u>https://github.com/patil-08/NeuralRetail.git</u></a> &nbsp;&nbsp; <b>Live Demo:</b> <a href='https://neuralretail-production-1569.up.railway.app/docs' color='#0000EE'><u>https://neuralretail-production-1569.up.railway.app/docs</u></a>"
exp_proj = "<b>Project: NeuralRetail – AI-Powered Sales Intelligence and Predictive Analytics Platform</b>"

story.append(Paragraph(exp_title, body_style))
story.append(Paragraph(exp_links, body_style))
story.append(Paragraph(exp_proj, body_style))
story.append(Spacer(1, 3))

exp_bullets = [
    "Built a retail ML platform for demand forecasting, churn prediction, and inventory optimization.",
    "Developed a demand forecasting model using Prophet and LSTM for 30-day SKU-level predictions.",
    "Created churn prediction models using XGBoost and LightGBM with explainability features.",
    "Designed Spark and Delta Lake ETL pipelines with automated data quality checks.",
    "Delivered a Streamlit analytics dashboard integrated with FastAPI, Redis caching, MLflow tracking, and Airflow orchestration."
]

for b in exp_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 4))

# PROJECTS
add_section_header("PROJECTS")

# Project 1: Newsly
p1_title = "<b>Newsly – AI-Powered Daily News Digest Agent</b> &nbsp;|&nbsp; Python, FastAPI, Docker, Groq API (Llama 3.3-70B), Google News RSS, Gmail SMTP, GitHub Actions, Render &nbsp;|&nbsp; 2026"
p1_links = "<b>GitHub:</b> <a href='https://github.com/patil-08/Newsly' color='#0000EE'><u>https://github.com/patil-08/Newsly</u></a> &nbsp;&nbsp; <b>Live Demo:</b> <a href='https://newsly-b74f.onrender.com/' color='#0000EE'><u>https://newsly-b74f.onrender.com/</u></a>"
story.append(Paragraph(p1_title, body_style))
story.append(Paragraph(p1_links, body_style))
story.append(Spacer(1, 2))
p1_bullets = [
    "Developed an AI-powered news aggregation platform that fetches and summarizes news across five categories (Technology & AI, Finance & Markets, Politics, Sports, Fashion) using Google News RSS and the Groq Llama 3.3-70B model.",
    "Built a responsive FastAPI dashboard and implemented automated email delivery of daily news digests via Gmail SMTP.",
    "Containerized the application using Docker and automated daily news generation via GitHub Actions deployed on Render.",
    "Managed secure configuration using environment variables with python-dotenv."
]
for b in p1_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 4))

# Project 2: Loan Approval
p2_title = "<b>Loan Approval Prediction System with AI Chatbot</b> &nbsp;|&nbsp; Python, Scikit-learn, FastAPI, Streamlit, OpenAI API &nbsp;|&nbsp; 2026"
p2_links = "<b>GitHub:</b> <a href='https://github.com/patil-08/loan-approval-ml.git' color='#0000EE'><u>https://github.com/patil-08/loan-approval-ml.git</u></a> &nbsp;&nbsp; <b>Live Demo:</b> <a href='https://loan-approval-ml-hmhp.onrender.com' color='#0000EE'><u>https://loan-approval-ml-hmhp.onrender.com</u></a>"
story.append(Paragraph(p2_title, body_style))
story.append(Paragraph(p2_links, body_style))
story.append(Spacer(1, 2))
p2_bullets = [
    "Built end-to-end ML pipeline to predict loan approval using applicant financial data; stored predictions and history in SQLite.",
    "Developed FastAPI backend for predictions and user authentication; Streamlit dashboard for real-time visualization.",
    "Integrated OpenAI API chatbot to explain results and provide suggestions; managed version control via Git and GitHub."
]
for b in p2_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 4))

# Project 3: Road Safety
p3_title = "<b>AI-Based Road Safety Detection System</b> &nbsp;|&nbsp; Python, OpenCV, YOLO, Pandas &nbsp;|&nbsp; 2025"
p3_links = "<b>GitHub:</b> <a href='https://github.com/patil-08/roadsaftetydetection.git' color='#0000EE'><u>https://github.com/patil-08/roadsaftetydetection.git</u></a>"
story.append(Paragraph(p3_title, body_style))
story.append(Paragraph(p3_links, body_style))
story.append(Spacer(1, 2))
p3_bullets = [
    "Built real-time road safety detection using YOLO for traffic violation identification; used Pandas and Matplotlib for analysis."
]
for b in p3_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 4))

# Project 4: E-Commerce
p4_title = "<b>E-Commerce Website</b> &nbsp;|&nbsp; Node.js, MongoDB, JavaScript &nbsp;|&nbsp; 2024"
p4_links = "<b>GitHub:</b> <a href='https://github.com/patil-08/Style-Up-E-commerce-Website.git' color='#0000EE'><u>https://github.com/patil-08/Style-Up-E-commerce-Website.git</u></a>"
story.append(Paragraph(p4_title, body_style))
story.append(Paragraph(p4_links, body_style))
story.append(Spacer(1, 2))
p4_bullets = [
    "Developed full-stack e-commerce platform with product browsing, cart management, and secure checkout."
]
for b in p4_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 6))

# CERTIFICATIONS
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
    story.append(Spacer(1, 2.5))

doc.build(story)
print("Successfully generated updated Mansi_Patil_Resume.pdf!")
