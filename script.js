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

// --- HEATMAP GENERATOR ---
(function buildHeatmap() {
  const hm = document.getElementById('heatmap');
  if (!hm) return;
  
  // Generate realistic clustered contributions (sine wave + noise)
  // This simulates active developer sprint cycles and quiet weeks
  for (let i = 0; i < 210; i++) {
    const c = document.createElement('div');
    c.className = 'hc';
    
    // Wave patterns to group green blocks (sprints) and gray blocks (rest days)
    const wave = Math.sin(i * 0.15) * Math.cos(i * 0.05) * 1.5;
    const noise = (Math.random() - 0.5) * 0.8;
    const activity = wave + noise;
    
    if (activity > 0.8) {
      c.classList.add('l4'); // High contributions
    } else if (activity > 0.3) {
      c.classList.add('l3'); // Medium-high contributions
    } else if (activity > -0.1) {
      c.classList.add('l2'); // Medium-low contributions
    } else if (activity > -0.5) {
      c.classList.add('l1'); // Low contributions
    } // Else remains gray
    
    hm.appendChild(c);
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
  amdox: "At Amdox Technologies (April 2026 – Present), Mansi contributes as a Data Science Intern to NeuralRetail, an AI-powered retail platform. She built Prophet/LSTM demand forecasting models (30-day horizons), developed churn prediction pipelines (XGBoost/LightGBM) with explainability, and designed automated Spark & Delta Lake ETL pipelines with FastAPI, Redis, MLflow, and Airflow orchestration.",
  pune: "Yes, Mansi Patil is based in Pune, India, and is open to Machine Learning, Data Science, AI Engineering, and Python Developer roles.",
  tech: "Her skillset covers:<br>• Languages: Python, SQL<br>• ML & Data Science: Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, OpenCV, YOLO, PySpark, PyTorch<br>• Backend & DB: FastAPI, Django, Django Ninja, Node.js, REST APIs, Firebase, SQLite, MySQL, MongoDB, PostgreSQL<br>• Generative AI: LLMs, Chat Models, Embedding Models, RAG Concepts, LangChain, OpenAI GPT, Claude, Gemini, Hugging Face, Groq API (Llama 3.3-70B)<br>• DevOps & Tools: Docker, Git, GitHub, Postman, Jupyter Notebook, MLflow",
  jobs: "Yes! Mansi is a Computer Science graduate (B.Tech CSE, CGPA 8.74/10) with hands-on AI/ML engineering experience. She is actively seeking full-time roles in Python Development, Machine Learning, Data Science, or AI Engineering. Reach out via email or LinkedIn!",
  newsly: "Newsly is an AI-Powered Daily News Digest Agent built using Python, FastAPI, Docker, Groq API (Llama 3.3-70B), Google News RSS, Gmail SMTP, and GitHub Actions. It automatically aggregates and summarizes daily news across 5 categories (Technology & AI, Finance & Markets, Politics, Sports, Fashion) and sends automated digests, deployed on Render.",
  loan: "The Loan Approval Prediction System uses Scikit-learn ML models to predict loan eligibility from financial data, storing records in SQLite. Features a FastAPI backend, Streamlit dashboard, and an integrated OpenAI API Chatbot to explain loan approval reasoning.",
  road: "The AI-Based Road Safety Detection System uses YOLO for real-time traffic violation identification, processing video feeds with OpenCV and executing telemetry analytics using Pandas and Matplotlib.",
  ecommerce: "The E-Commerce Website (Style-Up) is a full-stack shopping application built using Node.js, MongoDB, Express, and JavaScript featuring product catalog queries, cart management, and secure checkout workflows.",
  certifications: "Mansi holds 5 professional certifications:<br>1. Deloitte Data Analyst Certificate (2025)<br>2. CSRBOX: Agentic AI – AI Agent Architect (2025)<br>3. Business Intelligence with Advanced Excel & Power BI (2024)<br>4. Oracle Academy Database Management System (2024)<br>5. STTP Master Industry-Grade Python Skills (2024)",
  resume: "You can view and download Mansi's PDF resume directly using the 'Download PDF' button in the Resume section of the site!",
  email: "You can contact Mansi directly via email at mansipatil71899@gmail.com, or phone at +91 8767827166. GitHub: https://github.com/patil-08"
};

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
  let reply = "I am Mansi's AI Assistant. Ask me about her Amdox internship, projects (Newsly, Loan approval chatbot, Road safety, E-Commerce), certifications, tech skills, or job availability!";
  
  if (lowerQ.includes('amdox') || lowerQ.includes('internship') || lowerQ.includes('work') || lowerQ.includes('neuralretail')) {
    reply = chatResponses.amdox;
  } else if (lowerQ.includes('tech') || lowerQ.includes('stack') || lowerQ.includes('skills') || lowerQ.includes('tools')) {
    reply = chatResponses.tech;
  } else if (lowerQ.includes('certif') || lowerQ.includes('course') || lowerQ.includes('deloitte') || lowerQ.includes('csrbox')) {
    reply = chatResponses.certifications;
  } else if (lowerQ.includes('newsly') || lowerQ.includes('news') || lowerQ.includes('groq') || lowerQ.includes('digest')) {
    reply = chatResponses.newsly;
  } else if (lowerQ.includes('loan') || lowerQ.includes('approve') || lowerQ.includes('credit')) {
    reply = chatResponses.loan;
  } else if (lowerQ.includes('road') || lowerQ.includes('safety') || lowerQ.includes('yolo') || lowerQ.includes('cv')) {
    reply = chatResponses.road;
  } else if (lowerQ.includes('ecommerce') || lowerQ.includes('e-commerce') || lowerQ.includes('style-up') || lowerQ.includes('cart') || lowerQ.includes('shop')) {
    reply = chatResponses.ecommerce;
  } else if (lowerQ.includes('job') || lowerQ.includes('opportunity') || lowerQ.includes('hire') || lowerQ.includes('open to') || lowerQ.includes('role')) {
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
  { label: 'Case Study: Newsly AI News Agent', icon: '📰', meta: 'study', action: () => openModal('newsly') },
  { label: 'Case Study: Loan AI underwriter', icon: '📊', meta: 'study', action: () => openModal('loan') },
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
