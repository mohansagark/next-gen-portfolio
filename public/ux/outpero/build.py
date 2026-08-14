#!/usr/bin/env python3
"""Generate the Outpero Figma-like UX canvas. Run from repo root."""
from pathlib import Path

OUT = Path("/workspace/public/ux/outpero/index.html")

def logo():
    return """<div class="logo"><span class="logo-mark"><span></span></span>OUTPERO</div>"""

def nav(active, theme="agency", mobile=False):
    links = [
        ("home", "Home"),
        ("employee", "Hire AI Employee"),
        ("voice", "AI Voice Agents"),
        ("solutions", "Solutions"),
        ("about", "About"),
        ("contact", "Contact"),
    ]
    items = []
    for key, label in links:
        extra = ' <span class="badge-new">NEW</span>' if key == "employee" else ""
        cls = "active" if key == active else ""
        items.append(f'<a class="{cls} hotspot" data-go="{key}">{label}{extra}</a>')
    cta = f'<a class="btn btn-primary hotspot" data-go="contact">Book Free Audit</a>'
    if theme == "product":
        cta = f'<a class="btn btn-gold hotspot" data-go="employee">Hire now</a>'
    if mobile:
        return f"""<header class="nav">{logo()}<div style="display:flex;gap:8px;align-items:center"><button class="icon-round">☀</button><div class="hamburger hotspot" data-go="menu"><i></i><i></i><i></i></div></div></header>"""
    return f"""<header class="nav">{logo()}<nav class="nav-links">{''.join(items)}</nav>{cta}</header>"""

def footer(mobile=False):
    cols = """
    <div>{logo}<p class="lede" style="font-size:13px;margin-top:10px">AI automations, voice agents, and web systems — engineered around your outcomes, not our deliverables.</p><p style="font-size:12px;opacity:.6">A product by OpenDG</p></div>
    <div><b>Navigation</b><a class="hotspot" data-go="home">Home</a><a class="hotspot" data-go="employee">Hire AI Employee</a><a class="hotspot" data-go="voice">AI Voice Agents</a><a class="hotspot" data-go="solutions">Solutions</a><a class="hotspot" data-go="about">About</a></div>
    <div><b>Resources</b><a class="hotspot" data-go="blog">Blog</a><a class="hotspot" data-go="compare">Compare</a><a class="hotspot" data-go="pricing">Pricing</a></div>
    <div><b>Get Started</b><p class="lede" style="font-size:13px">Start with a free 30-minute business audit.</p><a class="btn btn-primary hotspot" data-go="contact" style="margin-top:12px">Book Free Audit</a></div>
    """.replace("{logo}", logo())
    legal = '<div class="legal">© 2026 OUTPERO · Privacy · Terms · Refund Policy</div>'
    return f'<footer class="footer">{cols}</footer>{legal}'

def diagram(product=False):
    nodes = [
        ("50%", "50%", "core", "YOUR<br>BUSINESS"),
        ("22%", "28%", "", "Leads"),
        ("78%", "24%", "", "Follow-up"),
        ("18%", "68%", "", "Bookings"),
        ("82%", "62%", "", "24/7 Calls"),
        ("50%", "86%", "", "WhatsApp"),
        ("72%", "80%", "leak", "Leaking Revenue"),
    ]
    html = ['<div class="diagram">']
    html.append('<svg width="100%" height="100%" style="position:absolute;inset:0"><g stroke="#7a50dc55" stroke-width="1.5" fill="none" stroke-dasharray="4 6">')
    for x,y,kind,label in nodes[1:]:
        html.append(f'<line x1="50%" y1="50%" x2="{x}" y2="{y}"/>')
    html.append('</g></svg>')
    for x,y,kind,label in nodes:
        html.append(f'<div class="node {kind}" style="left:{x};top:{y}">{label}</div>')
    html.append("</div>")
    return "".join(html)

def home(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-agency {m}">
      {nav("home", mobile=mobile)}
      <section class="hero">
        <div class="split">
          <div>
            <div class="kicker">Systems that outperform</div>
            <h1 class="display">Your business is <span class="grad">leaking</span> revenue. We seal it.</h1>
            <p class="lede">AI automations, voice agents, and web solutions — engineered around your outcomes, not our deliverables.</p>
            <div class="cta-row">
              <a class="btn btn-primary hotspot" data-go="contact">Book a Free Audit</a>
              <a class="btn btn-ghost hotspot" data-go="systems">See Our Systems</a>
            </div>
          </div>
          {diagram()}
        </div>
      </section>
      <div class="marquee"><span>Real Estate</span><span>Clinics & Healthcare</span><span>Coaches & Consultants</span><span>D2C Brands</span><span>Legal Firms</span><span>E-commerce</span><span>SaaS Startups</span></div>
      <section class="section">
        <h2 class="display">You're doing everything right. But still losing.</h2>
        <div class="grid-3" style="margin-top:28px">
          <div class="card"><div class="num">01</div><h3>Leads Going Cold</h3><p>78% of customers buy from whoever responds first. By the time you call back, the deal is gone.</p></div>
          <div class="card"><div class="num">02</div><h3>Too Much Manual Work</h3><p>Teams burn 20–40 hours a week on data entry, scheduling, and reports instead of revenue.</p></div>
          <div class="card"><div class="num">03</div><h3>Websites That Don't Convert</h3><p>Traffic lands, looks around, and leaves. No system to capture and qualify visitors.</p></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">Revenue systems</div>
        <h2 class="display">Three systems. Each solves one expensive problem.</h2>
        <div class="grid-3" style="margin-top:28px">
          <div class="card hotspot" data-go="systems"><div class="num">System 1</div><h3>Revenue Capture</h3><p>Contact, qualify, and book leads in seconds.</p><ul class="checks"><li>AI Voice Agent (24/7)</li><li>WhatsApp & SMS Bot</li><li>Instant CRM Sync</li></ul><div class="price">From ₹60,000</div></div>
          <div class="card hotspot" data-go="systems" style="box-shadow:0 0 0 1px #e2b85a, var(--shadow-card)"><span class="flagship">FLAGSHIP</span><div class="num">System 2</div><h3>Ops Efficiency</h3><p>Eliminate 20–40 hours of manual tasks weekly.</p><ul class="checks"><li>Workflow Process Mapping</li><li>3–5 Core Automations</li><li>Custom n8n/Make Logic</li></ul><div class="price">From ₹1,00,000</div></div>
          <div class="card hotspot" data-go="systems"><div class="num">System 3</div><h3>Web Capture</h3><p>Turn passive visitors into qualified leads.</p><ul class="checks"><li>High-Converting Landing Pages</li><li>Frictionless Lead Capture</li><li>Automated WhatsApp Triggers</li></ul><div class="price">From ₹50,000</div></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">Our process</div>
        <h2 class="display">From first call to live system. In 2 weeks.</h2>
        <div class="steps" style="margin-top:28px">
          <div class="card"><div class="step-index">01</div><h3>We understand</h3><p>30-minute call. Find where money is leaking.</p></div>
          <div class="card"><div class="step-index">02</div><h3>Scope & price</h3><p>Exact deliverables, timeline, and cost in writing.</p></div>
          <div class="card"><div class="step-index">03</div><h3>We build it</h3><p>Full build and setup. You stay on the business.</p></div>
          <div class="card"><div class="step-index">04</div><h3>Goes live</h3><p>Hours saved and revenue retained within 30 days.</p></div>
        </div>
        <div class="grid-4" style="margin-top:28px">
          <div class="stat"><b>0 sec</b><span>Lead response</span></div>
          <div class="stat"><b>0 hrs</b><span>Manual work gone</span></div>
          <div class="stat"><b>0x</b><span>Conversion lift</span></div>
          <div class="stat"><b>Zero</b><span>Tech headache</span></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">Individual solutions</div>
        <h2 class="display">Not ready for a full system? Start with one.</h2>
        <p class="lede">19 pre-built solutions. Starting from ₹14,999.</p>
        <div class="grid-2" style="margin-top:20px">
          <div class="card hotspot" data-go="solutions"><div class="cat">AI & Automation</div><h3>Instant Lead Follow-Up</h3><p>WhatsApp + email the second a form is submitted.</p></div>
          <div class="card hotspot" data-go="voice"><div class="cat">AI Voice</div><h3>Inbound AI Receptionist</h3><p>Answers every call, routes, and books 24/7.</p></div>
          <div class="card hotspot" data-go="solutions"><div class="cat">Web</div><h3>High-Converting Landing Pages</h3><p>Single-page funnels built to capture and book.</p></div>
          <div class="card hotspot" data-go="solutions"><div class="cat">AI & Automation</div><h3>Appointment Booking Bot</h3><p>Prospects book themselves. Zero calendar ping-pong.</p></div>
        </div>
        <div class="cta-row"><a class="btn btn-ghost hotspot" data-go="solutions">Explore all 19 solutions</a></div>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">Why work with us?</h2>
        <div class="grid-2" style="margin-top:20px">
          <div class="card"><h3>Business first, tech second</h3><p>If it will not save time or make money, we will not recommend it.</p></div>
          <div class="card"><h3>Clear, measurable ROI</h3><p>Every system is measured by hours saved and revenue generated.</p></div>
          <div class="card"><h3>Fast deployment</h3><p>Biggest bottleneck first. Live in weeks, not months.</p></div>
          <div class="card"><h3>Zero technical headaches</h3><p>We build, integrate, and maintain. You get a working system.</p></div>
        </div>
      </section>
      <section class="section faq" style="padding-top:0">
        <h2 class="display">Clear answers. No jargon.</h2>
        <details open><summary>What exactly do you build?</summary><p>Voice agents, WhatsApp/CRM automations, and conversion websites — scoped to one revenue leak at a time.</p></details>
        <details><summary>Will I need to replace my existing software?</summary><p>No. We wire into the tools you already use.</p></details>
        <details><summary>How long does implementation take?</summary><p>Most systems go live in two weeks after scope is signed.</p></details>
        <details><summary>How do you charge?</summary><p>Fixed-scope agency builds from ₹14,999, or hire an AI employee at ₹1,899 / 30 days plus usage.</p></details>
      </section>
      <div class="cta-band">
        <h2>Your revenue leak has a fix. Let's find it.</h2>
        <p>Book a free 30-minute strategy call. No obligation. No pitch. Just clarity.</p>
        <div class="cta-row">
          <a class="btn btn-gold hotspot" data-go="contact">Book Free Audit →</a>
          <a class="btn btn-ghost hotspot" data-go="solutions" style="color:#fff;box-shadow:inset 0 0 0 1px #fff6">Explore the Solutions →</a>
        </div>
      </div>
      {footer(mobile)}
    </article>
    """

def solutions(mobile=False):
    items = [
        ("AI & Automation", "WhatsApp Business Automation", "End-to-end automated WhatsApp interactions."),
        ("AI & Automation", "AI Lead Qualification", "Automatic scoring and filtering for every lead."),
        ("AI & Automation", "Appointment Booking Automation", "Zero-touch scheduling and reminders."),
        ("AI Voice", "Inbound AI Voice Agent", "24/7 intelligent answering and lead routing."),
        ("AI Voice", "Outbound AI Voice Agent", "Scalable proactive calling and engagement."),
        ("Web", "Landing Page", "High-velocity standalone pages for campaigns."),
        ("Web", "Website + Lead Pipeline", "Site fully wired into automated CRM follow-ups."),
        ("Audit & Strategy", "Business Automation Audit", "Map operational leaks and ROI fixes."),
    ]
    cards = "".join(
        f'<div class="sol-item"><div><div class="cat">{c}</div><h3 style="margin:4px 0 4px;font-size:16px">{t}</h3><p style="margin:0;color:var(--op-muted-2);font-size:13px">{d}</p></div><span>⌄</span></div>'
        for c,t,d in items
    )
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-agency {m}">
      {nav("solutions", mobile=mobile)}
      <section class="hero" style="text-align:center">
        <div class="kicker">Solutions</div>
        <h1 class="display" style="max-width:900px;margin-left:auto;margin-right:auto">Drop-in solutions for immediate ROI.</h1>
        <p class="lede" style="margin-left:auto;margin-right:auto">19 standalone solutions. Each one targets one specific problem. Starting from ₹14,999.</p>
        <div class="cta-row" style="justify-content:center"><a class="btn btn-primary hotspot" data-go="contact">Book Free Audit</a></div>
        <div class="chips" style="justify-content:center">
          <span class="chip-filter active">All</span>
          <span class="chip-filter">AI & Automation</span>
          <span class="chip-filter">AI Voice</span>
          <span class="chip-filter">Web</span>
          <span class="chip-filter">Audit & Strategy</span>
        </div>
      </section>
      <section class="section" style="padding-top:0">{cards}
        <p class="lede" style="margin-top:18px;font-size:13px">All fees cover build and management. Platforms billed separately at cost.</p>
      </section>
      <div class="cta-band">
        <h2>Need a complete transformation?</h2>
        <p>Stop stitching tools together. Explore the three revenue systems.</p>
        <a class="btn btn-gold hotspot" data-go="systems">Explore Revenue Systems</a>
      </div>
      {footer(mobile)}
    </article>
    """

def contact(mobile=False):
    m = "mobile" if mobile else "desktop"
    form = """
      <form class="form card">
        <div><label>Name *</label><input placeholder="Your full name"></div>
        <div><label>Business Name *</label><input placeholder="Your company name"></div>
        <div><label>Email *</label><input type="email" placeholder="you@company.com"></div>
        <div><label>Phone (WhatsApp preferred) *</label><input type="tel" placeholder="+91 98765 43210"></div>
        <div><label>Business Type *</label><select><option>Real Estate</option><option>Clinic</option><option>Coaching</option><option>D2C</option><option>Other</option></select></div>
        <div><label>Business Size *</label><select><option>Solo (1 person)</option><option>2-10 employees</option><option>11-50 employees</option></select></div>
        <div><label>Biggest Challenge *</label><textarea placeholder="What is the biggest operational or growth challenge right now?"></textarea></div>
        <button class="btn btn-primary btn-block" type="button">Book My Free Audit</button>
      </form>
    """
    return f"""
    <article class="ui theme-agency {m}">
      {nav("contact", mobile=mobile)}
      <section class="hero">
        <div class="split">
          <div>
            <div class="kicker">Contact</div>
            <h1 class="display">Book your free business audit.</h1>
            <p class="lede">30 minutes. We'll show you exactly where you're losing money and what to build first.</p>
            <div class="card" style="margin-top:24px">
              <b>What to expect</b>
              <ul class="checks">
                <li>Review current workflows or website</li>
                <li>Identify 2–3 immediate quick wins</li>
                <li>Map the highest-ROI system</li>
                <li>Give a written estimate</li>
              </ul>
              <p style="margin-top:16px;font-size:13px">We respond within 24 hours · hello@outpero.com</p>
            </div>
            <a class="btn btn-ghost hotspot" data-go="voice" style="margin-top:16px">Looking for a voice agent? Explore →</a>
          </div>
          {form}
        </div>
      </section>
      {footer(mobile)}
    </article>
    """

def about(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-agency {m}">
      {nav("about", mobile=mobile)}
      <section class="hero">
        <h1 class="display">We understand business first.<br>Technology second.</h1>
        <p class="lede">Most agencies sell tools, not outcomes. OUTPERO starts with the leak, then engineers the system that seals it.</p>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">Philosophy</div>
        <div class="grid-3" style="margin-top:20px">
          <div class="card"><h3>Outcome-first</h3><p>Measured by the result it creates for your business.</p></div>
          <div class="card"><h3>Business audit always</h3><p>We map workflows before writing a line of code.</p></div>
          <div class="card"><h3>ROI tracked</h3><p>Time saved. Revenue captured. Costs cut.</p></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">What we build</div>
        <div class="grid-3" style="margin-top:20px">
          <div class="card hotspot" data-go="systems"><h3>Revenue Capture</h3><p>Instant lead response, qualification, and booking — 24/7.</p></div>
          <div class="card hotspot" data-go="systems"><h3>Ops Efficiency</h3><p>Eliminate 20–40 hours of manual work every week.</p></div>
          <div class="card hotspot" data-go="systems"><h3>Digital Salesman</h3><p>Websites that convert, wired to automated pipelines.</p></div>
        </div>
      </section>
      <div class="cta-band"><h2>Have a specific problem?</h2><p>Reach the founder at vatsal@outpero.com or book an audit.</p><a class="btn btn-gold hotspot" data-go="contact">Book Free Audit</a></div>
      {footer(mobile)}
    </article>
    """

def systems(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-agency {m}">
      {nav("solutions", mobile=mobile)}
      <section class="hero" style="text-align:center">
        <div class="kicker">Revenue systems</div>
        <h1 class="display">The Big Three</h1>
        <p class="lede" style="margin:0 auto">End-to-end systems for lead capture, operations, and web. Fixed scope. Fixed price.</p>
      </section>
      <section class="section" style="padding-top:0">
        <div class="grid-3">
          <div class="card"><div class="num">System 1</div><h3>Revenue Capture</h3><p>From ₹60,000</p><ul class="checks"><li>AI Voice Agent</li><li>WhatsApp & SMS</li><li>CRM sync</li><li>Missed-call textback</li></ul><a class="btn btn-primary hotspot" data-go="contact" style="margin-top:16px">Get this system</a></div>
          <div class="card" style="box-shadow:0 0 0 1px #e2b85a, var(--shadow-card)"><span class="flagship">FLAGSHIP</span><div class="num">System 2</div><h3>Ops Efficiency</h3><p>From ₹1,00,000</p><ul class="checks"><li>Process mapping</li><li>3–5 automations</li><li>n8n / Make logic</li><li>Handover docs</li></ul><a class="btn btn-primary hotspot" data-go="contact" style="margin-top:16px">Get this system</a></div>
          <div class="card"><div class="num">System 3</div><h3>Web Capture</h3><p>From ₹50,000</p><ul class="checks"><li>Landing pages</li><li>Lead capture</li><li>WhatsApp triggers</li><li>Analytics</li></ul><a class="btn btn-primary hotspot" data-go="contact" style="margin-top:16px">Get this system</a></div>
        </div>
      </section>
      {footer(mobile)}
    </article>
    """

def employee(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-product {m}">
      {nav("employee", theme="product", mobile=mobile)}
      <section class="hero">
        <div class="split">
          <div>
            <div class="kicker">Andhra & Telangana</div>
            <h1 class="display">Hire the fastest <span class="telugu" style="color:var(--op-gold)">తెలుగు</span> employee.</h1>
            <p class="lede">Skip the ₹30k agency setup fee. Hire it yourself in 5 minutes. Native Telugu, English mid-call, dedicated +91 number.</p>
            <div class="cta-row">
              <a class="btn btn-gold hotspot" data-go="pricing">See pricing ₹1,899/mo</a>
              <a class="btn btn-ghost hotspot" data-go="voice">Hear a sample call</a>
            </div>
          </div>
          <div class="diagram">
            <div class="node core" style="left:50%;top:50%">AI<br>Employee</div>
            <div class="node" style="left:22%;top:28%">+91 number</div>
            <div class="node" style="left:80%;top:30%">CRM sync</div>
            <div class="node" style="left:24%;top:74%">WhatsApp</div>
            <div class="node" style="left:78%;top:72%">Calendar</div>
          </div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">One employee, two ways to work.</h2>
        <div class="grid-2" style="margin-top:24px">
          <div class="card"><div class="num">01</div><h3>Instant lead calling</h3><p>New Facebook / website lead? The agent calls in seconds, qualifies, and books.</p></div>
          <div class="card"><div class="num">02</div><h3>Bulk campaigns</h3><p>Launch to thousands at once. Reminders, follow-ups, promo blasts — 24/7.</p></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">Who is this best for?</h2>
        <div class="grid-3" style="margin-top:20px">
          <div class="card"><h3>Real Estate & Builders</h3><p>Call site-visit leads before they bounce to the next listing.</p></div>
          <div class="card"><h3>Coaching & Admissions</h3><p>Counsel every enquiry the same hour it comes in.</p></div>
          <div class="card"><h3>Hospitals & Diagnostics</h3><p>Book appointments and never miss a ringing reception line.</p></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="kicker">Compliance</div>
        <div class="grid-3" style="margin-top:16px">
          <div class="card"><h3>DLT numbers</h3><p>Dedicated +91 line, TRAI-aware outbound.</p></div>
          <div class="card"><h3>DNC screening</h3><p>Indian calling compliance built into the job, not bolted on.</p></div>
          <div class="card"><h3>Recordings</h3><p>Every call transcribed and stored in Voice Hub.</p></div>
        </div>
      </section>
      <div class="cta-band" style="background:linear-gradient(135deg,#14110a,#3a2a10 50%,#e2b85a)">
        <h2>Ready in 5 minutes.</h2>
        <p>No developer. No contract. Pause anytime.</p>
        <a class="btn btn-gold hotspot" data-go="pricing">Hire an AI employee</a>
      </div>
      {footer(mobile)}
    </article>
    """

def pricing(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-product {m}">
      {nav("employee", theme="product", mobile=mobile)}
      <section class="hero" style="text-align:center">
        <div class="kicker">Pricing</div>
        <h1 class="display">One price, published.</h1>
        <p class="lede" style="margin:0 auto">₹1,899 to hire an AI employee for 30 days, plus calls from ₹3 a minute. No setup fee. No sales call to hear the number.</p>
      </section>
      <section class="section" style="padding-top:0">
        <div class="grid-2">
          <div class="card" style="text-align:left">
            <div class="kicker">Hiring fee</div>
            <h2 class="display">₹1,899 <span style="font-size:18px;opacity:.7">/ 30 days</span></h2>
            <ul class="checks">
              <li>1 dedicated AI employee</li>
              <li>Dedicated +91 DLT number</li>
              <li>500 credits on every hire</li>
              <li>+300 bonus on first hire</li>
              <li>Dashboard, webhooks, CRM</li>
              <li>99.9% uptime SLA</li>
            </ul>
            <a class="btn btn-gold btn-block hotspot" data-go="employee" style="margin-top:18px">Hire now</a>
          </div>
          <div>
            <h3 style="margin-top:0">Voice tiers — pick per employee</h3>
            <div class="card" style="margin-bottom:10px"><b>Value ₹3/min</b><p>Budget-friendly, covers most day-to-day calling.</p></div>
            <div class="card" style="margin-bottom:10px"><b>Standard ₹5/min</b><p>A step up in naturalness for everyday quality.</p></div>
            <div class="card"><b>Premium ₹7/min</b><p>Most lifelike — for the first voice a prospect hears.</p></div>
          </div>
        </div>
        <h2 class="display" style="margin-top:48px">Compared with a telecaller</h2>
        <table class="table">
          <tr><th></th><th>Outpero</th><th>Human telecaller</th></tr>
          <tr><td>Hiring cost</td><td>₹1,899 / 30 days</td><td>₹18,000</td></tr>
          <tr><td>Hours</td><td>24/7</td><td>One shift</td></tr>
          <tr><td>Concurrency</td><td>Up to 20</td><td>One</td></tr>
          <tr><td>Training</td><td>Same day</td><td>2–6 weeks</td></tr>
        </table>
      </section>
      {footer(mobile)}
    </article>
    """

def voice(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-product {m}">
      {nav("voice", theme="product", mobile=mobile)}
      <section class="hero">
        <div class="kicker">Telugu-first voice AI</div>
        <h1 class="display">AI voice agents for Indian businesses.</h1>
        <p class="lede">Instant lead response. Native Telugu, Hindi, and English. Inbound, outbound, and bulk — one employee.</p>
        <div class="cta-row">
          <a class="btn btn-gold hotspot" data-go="employee">Deploy AI Voice Agent</a>
          <a class="btn btn-ghost">How it works</a>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">Hear the AI in action</h2>
        <div class="grid-3" style="margin-top:20px">
          <div class="card voice-card"><div class="avatar"></div><div><div class="cat">Native Telugu</div><b class="telugu">శాంతి</b><p>Warm & conversational</p></div><div class="play">▶</div></div>
          <div class="card voice-card"><div class="avatar"></div><div><div class="cat">Native Telugu</div><b class="telugu">Bhaskar</b><p>Energetic & upbeat</p></div><div class="play">▶</div></div>
          <div class="card voice-card"><div class="avatar"></div><div><div class="cat">Native Telugu</div><b class="telugu">Sahana</b><p>Deep & professional</p></div><div class="play">▶</div></div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">How it actually works</h2>
        <div class="steps" style="margin-top:20px">
          <div class="card"><div class="step-index">1</div><h3>Lead captured</h3><p>Facebook ad or website form fires.</p></div>
          <div class="card"><div class="step-index">2</div><h3>3-second call</h3><p>Agent calls before they close the tab.</p></div>
          <div class="card"><div class="step-index">3</div><h3>Qualifies</h3><p>Handles objections, books the visit.</p></div>
          <div class="card"><div class="step-index">4</div><h3>Voice Hub</h3><p>Recording, transcript, intent score.</p></div>
        </div>
      </section>
      {footer(mobile)}
    </article>
    """

def compare(mobile=False):
    m = "mobile" if mobile else "desktop"
    return f"""
    <article class="ui theme-agency {m}">
      {nav("home", mobile=mobile)}
      <section class="hero">
        <div class="kicker">Compare</div>
        <h1 class="display">Sourced, line-by-line comparisons.</h1>
        <p class="lede">Including a plain statement of where the competitor is genuinely ahead. If a comparison never admits a weakness, it is marketing.</p>
      </section>
      <section class="section" style="padding-top:0">
        <h2 class="display">Regional Telugu & India voice AI</h2>
        <div class="grid-2" style="margin-top:16px">
          <div class="card hotspot" data-go="pricing"><h3>Outpero vs Edesy</h3><p>One flat price. No ₹14,999/month tier to unlock an uptime SLA.</p></div>
          <div class="card"><h3>Outpero vs Zudu AI</h3><p>We publish the number. Their page only offers a demo.</p></div>
          <div class="card"><h3>Outpero vs Bolna / Vapi</h3><p>Those are developer platforms. This is a finished employee.</p></div>
          <div class="card"><h3>Outpero vs human telecaller</h3><p>Speed, cost, and concurrency — with a human still on novel cases.</p></div>
        </div>
      </section>
      {footer(mobile)}
    </article>
    """

def blog(mobile=False):
    m = "mobile" if mobile else "desktop"
    posts = [
        "Cheapest AI Voice Agent in India (2026): ₹3/Min",
        "Are AI Calling Agents Legal in India? TRAI, DLT & DNC",
        "Best AI Receptionist for Clinics in AP & Telangana",
        "Telugu AI Voice Agent vs Human Telecaller",
    ]
    cards = "".join(f'<div class="card"><div class="cat">Guide</div><h3>{p}</h3><p>Practical, India-specific. No jargon.</p></div>' for p in posts)
    return f"""
    <article class="ui theme-agency {m}">
      {nav("home", mobile=mobile)}
      <section class="hero">
        <div class="kicker">Resources</div>
        <h1 class="display">Blog</h1>
        <p class="lede">Voice AI, Telugu calling, pricing, and compliance — written for operators, not developers.</p>
      </section>
      <section class="section" style="padding-top:0"><div class="grid-2">{cards}</div></section>
      {footer(mobile)}
    </article>
    """

def menu():
    return f"""
    <article class="ui theme-agency mobile" style="position:relative;min-height:844px">
      {nav("home", mobile=True)}
      <div class="menu-sheet">
        <div class="menu-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b>Menu</b><span class="hotspot" data-go="home">✕</span></div>
          <a class="hotspot" data-go="home">Home</a>
          <a class="hotspot" data-go="employee">Hire AI Employee <span class="badge-new">NEW</span></a>
          <a class="hotspot" data-go="voice">AI Voice Agents</a>
          <a class="hotspot" data-go="solutions">Solutions</a>
          <a class="hotspot" data-go="about">About</a>
          <a class="hotspot" data-go="contact">Contact</a>
          <a class="hotspot" data-go="pricing">Pricing</a>
          <a class="btn btn-primary btn-block hotspot" data-go="contact" style="margin-top:20px">Book Free Audit</a>
        </div>
      </div>
    </article>
    """

def design_system():
    colors = [
        ("#FAF8F5", "#111", "Cream / Agency bg"),
        ("#050505", "#fff", "Deep / Product bg"),
        ("#7A50DC", "#fff", "Purple / Primary"),
        ("#673FC4", "#fff", "Purple deep"),
        ("#E2B85A", "#1a1304", "Gold / Accent"),
        ("#818CF8", "#111", "Indigo glow"),
        ("#0A0A0A", "#fff", "Ink"),
        ("#737373", "#fff", "Muted"),
    ]
    sw = "".join(f'<div class="ds-color" style="background:{c};color:{t}">{n}<br>{c}</div>' for c,t,n in colors)
    return f"""
    <article class="ds-wrap">
      <div class="kicker">Foundation</div>
      <h1 class="display" style="font-size:48px">OUTPERO design system</h1>
      <p class="lede">Two themes, one brand. Agency light for trust and audits. Product dark for hiring the AI employee.</p>
      <h2 style="margin-top:36px">Color</h2>
      <div class="ds-grid">{sw}</div>
      <h2 style="margin-top:36px">Type</h2>
      <div class="ds-type" style="font-family:Poppins,sans-serif;font-size:40px;font-weight:700">Poppins / Display</div>
      <div class="ds-type" style="font-size:18px">Inter / Body — 16px / 1.5 — minimum 16px on mobile inputs</div>
      <div class="ds-type telugu" style="font-size:28px">Noto Sans Telugu / Native voice UI</div>
      <h2 style="margin-top:36px">Components</h2>
      <div class="cta-row">
        <a class="btn btn-primary">Primary CTA</a>
        <a class="btn btn-gold">Product CTA</a>
        <a class="btn btn-ghost">Secondary</a>
      </div>
      <div class="grid-3" style="margin-top:20px">
        <div class="card"><div class="cat">Card</div><h3>Glass surface</h3><p>20px radius, 1px border, blur.</p></div>
        <div class="card"><span class="flagship">FLAGSHIP</span><h3>Highlight</h3><p>Gold ring for recommended plan.</p></div>
        <div class="card"><label style="font-size:12px;font-weight:600">Input</label><input style="width:100%;margin-top:8px;padding:12px;border-radius:12px;border:1px solid #0002" placeholder="16px text, 44px tall"></div>
      </div>
      <h2 style="margin-top:36px">Breakpoints</h2>
      <p>390 mobile · 768 tablet · 1024 laptop · 1440 desktop · 1920 wall</p>
      <p>Touch targets ≥ 44px. Nav collapses under 768. Grids 3→1. Process 4→stack. Footer 4→1.</p>
    </article>
    """

def cover():
    thumbs = "".join(
        f'<div class="thumb {t}"><b>{n}</b><span>{d}</span></div>'
        for n, d, t in [
            ("Home", "Agency · 1440 / 390", "light"),
            ("Solutions", "19 SKUs · filters", "light"),
            ("Contact", "Audit form", "light"),
            ("AI Employee", "Product dark", "dark"),
            ("Pricing", "₹1899 + usage", "dark"),
            ("Voice", "Telugu samples", "dark"),
        ]
    )
    return f"""
    <article class="cover">
      <div>
        <div class="kicker">UX file · Desktop + Mobile</div>
        <h1>OUTPERO<br>experience design</h1>
        <p>High-fidelity artboards reverse-engineered from outpero.com. Agency light for conversion. Product dark for the AI employee. Switch to Prototype and click CTAs to walk the paths.</p>
        <div class="thumbs">{thumbs}</div>
      </div>
      <div class="cover-meta">
        <div><b>Artboards</b>13 pages · 23 frames</div>
        <div><b>Breakpoints</b>1440 desktop · 390 mobile</div>
        <div><b>Themes</b>Agency cream · Product cinematic</div>
        <div><b>Primary CTA</b>Book Free Audit → Contact</div>
      </div>
    </article>
    """

def flows():
    nodes = [
        (80, 80, "start", "Visitor lands", "Home · 1440 / 390"),
        (380, 60, "cta", "Book audit", "Contact form"),
        (380, 220, "cta", "See systems", "Revenue systems"),
        (380, 380, "cta", "Hire employee", "AI Employee dark"),
        (700, 60, "", "Audit booked", "Email + WhatsApp"),
        (700, 220, "cta", "Pick a system", "₹50k–1L scope"),
        (700, 380, "cta", "Pricing", "₹1899 + ₹3/min"),
        (1020, 380, "", "Self-serve hire", "5 min deploy"),
        (1020, 220, "", "Build in 2 weeks", "Agency delivery"),
        (80, 560, "", "Mobile menu", "Hamburger overlay"),
        (380, 560, "", "Solutions catalogue", "19 drop-in SKUs"),
        (700, 560, "", "Compare / Blog", "Trust & SEO"),
    ]
    html = ['<div class="flow">']
    html.append('<svg width="1600" height="900" style="position:absolute;inset:0"><g stroke="#a259ff" stroke-width="2" fill="none">')
    html.append('<path d="M300 120 H380"/><path d="M300 140 C340 140,340 260,380 260"/><path d="M300 160 C340 160,340 420,380 420"/>')
    html.append('<path d="M600 100 H700"/><path d="M600 260 H700"/><path d="M600 420 H700"/>')
    html.append('<path d="M920 420 H1020"/><path d="M920 260 H1020"/>')
    html.append("</g></svg>")
    for x,y,kind,title,sub in nodes:
        html.append(f'<div class="flow-node {kind}" style="left:{x}px;top:{y}px"><b>{title}</b>{sub}</div>')
    html.append("</div>")
    return "".join(html)

PAGES = [
    ("cover", "Cover", [
        ("cover-desktop", "Cover", "desktop", 80, 80, cover()),
    ]),
    ("ds", "Design system", [
        ("ds-desktop", "Design system / Desktop", "desktop", 80, 80, design_system()),
    ]),
    ("home", "Home", [
        ("home-desktop", "Home / Desktop 1440", "desktop", 80, 80, home(False)),
        ("home-mobile", "Home / Mobile 390", "mobile", 1600, 80, home(True)),
    ]),
    ("solutions", "Solutions", [
        ("sol-desktop", "Solutions / Desktop", "desktop", 80, 80, solutions(False)),
        ("sol-mobile", "Solutions / Mobile", "mobile", 1600, 80, solutions(True)),
    ]),
    ("contact", "Contact", [
        ("con-desktop", "Contact / Desktop", "desktop", 80, 80, contact(False)),
        ("con-mobile", "Contact / Mobile", "mobile", 1600, 80, contact(True)),
    ]),
    ("about", "About", [
        ("about-desktop", "About / Desktop", "desktop", 80, 80, about(False)),
        ("about-mobile", "About / Mobile", "mobile", 1600, 80, about(True)),
    ]),
    ("systems", "Revenue systems", [
        ("sys-desktop", "Revenue systems / Desktop", "desktop", 80, 80, systems(False)),
        ("sys-mobile", "Revenue systems / Mobile", "mobile", 1600, 80, systems(True)),
    ]),
    ("employee", "Hire AI Employee", [
        ("emp-desktop", "AI Employee / Desktop", "desktop", 80, 80, employee(False)),
        ("emp-mobile", "AI Employee / Mobile", "mobile", 1600, 80, employee(True)),
    ]),
    ("pricing", "Pricing", [
        ("price-desktop", "Pricing / Desktop", "desktop", 80, 80, pricing(False)),
        ("price-mobile", "Pricing / Mobile", "mobile", 1600, 80, pricing(True)),
    ]),
    ("voice", "Voice agents", [
        ("voice-desktop", "Voice / Desktop", "desktop", 80, 80, voice(False)),
        ("voice-mobile", "Voice / Mobile", "mobile", 1600, 80, voice(True)),
    ]),
    ("compare", "Compare + Blog", [
        ("cmp-desktop", "Compare / Desktop", "desktop", 80, 80, compare(False)),
        ("blog-desktop", "Blog / Desktop", "desktop", 1600, 80, blog(False)),
        ("blog-mobile", "Blog / Mobile", "mobile", 3120, 80, blog(True)),
    ]),
    ("menu", "Mobile menu", [
        ("menu-mobile", "Mobile menu / 390", "mobile", 80, 80, menu()),
    ]),
    ("flows", "User flows", [
        ("flows-desktop", "Primary conversion map", "desktop", 80, 80, flows()),
    ]),
]

def frame(fid, label, device, x, y, inner):
    w = 1440 if device == "desktop" else 390
    return f'''
    <div class="frame-wrap" data-frame="{fid}" data-page-owner="" style="left:{x}px;top:{y}px">
      <div class="frame-label">{label}</div>
      <div class="artboard {device}" style="width:{w}px">{inner}</div>
    </div>'''

page_html = []
for pid, pname, frames in PAGES:
    blocks = []
    for fid, label, device, x, y, inner in frames:
        block = frame(fid, label, device, x, y, inner)
        block = block.replace('data-page-owner=""', f'data-page-owner="{pid}"')
        blocks.append(block)
    page_html.append(f'<div class="canvas-page" data-page="{pid}" hidden>{"".join(blocks)}</div>')

page_items = []
for pid, pname, frames in PAGES:
    page_items.append(f'<button class="page-item" data-page="{pid}">{pname}<span>{len(frames)}</span></button>')

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="./favicon.svg" />
  <link rel="stylesheet" href="./css/tokens.css" />
  <link rel="stylesheet" href="./css/studio.css" />
  <link rel="stylesheet" href="./css/screens.css" />
</head>
<body class="studio design-mode">
  <header class="topbar">
    <div class="topbar-left">
      <strong class="file-name">OUTPERO UX</strong>
      <span class="chip">Draft</span>
    </div>
    <div class="topbar-center">
      <div class="mode-switch">
        <button class="active" data-mode="design">Design</button>
        <button data-mode="prototype">Prototype</button>
        <button data-mode="inspect">Inspect</button>
      </div>
    </div>
    <div class="topbar-right">
      <button class="chip" id="zoomOut">−</button>
      <span class="zoom-readout" id="zoomReadout">35%</span>
      <button class="chip" id="zoomIn">+</button>
      <button class="chip" id="zoomFit">Fit</button>
    </div>
  </header>
  <div class="layout">
    <aside class="panel panel-left">
      <h3>Pages</h3>
      <div class="pages">{''.join(page_items)}</div>
      <h3>Layers</h3>
      <div class="layers" id="layers"></div>
    </aside>
    <main class="canvas-wrap" id="canvasWrap">
      <div class="canvas" id="canvas">{''.join(page_html)}</div>
      <div class="hint">Space + drag to pan · Scroll to zoom · Prototype mode: click CTAs</div>
    </main>
    <aside class="panel panel-right inspect" id="inspect">
      <h3>Inspect</h3>
      <p style="color:#aaa;padding:8px 0">Select a frame to see tokens, type, and spacing.</p>
    </aside>
  </div>
  <script src="./js/studio.js"></script>
</body>
</html>
"""
OUT.write_text(html)
print("wrote", OUT, "bytes", OUT.stat().st_size)
print("pages", len(PAGES), "frames", sum(len(p[2]) for p in PAGES))
