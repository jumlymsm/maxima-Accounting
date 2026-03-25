/* ================================================================
   MAXIMA ACCOUNTANTS — Chatbot
   AI mode  : Smart rule-based bot with accounting knowledge
   WA mode  : Opens WhatsApp with pre-filled message
   ================================================================ */

// ── CONFIG ────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '61434108321';
const WHATSAPP_MSG    = 'Hi Maxima Accountants! I found you on your website and would like to get in touch.';

// ── KNOWLEDGE BASE ────────────────────────────────────────────────
const KB = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy', 'hiya'],
    response: "Hi there! 👋 I'm the Maxima Accountants assistant. I can help you with questions about our services, pricing and how to get started. What can I help you with today?",
    quick: ['Our Services', 'Pricing', 'Book a Call', 'BAS Lodgment']
  },
  {
    patterns: ['service', 'what do you do', 'offer', 'help with', 'specialise', 'specialize'],
    response: "We offer a full suite of accounting and business services:\n\n• **Accounting & Tax** — business & individual tax returns\n• **BAS Lodgments** — on-time, accurate ATO compliance\n• **Xero Setup & Training** — cloud accounting done right\n• **Payroll** — STP Phase 2, super, leave management\n• **CFO Services** — fractional CFO & management reporting\n• **Business Systems** — workflow automation & process mapping\n• **Virtual Assistant** — remote admin support\n\nWhich service would you like to know more about?",
    quick: ['BAS Lodgment', 'Payroll', 'CFO Services', 'Xero Setup', 'Pricing']
  },
  {
    patterns: ['bas', 'business activity statement', 'gst', 'activity statement'],
    response: "Our **BAS Lodgment** service handles everything:\n\n• Monthly or quarterly BAS preparation & lodgment\n• GST reconciliation and PAYG reporting\n• Fuel tax credits\n• ATO correspondence management\n\nWe're registered BAS Agents, so we lodge directly with the ATO on your behalf. Never miss a deadline again! 📋",
    quick: ['How much does BAS cost?', 'Xero Setup', 'Book a Call', 'More Services']
  },
  {
    patterns: ['payroll', 'pay run', 'stp', 'single touch', 'super', 'superannuation', 'employees', 'wages'],
    response: "Our **Payroll Service** covers the full cycle:\n\n• Weekly, fortnightly or monthly pay runs\n• **STP Phase 2** compliant reporting to the ATO\n• Superannuation Guarantee calculations & payments\n• Leave accruals (annual, personal, long service)\n• Employee onboarding & termination pays\n\nWe handle everything so your team gets paid accurately, on time, every time. 💼",
    quick: ['Payroll pricing', 'CFO Services', 'Book a Call', 'More Services']
  },
  {
    patterns: ['cfo', 'chief financial', 'financial officer', 'fractional', 'management report', 'budget', 'forecast', 'kpi'],
    response: "Our **Fractional CFO Service** gives you executive-level financial leadership without the full-time cost:\n\n• Monthly management accounts & KPI dashboards\n• Annual budgets & rolling 12-month forecasts\n• Scenario modelling (best/base/worst case)\n• Board & investor reporting\n• Strategic advisory support\n\nFrom **$999/month** — far less than a full-time CFO. 📊",
    quick: ['CFO pricing', 'Book a CFO call', 'Management Reporting', 'More Services']
  },
  {
    patterns: ['xero', 'setup', 'training', 'cloud accounting', 'migrate', 'migration', 'myob', 'quickbooks'],
    response: "We're **Xero Certified Advisors** — here's what our Xero service includes:\n\n• Full Xero setup & chart of accounts configuration\n• Historical data migration from MYOB, QuickBooks or spreadsheets\n• App integrations (Hubdoc, Stripe, Deputy, Shopify, etc.)\n• One-on-one or group staff training\n• 30 days post-training support\n\nGet up and running on Xero fast — done right the first time. ☁️",
    quick: ['Xero pricing', 'Book a Call', 'Business Systems', 'More Services']
  },
  {
    patterns: ['virtual assistant', 'va', 'admin', 'administrative', 'remote support'],
    response: "Our **Virtual Assistant** service provides dedicated remote admin support:\n\n• Email & calendar management\n• Data entry into Xero or MYOB\n• Client follow-up & communications\n• Document preparation & formatting\n• Online research & scheduling\n\nFlexible hours from just 5 hrs/month — no lock-in contracts. 🖥️",
    quick: ['VA pricing', 'Book a Call', 'Business Systems', 'More Services']
  },
  {
    patterns: ['business system', 'process', 'workflow', 'automation', 'efficiency', 'software', 'integration', 'zapier'],
    response: "Our **Business Systems** service streamlines how your business operates:\n\n• Process mapping & SOP documentation\n• Software stack review & recommendations\n• Workflow automation (Zapier, Make)\n• Xero app integrations\n• Bookkeeping system setup\n\nStop wasting time on manual tasks — let's automate them. ⚙️",
    quick: ['Book a Call', 'Xero Setup', 'More Services']
  },
  {
    patterns: ['tax', 'tax return', 'income tax', 'company tax', 'individual tax', 'ato', 'tax planning'],
    response: "We handle **all types of tax work** for Australian businesses and individuals:\n\n• Company, trust, partnership & sole trader returns\n• Individual tax returns (including rental & investments)\n• **Proactive tax planning** — minimise what you pay legally\n• R&D Tax Incentive claims\n• SMSF & FBT returns\n• ATO audit representation\n\nWe work with you year-round, not just at tax time. 📝",
    quick: ['Tax planning', 'Individual returns', 'Book a Call', 'Pricing']
  },
  {
    patterns: ['smsf', 'self managed', 'super fund', 'retirement'],
    response: "Our **SMSF service** takes care of all your self-managed super fund compliance:\n\n• SMSF setup & trust deed preparation\n• Annual financial statements & member accounts\n• SMSF tax return lodgment\n• Independent audit coordination\n• Contribution & pension strategy advice\n\nWant to take control of your retirement savings? We can help. 🏦",
    quick: ['Book an SMSF consultation', 'Tax Services', 'Pricing']
  },
  {
    patterns: ['fbt', 'fringe benefit', 'fringe benefits tax', 'salary packaging'],
    response: "**Fringe Benefits Tax (FBT)** is one of Australia's most complex tax areas. We handle:\n\n• FBT return preparation & lodgment\n• Motor vehicle & car-parking benefit calculations\n• Salary packaging arrangement review\n• FBT-exempt benefit identification\n• ATO FBT audit support\n\nWe'll make sure you're compliant and not overpaying. 🚗",
    quick: ['Book a Call', 'Tax Services', 'Pricing']
  },
  {
    patterns: ['restructur', 'insolvency', 'debt', 'financial trouble', 'cashflow problem', 'can\'t pay'],
    response: "If your business is under financial pressure, **early action is critical**. We can help:\n\n• Financial position review & solvency assessment\n• Turnaround strategy & cash flow rescue planning\n• Creditor negotiation assistance\n• Referral to ASIC-registered insolvency practitioners\n\nPlease reach out as soon as possible — we're here to help without judgement. 🤝",
    quick: ['Book an urgent call', 'CFO Services', 'Contact us']
  },
  {
    patterns: ['price', 'pricing', 'cost', 'how much', 'fee', 'charge', 'rate', 'package', 'plan'],
    response: "We offer **transparent, fixed-fee packages** — no surprise bills:\n\n💼 **Starter** — $299/mo\nBank reconciliation, quarterly BAS, AP/AR, monthly P&L\n\n📈 **Growth** — $599/mo\nEverything in Starter + payroll (up to 10 staff), monthly BAS, Xero support, VA (5 hrs)\n\n🏢 **Enterprise** — $999/mo\nEverything in Growth + unlimited payroll, CFO services, business systems, VA (20 hrs)\n\nAll prices AUD excl. GST. Annual billing saves 15%!",
    quick: ['Start with Starter', 'Tell me about Growth', 'Book a Call', 'Xero Setup']
  },
  {
    patterns: ['starter', '299', 'small business', 'sole trader', 'startup'],
    response: "The **Starter plan at $299/mo** is perfect for sole traders and startups:\n\n✓ Bank reconciliation\n✓ Quarterly BAS lodgment\n✓ Accounts payable & receivable\n✓ Monthly P&L report\n\nReady to get started? Book a free 30-minute call and we'll set you up. ☎️",
    quick: ['Book a Free Call', 'Growth Plan', 'Enterprise Plan']
  },
  {
    patterns: ['growth', '599', 'growing', 'staff', 'employees'],
    response: "The **Growth plan at $599/mo** is our most popular — perfect for businesses with staff:\n\n✓ Everything in Starter\n✓ Payroll up to 10 employees\n✓ Monthly BAS lodgment\n✓ Xero setup & support\n✓ Virtual assistant (5 hrs/month)\n\nThis is the plan most growing businesses choose. Want to get started?",
    quick: ['Book a Free Call', 'Starter Plan', 'Enterprise Plan']
  },
  {
    patterns: ['enterprise', '999', 'large', 'established', 'cfo plan'],
    response: "The **Enterprise plan at $999/mo** is our full-service option:\n\n✓ Everything in Growth\n✓ Unlimited payroll\n✓ Fractional CFO services\n✓ Business systems consulting\n✓ Virtual assistant (20 hrs/month)\n✓ Dedicated account manager\n\nYou get CFO-level insight and a full admin team — at a fraction of the cost.",
    quick: ['Book a Free Call', 'Starter Plan', 'Growth Plan']
  },
  {
    patterns: ['book', 'consult', 'appointment', 'meeting', 'call', 'speak', 'talk', 'chat with someone', 'human'],
    response: "Absolutely! We'd love to hear about your business. 📞\n\nOur free 30-minute consultations are no obligation, no jargon — just honest advice.\n\nYou can:\n• **Book online** via our contact form below\n• **Call us** on +61 (0) 000 000 000\n• **Email** hello@maximaaccountants.com.au\n• **WhatsApp** our team directly\n\nWhich works best for you?",
    quick: ['Open contact form', 'Switch to WhatsApp', 'More Services']
  },
  {
    patterns: ['contact', 'email', 'phone', 'address', 'office', 'location', 'where are you'],
    response: "Here's how to reach us:\n\n📞 **Phone:** +61 (0) 000 000 000\n✉️ **Email:** hello@maximaaccountants.com.au\n🏢 **Offices:** Sydney (HQ), Melbourne, Brisbane\n\nWe also service clients **nationwide** via video and cloud — no need to come to us!",
    quick: ['Book a Call', 'Switch to WhatsApp', 'Pricing']
  },
  {
    patterns: ['whatsapp', 'wa', 'message'],
    response: "Sure! Tap below and I'll open WhatsApp for you — our team typically responds within a few hours during business hours. 💬",
    quick: ['Open WhatsApp', 'Stay in AI Chat']
  },
  {
    patterns: ['thank', 'thanks', 'cheers', 'appreciate', 'helpful', 'great', 'awesome', 'perfect'],
    response: "You're very welcome! 😊 Is there anything else I can help you with? If you'd like to speak with one of our accountants directly, I'm happy to connect you.",
    quick: ['Book a Free Call', 'Switch to WhatsApp', 'More Services']
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'done', 'that\'s all'],
    response: "Thanks for chatting with Maxima Accountants! Don't hesitate to come back if you have more questions. Have a great day! 👋",
    quick: ['Book a Call', 'Switch to WhatsApp']
  }
];

const FALLBACK_RESPONSES = [
  "Good question! For detailed advice on that topic, I'd recommend speaking with one of our accountants directly — it's free and no obligation. Would you like to book a call or jump on WhatsApp?",
  "I'm not quite sure about that one! Our team can give you a definitive answer — would you like to book a free consultation or chat on WhatsApp?",
  "That's a bit outside my knowledge! Our accountants are the experts here. Want to connect with the team directly?",
  "I want to make sure you get the right answer on that — our accountants would be best placed to help. Book a free call or try WhatsApp?"
];

// ── DOM REFS ──────────────────────────────────────────────────────
const widget        = document.getElementById('chatWidget');
const launcher      = document.getElementById('chatLauncher');
const panel         = document.getElementById('chatPanel');
const closeBtn      = document.getElementById('chatClose');
const badge         = document.getElementById('chatBadge');
const modeSelect    = document.getElementById('chatModeSelect');
const modeAI        = document.getElementById('modeAI');
const modeWA        = document.getElementById('modeWhatsApp');
const chatAI        = document.getElementById('chatAI');
const messagesEl    = document.getElementById('chatMessages');
const quickRepliesEl= document.getElementById('quickReplies');
const inputEl       = document.getElementById('chatInput');
const sendBtn       = document.getElementById('chatSend');
const backAI        = document.getElementById('chatBackAI');

// ── STATE ─────────────────────────────────────────────────────────
let isOpen    = false;
let aiStarted = false;
let typing    = false;

// ── OPEN / CLOSE ──────────────────────────────────────────────────
function openWidget() {
  isOpen = true;
  panel.classList.add('open');
  launcher.classList.add('active');
  badge.style.display = 'none';
}
function closeWidget() {
  isOpen = false;
  panel.classList.remove('open');
  launcher.classList.remove('active');
}

launcher.addEventListener('click', () => isOpen ? closeWidget() : openWidget());
closeBtn.addEventListener('click', closeWidget);

// Show badge after 4 seconds if not opened
setTimeout(() => {
  if (!isOpen) badge.style.display = 'flex';
}, 4000);

// ── MODE SELECT ───────────────────────────────────────────────────
modeAI.addEventListener('click', () => {
  modeSelect.style.display = 'none';
  chatAI.style.display     = 'flex';
  if (!aiStarted) { startAI(); aiStarted = true; }
  inputEl.focus();
});

modeWA.addEventListener('click', openWhatsApp);

function openWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
  window.open(url, '_blank');
}

backAI.addEventListener('click', () => {
  chatAI.style.display     = 'none';
  modeSelect.style.display = 'flex';
});

// ── AI CHAT ───────────────────────────────────────────────────────
function startAI() {
  addBotMessage(
    "Hi! 👋 I'm Max, Maxima Accountants' virtual assistant. I can answer questions about our accounting, tax, payroll, Xero, CFO and bookkeeping services.\n\nWhat can I help you with today?",
    ['Our Services', 'Pricing', 'BAS Lodgment', 'Book a Free Call']
  );
}

function addBotMessage(text, quickReplies = []) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg--bot';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = formatText(text);
  msg.appendChild(bubble);

  const time = document.createElement('span');
  time.className = 'chat-time';
  time.textContent = getTime();
  msg.appendChild(time);

  messagesEl.appendChild(msg);
  scrollToBottom();
  renderQuickReplies(quickReplies);
}

function addUserMessage(text) {
  clearQuickReplies();
  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg--user';
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);
  const time = document.createElement('span');
  time.className = 'chat-time';
  time.textContent = getTime();
  msg.appendChild(time);
  messagesEl.appendChild(msg);
  scrollToBottom();
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-msg chat-msg--bot chat-typing-msg';
  el.innerHTML = '<div class="chat-bubble typing-bubble"><span></span><span></span><span></span></div>';
  messagesEl.appendChild(el);
  scrollToBottom();
  return el;
}

function respond(userText) {
  if (typing) return;
  typing = true;

  const lower = userText.toLowerCase().trim();

  // Special quick replies
  if (lower === 'open whatsapp') { openWhatsApp(); typing = false; return; }
  if (lower === 'open contact form') { closeWidget(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); typing = false; return; }
  if (lower === 'stay in ai chat') {
    addBotMessage("Of course! I'm here. What else can I help you with?", ['Our Services', 'Pricing', 'Book a Call']);
    typing = false; return;
  }

  const typingEl = showTyping();
  const delay = 600 + Math.random() * 700;

  setTimeout(() => {
    typingEl.remove();

    // Match KB
    let matched = null;
    for (const entry of KB) {
      if (entry.patterns.some(p => lower.includes(p))) {
        matched = entry; break;
      }
    }

    if (matched) {
      addBotMessage(matched.response, matched.quick || []);
    } else {
      const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      addBotMessage(fallback, ['Book a Free Call', 'Switch to WhatsApp', 'Our Services', 'Pricing']);
    }
    typing = false;
  }, delay);
}

// ── QUICK REPLIES ─────────────────────────────────────────────────
function renderQuickReplies(replies) {
  quickRepliesEl.innerHTML = '';
  if (!replies || !replies.length) return;
  replies.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply';
    btn.textContent = r;
    btn.addEventListener('click', () => {
      addUserMessage(r);
      respond(r);
    });
    quickRepliesEl.appendChild(btn);
  });
  scrollToBottom();
}

function clearQuickReplies() {
  quickRepliesEl.innerHTML = '';
}

// ── SEND ──────────────────────────────────────────────────────────
function handleSend() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  addUserMessage(text);
  respond(text);
}

sendBtn.addEventListener('click', handleSend);
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

// ── UTILS ─────────────────────────────────────────────────────────
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function getTime() {
  return new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
}

function formatText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}
