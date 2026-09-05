// Premium Interactive Controller - Mansi Patil Portfolio

// --- FLOATING UI NAVIGATION & UTILITIES ---
const scrollBar = document.getElementById('scrollBar');
const backTop = document.getElementById('backTop');
const header = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  
  // Progress Bar
  if (scrollBar) {
    scrollBar.style.width = (total > 0 ? (y / total) * 100 : 0) + '%';
  }
  
  // Back to Top Button
  if (backTop) {
    if (y > 400) backTop.classList.add('show');
    else backTop.classList.remove('show');
  }

  // Active Nav Links
  const sections = ['home', 'experience', 'projects', 'chat', 'timeline', 'resume', 'contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop - 80;
    const bot = top + el.offsetHeight;
    const lnk = document.querySelector(`.nl[onclick*="'${id}'"]`);
    if (lnk) {
      if (y >= top && y < bot) lnk.classList.add('on');
      else lnk.classList.remove('on');
    }
  });
}, { passive: true });

function go(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Clock
setInterval(() => {
  const clk = document.getElementById('clk');
  if (clk) {
    clk.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
  }
}, 1000);

// --- TOAST ALERTS ---
function showToast(msg, type = 'success', dur = 3500) {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => t.classList.add('show'));
  });
  
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 350);
  }, dur);
}

// --- TERMINAL TYPEWRITER ---
(function typeTerminal() {
  const body = document.getElementById('termBody');
  if (!body) return;
  
  const lines = [
    { pfx: '~$', text: 'python mansi_agent.py', color: 'var(--blue)' },
    { pfx: '[SYS]', text: 'Initializing data science environment...', color: 'var(--t2)' },
    { pfx: '[SYS]', text: 'Connecting to NeuralRetail dashboard schema... [OK]', color: 'var(--green)' },
    { pfx: '[SYS]', text: 'Ingesting features: transaction vectors & churn logs... [OK]', color: 'var(--green)' },
    { pfx: '>>>', text: 'Mansi Patil portfolio shell successfully ready.', color: 'var(--purple)' }
  ];
  
  let lineIdx = 0;
  
  function printLine() {
    if (lineIdx >= lines.length) return;
    
    const l = lines[lineIdx];
    const wrapper = document.createElement('div');
    wrapper.className = 'tl vis';
    wrapper.style.marginTop = '0.5rem';
    
    const pfxSpan = document.createElement('span');
    pfxSpan.className = 'tp';
    pfxSpan.textContent = l.pfx;
    wrapper.appendChild(pfxSpan);
    
    const textSpan = document.createElement('span');
    textSpan.style.marginLeft = '8px';
    textSpan.style.color = l.color;
    wrapper.appendChild(textSpan);
    
    body.appendChild(wrapper);
    
    // Type out the characters of the line
    let charIdx = 0;
    function typeChar() {
      if (charIdx < l.text.length) {
        textSpan.textContent += l.text.charAt(charIdx);
        charIdx++;
        setTimeout(typeChar, 15 + Math.random() * 25);
      } else {
        // Add caret to final line
        if (lineIdx === lines.length - 1) {
          const caret = document.createElement('span');
          caret.className = 'caret';
          textSpan.appendChild(caret);
        }
        lineIdx++;
        setTimeout(printLine, 400 + Math.random() * 300);
      }
    }
    
    typeChar();
  }
  
  setTimeout(printLine, 1000);
})();

// --- NEURAL NETWORK CANVAS ANIMATION ---
(function() {
  const c = document.getElementById('net');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, nodes = [], sigs = [];
  
  function resize() {
    W = c.width = c.offsetWidth;
    H = c.height = c.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => {
    resize();
    mkNodes();
  });
  
  function mkNodes() {
    nodes = [];
    const layers = [3, 5, 5, 4, 3];
    const lw = W / (layers.length + 1);
    layers.forEach((n, li) => {
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: lw * (li + 1),
          y: H / 2 + (i - (n - 1) / 2) * (H / (n + 1.8)),
          layer: li
        });
      }
    });
  }
  mkNodes();
  
  // Random signals traveling through network
  setInterval(() => {
    const srcNodes = nodes.filter(n => n.layer === 0);
    if (!srcNodes.length) return;
    const src = srcNodes[Math.floor(Math.random() * srcNodes.length)];
    const path = [src];
    
    for (let l = 1; l < 5; l++) {
      const candidates = nodes.filter(n => n.layer === l);
      if (candidates.length) {
        path.push(candidates[Math.floor(Math.random() * candidates.length)]);
      }
    }
    sigs.push({
      path,
      t: 0,
      s: 0.008 + Math.random() * 0.006
    });
  }, 600);
  
  function draw() {
    ctx.clearRect(0, 0, W, H);
    
    // Draw Connections
    for (let l = 0; l < 4; l++) {
      const from = nodes.filter(n => n.layer === l);
      const to = nodes.filter(n => n.layer === l + 1);
      from.forEach(a => {
        to.forEach(b => {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(40, 49, 92, 0.4)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        });
      });
    }
    
    // Draw Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#161b33';
      ctx.fill();
      ctx.strokeStyle = '#28315c';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw Signals
    sigs = sigs.filter(s => s.t <= 1);
    sigs.forEach(s => {
      s.t += s.s;
      if (s.t > 1) return;
      const seg = s.t * (s.path.length - 1);
      const idx = Math.floor(seg);
      const fr = seg - idx;
      if (idx >= s.path.length - 1) return;
      
      const a = s.path[idx];
      const b = s.path[idx + 1];
      const x = a.x + (b.x - a.x) * fr;
      const y = a.y + (b.y - a.y) * fr;
      
      const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
      g.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
      g.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
    });
    
    requestAnimationFrame(draw);
  }
  draw();
})();

// --- REAL GITHUB CONTRIBUTION HEATMAP ---
(async function initGitHubHeatmap() {
  const container = document.getElementById('heatmap');
  const countEl = document.getElementById('ghTotalCount');
  if (!container) return;

  const username = 'patil-08';

  try {
    let res = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`);
    if (!res.ok) {
      // Direct API fallback if local serverless endpoint is not available
      res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
    }
    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    const days = data.contributions || [];
    if (!days.length) throw new Error('No contribution data found');

    const total = data.total?.lastYear ?? days.reduce((acc, d) => acc + (d.count || 0), 0);
    if (countEl) {
      countEl.innerHTML = `<b style="color:var(--t0)">${total}</b> contributions in the last year`;
    }

    // Group days into 7-day week columns
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Month headers
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsRow = document.createElement('div');
    monthsRow.className = 'hm-months';

    let lastMonth = -1;
    const monthPositions = [];

    weeks.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date) {
        const m = parseInt(firstDay.date.split('-')[1], 10) - 1;
        if (m !== lastMonth) {
          lastMonth = m;
          monthPositions.push({ name: monthNames[m], col: wIdx });
        }
      }
    });

    monthPositions.forEach(mp => {
      const mSpan = document.createElement('span');
      mSpan.textContent = mp.name;
      mSpan.style.position = 'absolute';
      mSpan.style.left = (mp.col * 13) + 'px';
      monthsRow.appendChild(mSpan);
    });

    const weeksWrap = document.createElement('div');
    weeksWrap.className = 'hm-weeks';

    weeks.forEach(week => {
      const wCol = document.createElement('div');
      wCol.className = 'hm-week';
      week.forEach(day => {
        const cell = document.createElement('div');
        cell.className = `hc lvl-${Math.min(4, Math.max(0, day.level || 0))}`;
        cell.setAttribute('title', `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`);
        wCol.appendChild(cell);
      });
      weeksWrap.appendChild(wCol);
    });

    container.innerHTML = '';
    container.appendChild(monthsRow);
    container.appendChild(weeksWrap);
  } catch (err) {
    if (countEl) countEl.textContent = 'Activity temporarily unavailable';
    container.innerHTML = `<div style="font-family:var(--mono);font-size:11px;color:var(--t3);padding:0.5rem 0">// Unable to load live GitHub activity (@${username})</div>`;
  }
})();

// --- MODALS (CASE STUDIES & LABS) ---
function openModal(id) {
  const modal = document.getElementById('m-' + id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById('m-' + id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modals when clicking overlay background
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', (e) => {
    if (e.target === o) {
      o.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// --- INTERACTIVE AI CHAT ENGINE ---
const chatResponses = {
  rag: "The Multimodal RAG Engine is a flagship Cross-Modal Document Intelligence system. Built with Python, FastAPI, PyMuPDF, Qdrant, CLIP, BLIP-2, Claude API, and Docker. It extracts text and visual charts from complex PDFs, indexes dual-vector embeddings (384-d text + 512-d image) in Qdrant with Reciprocal Rank Fusion & MS-MARCO Cross-Encoder reranking, and generates grounded answers with inline citations via Claude Vision-LLM.",
  amdox: "At Amdox Technologies (Apr 2026 – Jun 2026), Mansi supported senior team members on NeuralRetail, an enterprise retail analytics system, by developing 3 ML models under guided workflows — XGBoost churn classification (0.84+ ROC-AUC), ARIMA 30-day demand forecasting, and K-Means customer segmentation. She built and tested secure RESTful FastAPI endpoints with JWT authentication and SQLite persistence, performed exploratory data analysis with a Streamlit/Plotly dashboard, and tracked model lifecycle metrics in MLflow.",
  pune: "Yes, Mansi Patil is based in Pune, India, and is open to entry-level Data Scientist, Machine Learning, and Python Development roles.",
  tech: "Her updated skillset covers:<br>• BI, Analytics & Data: Power BI, SQL, Python, PySpark, Pandas, NumPy, Feature Engineering, Data Cleansing & Validation, Exploratory Data Analysis, Matplotlib/Seaborn<br>• Machine Learning: Scikit-learn, XGBoost, PyTorch, Regression, Classification, Clustering, Forecasting, Model Evaluation & Cross-Validation, OpenCV, YOLO<br>• Generative AI / LLM: LLM Integration, Prompt Engineering, RAG, Multimodal RAG, Embeddings, Vector Databases (Qdrant), Cross-Modal Retrieval, LangChain, LangGraph, OpenAI GPT, Claude, Gemini, Groq API, Hugging Face<br>• Backend, APIs & Databases: FastAPI, Django, REST APIs, MySQL, PostgreSQL, SQLite<br>• Tools & Workflow: Docker, Git/GitHub, GitHub Actions, MLflow (experiment tracking), Jupyter, Streamlit, Postman",
  jobs: "Yes! Mansi is a Computer Science graduate (B.Tech CSE, CGPA 8.74/10) with hands-on experience across Data Analytics, Machine Learning, and Generative AI. She is actively seeking entry-level Data Scientist roles to support senior team members in building reliable models, dashboards, and AI-enabled solutions within structured, guided workflows.",
  newsly: "Newsly is an AI-Powered Daily News Digest Agent built with Python, FastAPI, Docker, Groq API (Llama 3.3-70B), Google News RSS, Gmail SMTP, and GitHub Actions. It automatically aggregates and summarizes news across 5 categories in real time and sends automated daily email digests.",
  loan: "The Loan Approval Prediction System delivers an end-to-end ML classification pipeline (XGBoost, Scikit-learn) predicting applicant financial risk from 10+ variables. Features an OpenAI API (GPT-4o-mini) financial chatbot and an interactive Streamlit dashboard live on Render.",
  road: "The AI-Based Road Safety Detection System uses YOLO object detection for real-time traffic violation identification, processing video feeds with OpenCV and executing telemetry analytics using Pandas and Matplotlib.",
  ecommerce: "The E-Commerce Website (Style-Up) is a full-stack shopping application built using Node.js, MongoDB, Express, and JavaScript featuring product catalog queries, cart management, and secure checkout workflows.",
  certifications: "Mansi holds professional certifications:<br>1. Business Intelligence with Advanced Excel & Power BI (2024)<br>2. CSRBOX: Agentic AI – From Learner to Builder – AI Agent Architect (2025)<br>3. Deloitte: Data Analyst Certificate (2025)",
  resume: "You can view and download Mansi's PDF resume directly using the 'Download PDF' button in the Resume section of the site!",
  email: "You can reach out directly via:<br>• ✉ Email: <a href='mailto:mansipatil71899@gmail.com' style='color:var(--blue);text-decoration:underline'>mansipatil71899@gmail.com</a><br>• 📱 Phone: <a href='tel:+918767827166' style='color:var(--blue);text-decoration:underline'>+91 87678 27166</a><br>• 💼 LinkedIn: <a href='https://linkedin.com/in/mansi-patil-6343992b8' target='_blank' style='color:var(--blue);text-decoration:underline'>mansi-patil-6343992b8</a><br><br>Or click <b>'💼 Share a Job Opportunity'</b> to submit job specs or request an interview directly!"
};

// --- INLINE RECRUITER LEAD CAPTURE FORM ---
let leadFormCounter = 0;
function renderOpportunityForm() {
  leadFormCounter++;
  const formId = `chat-lead-form-${leadFormCounter}`;
  return `
    <div>
      <p style="margin-bottom:0.6rem">Mansi is currently open to entry-level <b>Data Scientist</b>, <b>AI/ML</b>, and <b>Python Development</b> roles! Please submit your opportunity details below to connect or schedule an interview:</p>
      <div class="chat-lead-card" id="${formId}">
        <div class="chat-lead-header">💼 Share a Job Opportunity / Schedule Interview</div>
        <div class="chat-lead-field">
          <label class="chat-lead-label">Your Name *</label>
          <input type="text" class="chat-lead-input lead-name" placeholder="e.g. Sarah (Recruiter / Hiring Manager)" required>
        </div>
        <div class="chat-lead-field">
          <label class="chat-lead-label">Email or Phone *</label>
          <input type="text" class="chat-lead-input lead-contact" placeholder="e.g. sarah@company.com / +1..." required>
        </div>
        <div class="chat-lead-field">
          <label class="chat-lead-label">Company / Organization</label>
          <input type="text" class="chat-lead-input lead-company" placeholder="e.g. Analytics Corp / Tech Solutions">
        </div>
        <div class="chat-lead-field">
          <label class="chat-lead-label">Role Title &amp; Details</label>
          <textarea class="chat-lead-input chat-lead-textarea lead-msg" placeholder="e.g. We have an open Data & Analytics Engineer role and would like to schedule a 15-min interview..."></textarea>
        </div>
        <button class="chat-lead-submit" onclick="submitChatOpportunity('${formId}')">
          <span>🚀 Send Opportunity to Mansi</span>
        </button>
      </div>
    </div>
  `;
}

function submitChatOpportunity(formId) {
  const card = document.getElementById(formId);
  if (!card) return;
  
  const name = card.querySelector('.lead-name').value.trim();
  const contact = card.querySelector('.lead-contact').value.trim();
  const company = card.querySelector('.lead-company').value.trim() || 'N/A';
  const msg = card.querySelector('.lead-msg').value.trim() || 'Job opportunity / interview request';
  const btn = card.querySelector('.chat-lead-submit');
  
  if (!name || !contact) {
    showToast('Please enter your Name and Email/Phone contact info.', 'error');
    return;
  }
  
  btn.disabled = true;
  btn.innerHTML = '<span>Sending Opportunity...</span>';
  
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: "YOUR_WEB3FORMS_KEY_HERE",
      name: name + " [Recruiter Lead]",
      email: contact.includes('@') ? contact : 'recruiter@mansi-portfolio.com',
      message: `Recruiter Name: ${name}\nContact: ${contact}\nCompany: ${company}\nOpportunity / Message: ${msg}`,
      subject: `💼 New Recruiter Lead / Job Opportunity from ${name} (${company})`
    })
  })
  .then(async (response) => {
    showToast('🚀 Opportunity details sent directly to Mansi!', 'success');
    card.innerHTML = `
      <div style="color:var(--green);font-weight:600;font-size:13.5px;display:flex;align-items:center;gap:0.4rem">
        <span>✓</span><span>Opportunity Submitted Successfully!</span>
      </div>
      <div style="font-size:12px;color:var(--t2);line-height:1.5;margin-top:0.4rem">
        Thank you <b>${name}</b> (${company})! Your message has been sent directly to Mansi at <b>mansipatil71899@gmail.com</b>. She will review your opportunity and reply shortly.
      </div>
    `;
  })
  .catch(() => {
    showToast('🚀 Opportunity recorded! You can also email mansipatil71899@gmail.com', 'success');
    card.innerHTML = `
      <div style="color:var(--green);font-weight:600;font-size:13.5px">✓ Details Recorded!</div>
      <div style="font-size:12px;color:var(--t2);margin-top:0.3rem">
        Thank you <b>${name}</b>! Mansi will follow up via email at <b>mansipatil71899@gmail.com</b>.
      </div>
    `;
  });
}

let chatSpeech = false;
let chatRecog = null;

function chatAsk(question) {
  const windowEl = document.getElementById('chatMsgs');
  
  // Append User message
  const userDiv = document.createElement('div');
  userDiv.className = 'msg user-msg';
  userDiv.innerHTML = `<div class="msg-av av-u">U</div><div class="bubble u-b">${question}</div>`;
  windowEl.appendChild(userDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  // Typing state
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg';
  typingDiv.id = 'typingBubble';
  typingDiv.innerHTML = `<div class="msg-av av-ai">AI</div><div class="bubble ai-b typing"><span></span><span></span><span></span></div>`;
  windowEl.appendChild(typingDiv);
  windowEl.scrollTop = windowEl.scrollHeight;
  
  // Core matching logic
  let lowerQ = question.toLowerCase();
  let reply = "I am Mansi's AI Talent Representative. You can ask me about her Amdox internship, Multimodal RAG Engine, technical skills, or <b>share a job opportunity / schedule an interview</b> directly with her!";
  
  if (lowerQ.includes('share a job') || lowerQ.includes('opportunity') || lowerQ.includes('interview') || lowerQ.includes('hire') || lowerQ.includes('recruiter') || lowerQ.includes('schedule') || lowerQ.includes('job offer') || lowerQ.includes('open role') || lowerQ.includes('vacancy')) {
    reply = renderOpportunityForm();
  } else if (lowerQ.includes('rag') || lowerQ.includes('multimodal') || lowerQ.includes('qdrant') || lowerQ.includes('openclip') || lowerQ.includes('claude')) {
    reply = chatResponses.rag;
  } else if (lowerQ.includes('amdox') || lowerQ.includes('internship') || lowerQ.includes('work') || lowerQ.includes('neuralretail')) {
    reply = chatResponses.amdox;
  } else if (lowerQ.includes('tech') || lowerQ.includes('stack') || lowerQ.includes('skills') || lowerQ.includes('tools') || lowerQ.includes('power bi')) {
    reply = chatResponses.tech;
  } else if (lowerQ.includes('certif') || lowerQ.includes('course') || lowerQ.includes('deloitte') || lowerQ.includes('csrbox')) {
    reply = chatResponses.certifications;
  } else if (lowerQ.includes('newsly') || lowerQ.includes('news') || lowerQ.includes('groq') || lowerQ.includes('digest')) {
    reply = chatResponses.newsly;
  } else if (lowerQ.includes('loan') || lowerQ.includes('approve') || lowerQ.includes('credit') || lowerQ.includes('xgboost')) {
    reply = chatResponses.loan;
  } else if (lowerQ.includes('road') || lowerQ.includes('safety') || lowerQ.includes('yolo') || lowerQ.includes('cv')) {
    reply = chatResponses.road;
  } else if (lowerQ.includes('ecommerce') || lowerQ.includes('e-commerce') || lowerQ.includes('style-up') || lowerQ.includes('cart') || lowerQ.includes('shop')) {
    reply = chatResponses.ecommerce;
  } else if (lowerQ.includes('job') || lowerQ.includes('open to') || lowerQ.includes('role') || lowerQ.includes('analytics engineer')) {
    reply = chatResponses.jobs;
  } else if (lowerQ.includes('pune') || lowerQ.includes('location')) {
    reply = chatResponses.pune;
  } else if (lowerQ.includes('resume') || lowerQ.includes('cv pdf')) {
    reply = chatResponses.resume;
  } else if (lowerQ.includes('contact') || lowerQ.includes('email') || lowerQ.includes('phone') || lowerQ.includes('reach')) {
    reply = chatResponses.email;
  }
  
  setTimeout(() => {
    const loader = document.getElementById('typingBubble');
    if (loader) loader.remove();
    
    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg';
    aiDiv.innerHTML = `<div class="msg-av av-ai">AI</div><div class="bubble ai-b">${reply}</div>`;
    windowEl.appendChild(aiDiv);
    windowEl.scrollTop = windowEl.scrollHeight;
    
    // Web Speech Synthesis (read response out loud if voice model enabled)
    if (chatSpeech && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove HTML tags for clean reading
      const cleanText = reply.replace(/<\/?[^>]+(>|$)/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      window.speechSynthesis.speak(utterance);
    }
  }, 900);
}

function sendChat() {
  const inp = document.getElementById('cwIn');
  const val = inp.value.trim();
  if (!val) return;
  chatAsk(val);
  inp.value = '';
  updateCounter();
}

function updateCounter() {
  const inp = document.getElementById('cwIn');
  const cnt = document.getElementById('cwCounter');
  if (!inp || !cnt) return;
  const len = inp.value.length;
  cnt.textContent = len > 0 ? `${len} chars · Enter ↵ to send` : '';
}

function toggleChatMic() {
  const mic = document.getElementById('cwMic');
  const inp = document.getElementById('cwIn');
  
  if (chatSpeech) {
    chatSpeech = false;
    mic.classList.remove('active');
    mic.textContent = '🎤';
    if (chatRecog) {
      chatRecog.stop();
      chatRecog = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return;
  }
  
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    showToast('Speech recognition not supported in this browser.', 'error');
    return;
  }
  
  chatSpeech = true;
  mic.classList.add('active');
  mic.textContent = '⏹';
  
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  chatRecog = new SR();
  chatRecog.continuous = false;
  chatRecog.interimResults = false;
  chatRecog.onstart = () => {
    inp.placeholder = "Listening...";
  };
  chatRecog.onresult = (e) => {
    const text = e.results[0][0].transcript;
    inp.value = text;
    inp.placeholder = "Type a message...";
    sendChat();
  };
  chatRecog.onerror = () => {
    chatSpeech = false;
    mic.classList.remove('active');
    mic.textContent = '🎤';
    inp.placeholder = "Type a message...";
  };
  chatRecog.onend = () => {
    chatSpeech = false;
    mic.classList.remove('active');
    mic.textContent = '🎤';
    inp.placeholder = "Type a message...";
  };
  chatRecog.start();
}

// --- COMMAND PALETTE ENGINE ---
const cpItems = [
  { label: 'Jump to Home', icon: '🏠', meta: 'nav', action: () => go('home') },
  { label: 'Jump to Technical Skills & Tools', icon: '🛠️', meta: 'nav', action: () => go('skills') },
  { label: 'View Experience at Amdox', icon: '💼', meta: 'nav', action: () => go('experience') },
  { label: 'View Portfolio Projects', icon: '📁', meta: 'nav', action: () => go('projects') },
  { label: 'Chat with Mansi AI Agent', icon: '⚡', meta: 'chat', action: () => go('chat') },
  { label: 'Open Career Timeline', icon: '📅', meta: 'nav', action: () => go('timeline') },
  { label: 'Download Resume PDF', icon: '📄', meta: 'action', action: () => document.querySelector('a[download]')?.click() },
  { label: 'Jump to Contact Details', icon: '✉', meta: 'nav', action: () => go('contact') },
  
  // Case Study Launches
  { label: 'Case Study: Multimodal RAG Engine', icon: '⚡', meta: 'study', action: () => openModal('rag') },
  { label: 'Case Study: Newsly AI News Agent', icon: '📰', meta: 'study', action: () => openModal('newsly') },
  { label: 'Case Study: Loan Approval Predictor & AI Chatbot', icon: '📊', meta: 'study', action: () => openModal('loan') },
  { label: 'Case Study: Road Safety detection', icon: '🚗', meta: 'study', action: () => openModal('road') },
  { label: 'Case Study: E-Commerce Website', icon: '🛒', meta: 'study', action: () => openModal('ecommerce') },
  { label: 'Case Study: NeuralRetail analytics', icon: '💼', meta: 'study', action: () => openModal('neuralretail') }
];

function openCp() {
  const overlay = document.getElementById('cpOverlay');
  overlay.classList.add('open');
  const input = document.getElementById('cpIn');
  input.value = '';
  renderCp('');
  setTimeout(() => input.focus(), 80);
}

function closeCp() {
  document.getElementById('cpOverlay').classList.remove('open');
}

function renderCp(query) {
  const container = document.getElementById('cpRes');
  const filtered = cpItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  
  if (!filtered.length) {
    container.innerHTML = `<div class="cp-item" style="color:var(--t3);cursor:default">No commands found matching "${query}"</div>`;
    return;
  }
  
  container.innerHTML = filtered.map((item, idx) => `
    <div class="cp-item ${idx === 0 ? 'sel' : ''}" onclick="runCpItem(${idx}, '${query}')">
      <div class="cp-ico">${item.icon}</div>
      <span>${item.label}</span>
      <span class="cp-meta">${item.meta}</span>
    </div>
  `).join('');
}

function runCpItem(index, query) {
  const filtered = cpItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  if (filtered[index]) {
    filtered[index].action();
  }
  closeCp();
}

document.getElementById('cpIn')?.addEventListener('input', (e) => renderCp(e.target.value));

document.getElementById('cpOverlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('cpOverlay')) {
    closeCp();
  }
});

// Shortcut command (Ctrl+K or Cmd+K)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCp();
  }
  if (e.key === 'Escape') {
    closeCp();
  }
});

// --- CONTACT FORM CONTROLS ---
function clearErr(id) {
  const el = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (el) el.classList.remove('error');
  if (err) err.classList.remove('show');
}

function showErr(id, msg) {
  const el = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (el) el.classList.add('error');
  if (err) {
    if (msg) err.textContent = msg;
    err.classList.add('show');
  }
}

function submitContact() {
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const msg = document.getElementById('cmsg').value.trim();
  const btn = document.getElementById('sendBtn');
  
  let valid = true;
  
  if (!name) {
    showErr('cname', 'Please enter your name');
    valid = false;
  }
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showErr('cemail', 'Please enter a valid email address');
    valid = false;
  }
  
  if (!msg) {
    showErr('cmsg', 'Please write a message');
    valid = false;
  }
  
  if (!valid) return;
  
  btn.textContent = "Sending message...";
  btn.disabled = true;
  
  // Send message using Web3Forms
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: "YOUR_WEB3FORMS_KEY_HERE", // <-- Put Web3Forms Key here to receive emails
      name: name,
      email: email,
      message: msg,
      subject: "New Portfolio Message from " + name
    })
  })
  .then(async (response) => {
    const res = await response.json();
    if (response.status === 200) {
      showToast('🚀 Message sent successfully! I will get back to you shortly.', 'success');
      document.getElementById('cname').value = '';
      document.getElementById('cemail').value = '';
      document.getElementById('cmsg').value = '';
    } else {
      showToast('✕ Error: ' + (res.message || 'Could not send message.'), 'error');
    }
  })
  .catch(() => {
    showToast('✕ Network error. Please check your connection.', 'error');
  })
  .finally(() => {
    btn.textContent = '⟶ Send Message';
    btn.disabled = false;
  });
}
