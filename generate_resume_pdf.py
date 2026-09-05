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

# Page setup: letter size with clean margins to ensure perfect 1-page fit
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=26,
    leftMargin=26,
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
    leading=9.8,
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
    fontName='Helvetica',
    fontSize=8.0,
    leading=10.2,
    textColor=colors.HexColor('#0F172A')
)

story = []

# 1. HEADER
story.append(Paragraph("MANSI PATIL", title_style))
story.append(Spacer(1, 2))
contact_text = "+91 8767827166 &nbsp;|&nbsp; mansipatil71899@gmail.com &nbsp;|&nbsp; <a href='https://github.com/patil-08' color='#1D4ED8'><u>github.com/patil-08</u></a> &nbsp;|&nbsp; <a href='https://mansi-portfolio-nine.vercel.app' color='#1D4ED8'><u>mansi-portfolio-nine.vercel.app</u></a>"
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 2.5))

def add_section_header(title):
    story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#1E293B'), spaceAfter=2.5, spaceBefore=0.5))

# 2. PROFESSIONAL SUMMARY
add_section_header("PROFESSIONAL SUMMARY")
summary_p = ("Computer Science graduate (B.Tech, CGPA 8.74/10) with hands-on experience across data analytics, machine learning, and Generative AI, built through "
             "an industry internship and independent end-to-end projects. Comfortable executing well-defined analytical tasks — data cleaning, feature engineering, "
             "exploratory analysis, and structured model validation — using SQL, Python, PySpark, and Power BI/Streamlit. Applied classification, clustering, and "
             "forecasting techniques (0.84+ ROC-AUC) and tracked experiments in MLflow for reproducibility. Also gained exposure to unstructured data and LLM-based "
             "techniques through applied RAG pipelines, cutting retrieved context by over 60% via relevance filtering and reranking. Seeking an entry-level "
             "Data Scientist role to support senior team members in building reliable models, dashboards, and AI-enabled solutions within structured, guided workflows.")
story.append(Paragraph(summary_p, body_style))
story.append(Spacer(1, 2))

# 3. TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
skills_data = [
    ("<b>BI, Analytics & Data:</b>", "Power BI, SQL, Python, PySpark, Pandas, NumPy, Feature Engineering, Data Cleansing & Validation, Exploratory Data Analysis, Matplotlib/Seaborn"),
    ("<b>Machine Learning:</b>", "Scikit-learn, XGBoost, PyTorch, Regression, Classification, Clustering, Forecasting, Model Evaluation & Cross-Validation, OpenCV, YOLO"),
    ("<b>Generative AI / LLM:</b>", "LLM Integration, Prompt Engineering, RAG, Multimodal RAG, Embeddings, Vector Databases (Qdrant), Cross-Modal Retrieval, LangChain, LangGraph, OpenAI GPT, Claude, Gemini, Groq API, Hugging Face"),
    ("<b>Backend, APIs & Databases:</b>", "FastAPI, Django, REST APIs, MySQL, PostgreSQL, SQLite"),
    ("<b>Tools & Workflow:</b>", "Docker, Git/GitHub, GitHub Actions, MLflow (experiment tracking), Jupyter, Streamlit, Postman")
]

for label, val in skills_data:
    p = Paragraph(f"{label} {val}", body_style)
    story.append(p)
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# 4. EXPERIENCE
add_section_header("EXPERIENCE")

exp_left = Paragraph("<b>Data Science Intern</b> | <i>Amdox Technologies</i> (<a href='https://github.com/patil-08/NeuralRetail' color='#1D4ED8'><u>GitHub</u></a>)", subhead_style)
exp_right = Paragraph("<para align='right'>Apr 2026 – Jun 2026</para>", subhead_style)
t = Table([[exp_left, exp_right]], colWidths=[420, 140])
t.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(t)
story.append(Spacer(1, 1))

exp_bullets = [
    "Supported senior team members on <b>NeuralRetail</b>, an enterprise retail analytics system, by developing 3 ML models under guided workflows — <b>XGBoost churn classification (0.84+ ROC-AUC)</b>, ARIMA 30-day demand forecasting, and K-Means customer segmentation.",
    "Built and tested secure <b>RESTful FastAPI endpoints</b> with JWT authentication and SQLite persistence, powering real-time model scoring and automated inventory reorder alerts.",
    "Performed structured exploratory data analysis and data validation, and built an interactive <b>Streamlit/Plotly dashboard</b> to visualize sales trends and churn simulations.",
    "Tracked model lifecycle metrics for all 3 models using <b>MLflow</b>, following defined evaluation practices to support reproducible experimentation."
]

for b in exp_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# 5. PROJECTS
add_section_header("PROJECTS")

# Project 1: Multimodal RAG Engine
p1_head = "<b>Multimodal RAG Engine — Cross-Modal Document Intelligence System</b> (<a href='https://github.com/patil-08' color='#1D4ED8'><u>GitHub</u></a>) — <i>Python, FastAPI, Qdrant, CLIP, BLIP-2, Claude API, Docker</i>"
story.append(Paragraph(p1_head, subhead_style))
story.append(Spacer(1, 0.8))

p1_bullets = [
    "Built a multimodal RAG pipeline extracting text, tables, and high-DPI page images from PDFs (PyMuPDF), with sentence-aware chunking (~300 characters) to eliminate mid-sentence breaks.",
    "Designed a dual-vector retrieval system combining 384-dimension SentenceTransformer text embeddings and 512-dimension OpenCLIP image embeddings via Reciprocal Rank Fusion, enabling joint retrieval of text and visual chart content.",
    "Reduced retrieved context by over 60% (to 3 high-precision chunks per query) by applying a dynamic relevance cutoff (≥0.40) and MS-MARCO Cross-Encoder reranking in Qdrant, cutting noise while preserving answer accuracy.",
    "Engineered a grounded Vision-LLM generator (Claude API) with XML-based prompt-injection defenses, inline citations, and refusal logic to prevent hallucinated answers, validated by an automated regression-testing suite; deployed via FastAPI with a Streamlit UI."
]
for b in p1_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# Project 2: Newsly
p2_head = "<b>Newsly — AI-Powered Daily News Digest Agent</b> (<a href='https://github.com/patil-08/Newsly' color='#1D4ED8'><u>GitHub</u></a> | <a href='https://newsly-b74f.onrender.com/' color='#1D4ED8'><u>Live Demo</u></a>) — <i>Python, FastAPI, Groq API (Llama 3.3-70B), Docker, GitHub Actions</i>"
story.append(Paragraph(p2_head, subhead_style))
story.append(Spacer(1, 0.8))

p2_bullets = [
    "Built an LLM-powered news agent retrieving and summarizing articles across 5 categories in real time using Google News RSS retrieval and prompt-engineered summarization with Llama 3.3-70B, in an applied RAG-style pipeline.",
    "Automated a FastAPI dashboard with scheduled Gmail SMTP digest delivery; containerized with Docker and orchestrated daily runs via GitHub Actions with zero manual intervention."
]
for b in p2_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.5))

# Project 3: Loan Approval
p3_head = "<b>Loan Approval Prediction System with AI Chatbot</b> (<a href='https://github.com/patil-08/loan-approval-ml.git' color='#1D4ED8'><u>GitHub</u></a> | <a href='https://loan-approval-ml-hmhp.onrender.com' color='#1D4ED8'><u>Live Demo</u></a>) — <i>Python, Scikit-learn, XGBoost, FastAPI, Streamlit, OpenAI API (GPT-4o-mini)</i>"
story.append(Paragraph(p3_head, subhead_style))
story.append(Spacer(1, 0.8))

p3_bullets = [
    "Delivered an end-to-end ML classification pipeline (XGBoost, Scikit-learn) to assess applicant financial risk and predict loan approval status based on 10+ demographic and credit variables.",
    "Integrated an AI financial advisory chatbot (OpenAI GPT-4o-mini) to explain prediction rationale and provide actionable, data-grounded, and interpretable recommendations.",
    "Deployed an interactive Streamlit analytics dashboard alongside the full-stack system, taking it live to cloud production via Render."
]
for b in p3_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 0.8))

story.append(Spacer(1, 1.8))

# 6. EDUCATION
add_section_header("EDUCATION")
edu_text = "<b>Maharashtra Institute of Technology</b> — B.Tech, Computer Science Engineering &nbsp;|&nbsp; <b>CGPA: 8.74 / 10</b>"
story.append(Paragraph(edu_text, body_style))
story.append(Spacer(1, 2))

# 7. CERTIFICATIONS
add_section_header("CERTIFICATIONS")
certs_text = "Business Intelligence with Advanced Excel and Power BI (2024) &nbsp;•&nbsp; CSRBOX — Agentic AI: From Learner to Builder – AI Agent Architect (2025) &nbsp;•&nbsp; Deloitte — Data Analyst Certificate (2025)"
story.append(Paragraph(certs_text, body_style))

doc.build(story)

# Also generate fresh copy with cache-immune name Mansi_Patil_Resume_2026.pdf
pdf_path_2026 = os.path.join(os.path.dirname(__file__), "Mansi_Patil_Resume_2026.pdf")
doc2 = SimpleDocTemplate(
    pdf_path_2026,
    pagesize=letter,
    rightMargin=26,
    leftMargin=26,
    topMargin=20,
    bottomMargin=20
)
doc2.build(story)

print("Successfully generated exact updated Mansi_Patil_Resume.pdf and Mansi_Patil_Resume_2026.pdf!")
