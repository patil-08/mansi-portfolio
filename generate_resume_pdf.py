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

# Page setup: letter size with slim 0.35 inch (25pt) margins to ensure 1-page fit
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=25,
    leftMargin=25,
    topMargin=25,
    bottomMargin=25
)

styles = getSampleStyleSheet()

# Custom Typography & Styles matching clean professional resume design
title_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=20,
    alignment=1,
    textColor=colors.HexColor('#0F172A')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=1,
    textColor=colors.HexColor('#334155')
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=12,
    textColor=colors.HexColor('#0F172A'),
    spaceAfter=2,
    spaceBefore=4
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.2,
    leading=10.8,
    textColor=colors.HexColor('#1E293B')
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.0,
    leading=10.5,
    leftIndent=10,
    firstLineIndent=-6,
    textColor=colors.HexColor('#1E293B')
)

subhead_style = ParagraphStyle(
    'SubheadCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.2,
    leading=10.8,
    textColor=colors.HexColor('#0F172A')
)

story = []

# 1. HEADER
story.append(Paragraph("MANSI PATIL", title_style))
story.append(Spacer(1, 3))
contact_text = "+91 8767827166 &nbsp;|&nbsp; mansipatil71899@gmail.com &nbsp;|&nbsp; <a href='https://github.com/patil-08' color='#1D4ED8'><u>github.com/patil-08</u></a> &nbsp;|&nbsp; <a href='https://mansi-portfolio-nine.vercel.app' color='#1D4ED8'><u>mansi-portfolio-nine.vercel.app</u></a>"
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 4))

def add_section_header(title):
    story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#1E293B'), spaceAfter=4, spaceBefore=1))

# 2. PROFESSIONAL SUMMARY
add_section_header("PROFESSIONAL SUMMARY")
summary_p = ("Computer Science graduate (B.Tech, CGPA 8.74/10) with project experience across data analytics, machine learning, and Generative AI. "
             "Built ML models for prediction and forecasting (Scikit-learn, XGBoost), Retrieval-Augmented Generation (RAG) pipelines with vector search (Qdrant), "
             "and LLM-powered applications (Groq, OpenAI, Claude APIs) using prompt engineering and embeddings. Comfortable with SQL, Python, PySpark, Power BI, "
             "and data visualization (Streamlit/Plotly dashboards), and tracked model experiments in MLflow for reproducibility. Seeking an entry-level Data & Analytics "
             "Engineer role to build semantic models, dashboards, data pipelines, and AI-enabled solutions.")
story.append(Paragraph(summary_p, body_style))
story.append(Spacer(1, 3))

# 3. TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
skills_data = [
    ("<b>BI, Analytics & Data:</b>", "Power BI, SQL, Python, PySpark, Pandas, NumPy, Feature Engineering, Data Cleansing & Validation, Matplotlib/Seaborn"),
    ("<b>Generative AI / LLM:</b>", "LLM Integration, Prompt Engineering, RAG, Multimodal RAG, Embeddings, Vector Databases (Qdrant), Cross-Modal Retrieval, LangChain, OpenAI GPT, Claude, Gemini, Groq API, Hugging Face"),
    ("<b>Machine Learning:</b>", "Scikit-learn, XGBoost, PyTorch, Model Evaluation & Cross-Validation, OpenCV, YOLO"),
    ("<b>Backend, APIs & Databases:</b>", "FastAPI, Django, REST APIs, MySQL, PostgreSQL, SQLite"),
    ("<b>Tools & Workflow Automation:</b>", "Docker, Git/GitHub, GitHub Actions, MLflow (experiment tracking), Jupyter, Streamlit, Postman")
]

for label, val in skills_data:
    p = Paragraph(f"{label} {val}", body_style)
    story.append(p)
    story.append(Spacer(1, 1.5))

story.append(Spacer(1, 2))

# 4. EXPERIENCE
add_section_header("EXPERIENCE")

# Two-column layout for Experience title & dates
exp_left = Paragraph("<b>Data Science Intern</b> | <b>Amdox Technologies</b>", subhead_style)
exp_right = Paragraph("<para align='right'>Apr 2026 – Jun 2026</para>", subhead_style)
t = Table([[exp_left, exp_right]], colWidths=[410, 150])
t.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(t)

exp_proj = "<i>NeuralRetail — AI Sales Intelligence Platform</i> | <a href='https://github.com/patil-08/NeuralRetail' color='#1D4ED8'><u>GitHub</u></a>"
story.append(Paragraph(exp_proj, body_style))
story.append(Spacer(1, 2))

exp_bullets = [
    "<b>Engineered</b> an enterprise retail analytics system integrating 3 ML models — XGBoost churn prediction (0.84+ ROC-AUC), ARIMA 30-day demand forecasting, and K-Means customer segmentation.",
    "<b>Architected</b> secure RESTful FastAPI endpoints with JWT authentication and SQLite persistence, powering real-time model scoring and automated inventory reorder alerts.",
    "<b>Built</b> an interactive Streamlit/Plotly dashboard visualizing sales trends and churn simulations, and tracked lifecycle metrics for all 3 models with MLflow, supporting reproducible experimentation and model monitoring."
]

for b in exp_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 1.5))

story.append(Spacer(1, 3))

# 5. PROJECTS (DATA, ML & GENERATIVE AI FOCUS)
add_section_header("PROJECTS (DATA, ML & GENERATIVE AI FOCUS)")

# Project 1: Multimodal RAG Engine
p1_head = "<b>Multimodal RAG Engine — Cross-Modal Document Intelligence System</b> | <a href='https://github.com/patil-08' color='#1D4ED8'><u>GitHub</u></a>"
p1_tech = "<i>Python, FastAPI, Qdrant, CLIP, BLIP-2, Claude API, Docker</i>"
story.append(Paragraph(p1_head, subhead_style))
story.append(Paragraph(p1_tech, body_style))
story.append(Spacer(1, 1.5))

p1_bullets = [
    "<b>Built</b> a multimodal RAG pipeline that extracts text, tables, and high-DPI page images from PDFs using PyMuPDF, with sentence-aware chunking (~300 chars) to eliminate mid-sentence breaks.",
    "<b>Designed</b> a dual-vector retrieval system combining SentenceTransformer (384-d) text embeddings and OpenCLIP (512-d) image embeddings via Reciprocal Rank Fusion, enabling joint retrieval of text and visual chart content.",
    "<b>Reduced</b> context noise by applying a dynamic relevance cutoff (≥ 0.40) and MS-MARCO Cross-Encoder reranking in Qdrant, cutting retrieved context to 3 high-precision chunks per query.",
    "<b>Engineered</b> a grounded Vision-LLM generator (Claude API) with XML-based prompt-injection defenses, inline page citations, and refusal logic to prevent hallucinated answers.",
    "<b>Deployed</b> a FastAPI backend with threadpool-based background execution and startup model pre-warming, paired with a Streamlit UI and an automated evaluation suite for regression testing."
]

for b in p1_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 1.2))

story.append(Spacer(1, 2.5))

# Project 2: Newsly
p2_head = "<b>Newsly — AI-Powered Daily News Digest Agent</b> | <a href='https://github.com/patil-08/Newsly' color='#1D4ED8'><u>GitHub</u></a> | <a href='https://newsly-b74f.onrender.com/' color='#1D4ED8'><u>Live Demo</u></a>"
p2_tech = "<i>Python, FastAPI, Groq API (Llama 3.3-70B), Docker, GitHub Actions</i>"
story.append(Paragraph(p2_head, subhead_style))
story.append(Paragraph(p2_tech, body_style))
story.append(Spacer(1, 1.5))

p2_bullets = [
    "<b>Created</b> an LLM-powered news agent retrieving and summarizing articles across 5 categories in real time using Google News RSS for retrieval and prompt-engineered summarization with Llama 3.3-70B — an applied RAG-style pipeline.",
    "<b>Automated</b> a FastAPI dashboard with scheduled Gmail SMTP digest delivery; containerized with Docker and orchestrated daily runs via GitHub Actions."
]

for b in p2_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 1.2))

story.append(Spacer(1, 2.5))

# Project 3: Loan Approval
p3_head = "<b>Loan Approval Prediction System with AI Chatbot</b> | <a href='https://github.com/patil-08/loan-approval-ml.git' color='#1D4ED8'><u>GitHub</u></a> | <a href='https://loan-approval-ml-hmhp.onrender.com' color='#1D4ED8'><u>Live Demo</u></a>"
p3_tech = "<i>Python, Scikit-learn, XGBoost, FastAPI, Streamlit, OpenAI API (GPT-4o-mini)</i>"
story.append(Paragraph(p3_head, subhead_style))
story.append(Paragraph(p3_tech, body_style))
story.append(Spacer(1, 1.5))

p3_bullets = [
    "<b>Delivered</b> an end-to-end ML classification pipeline (XGBoost, Scikit-learn) to assess applicant financial risk and predict loan approval status based on 10+ demographic and credit variables, applying supervised learning and model evaluation best practices.",
    "<b>Integrated</b> an AI financial advisory chatbot powered by the OpenAI API (GPT-4o-mini) to explain prediction rationale and provide actionable, data-grounded recommendations.",
    "<b>Deployed</b> an interactive Streamlit analytics dashboard alongside the full-stack system, taking it live to cloud production via Render."
]

for b in p3_bullets:
    story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 1.2))

story.append(Spacer(1, 3))

# 6. EDUCATION
add_section_header("EDUCATION")
edu_left = Paragraph("<b>Maharashtra Institute of Technology</b> — <i>B.Tech, Computer Science Engineering</i>", body_style)
edu_right = Paragraph("<para align='right'><b>CGPA: 8.74 / 10</b></para>", body_style)
t_edu = Table([[edu_left, edu_right]], colWidths=[410, 150])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)
story.append(Spacer(1, 3))

# 7. CERTIFICATIONS
add_section_header("CERTIFICATIONS")
certs = [
    "<b>Business Intelligence with Advanced Excel and Power BI</b> (2024)",
    "<b>CSRBOX — Agentic AI: From Learner to Builder – AI Agent Architect</b> (2025)",
    "<b>Deloitte — Data Analyst Certificate</b> (2025)"
]

for c in certs:
    story.append(Paragraph(f"• {c}", bullet_style))
    story.append(Spacer(1, 1.5))

doc.build(story)
print("Successfully generated updated Mansi_Patil_Resume.pdf!")
