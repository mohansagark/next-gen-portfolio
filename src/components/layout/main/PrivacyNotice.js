import Link from "next/link";

const TOC = [
  { id: "collect", label: "What I collect and why" },
  { id: "purposes", label: "Why I process this information" },
  { id: "ai", label: "AI processing" },
  { id: "processors", label: "Who processes the data" },
  { id: "retention", label: "How long I keep information" },
  { id: "requests", label: "What you can ask me" },
  { id: "security", label: "Security" },
  { id: "not-covered", label: "What this notice does not cover" },
  { id: "changes", label: "Changes to this Privacy Notice" },
  { id: "statements", label: "Important statements" },
  { id: "contact", label: "Contact" },
];

const PROCESSORS = [
  {
    name: "Vercel",
    role: "Website hosting, infrastructure and analytics",
    data: "Request metadata, IP/technical information, analytics information and website content",
    location:
      "May include locations outside India (primarily the United States)",
  },
  {
    name: "Cloudflare",
    role: "Turnstile; Leo API at voicebot.devmohan.in; Durable Object session memory; D1 lead storage; security-related services",
    data: "IP/security information, Turnstile information, Leo messages and session state, captured leads, and related technical data",
    location:
      "May include locations outside India (global edge network, US-headquartered)",
  },
  {
    name: "Resend",
    role: "Email delivery for contact-form submissions, and optional email notification when Leo captures a lead",
    data: "Name, email address, message, and other enquiry or lead fields necessary to send the email",
    location:
      "May include locations outside India (primarily the United States)",
  },
  {
    name: "Groq",
    role: "Primary provider for Leo — reads your message and drafts the chat reply, and generates voice/TTS output when voice mode is enabled",
    data: "Your messages, conversation context, and text required to generate the requested voice response",
    location:
      "May include locations outside India (primarily the United States)",
  },
  {
    name: "OpenRouter",
    role: "Fallback chat provider for Leo — used only if Groq is temporarily unavailable",
    data: "Your messages and the conversation context necessary to generate a reply",
    location: "May include locations outside India",
  },
  {
    name: "Deepgram",
    role: "Fallback voice/TTS provider for Leo — used only if Groq's voice service is temporarily unavailable",
    data: "Text required to generate the requested voice response",
    location: "May include locations outside India",
  },
];

const doc =
  "text-[0.9375rem] sm:text-[15px] leading-[1.7] text-[#374151] dark:text-[#c6ccd6] [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-[1.15rem] [&_li]:mt-1.5 [&_a]:text-teal-700 dark:[&_a]:text-[#5eead4] [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-[#0b0d10] dark:[&_strong]:text-[#f3f4f6] [&_code]:text-[0.85em] [&_code]:font-medium";

const h2 =
  "scroll-mt-28 text-[1.125rem] sm:text-xl font-semibold tracking-tight text-[#0b0d10] dark:text-[#f3f4f6] pt-10 pb-3 mb-5 border-b border-[#e5e7eb] dark:border-[#262b33]";

const h3 =
  "text-[0.9375rem] sm:text-[15px] font-semibold text-[#0b0d10] dark:text-[#f3f4f6] mt-8 mb-3";

export default function PrivacyNotice() {
  return (
    <main id="main" className="pt-4 md:pt-32 pb-16 md:pb-24">
      <section className="px-5 sm:px-6">
        <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px]">
          <header className="max-w-[42rem] mb-8 md:mb-10">
          <h1 className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-[#0b0d10] dark:text-white leading-tight">
            Privacy notice
          </h1>
          <p className="mt-3 text-sm text-[#6b7280] dark:text-[#9aa3af]">
            Last updated: 16 August 2026
            <span className="mx-2 opacity-40" aria-hidden>
              ·
            </span>
            <a
              href="mailto:contact@devmohan.in"
              className="text-teal-700 dark:text-[#5eead4] hover:underline underline-offset-2"
            >
              contact@devmohan.in
            </a>
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[220px_minmax(0,42rem)] lg:gap-x-14 xl:gap-x-16 lg:items-start">
          <nav
            aria-label="On this page"
            className="mb-10 lg:mb-0 lg:sticky lg:top-28"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#6b7280] dark:text-[#9aa3af] mb-3">
              On this page
            </p>
            <ol className="m-0 list-none space-y-1.5 p-0 text-[0.8125rem] leading-snug">
              {TOC.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex gap-2 text-[#6b7280] dark:text-[#9aa3af] hover:text-teal-700 dark:hover:text-[#5eead4] transition-colors"
                  >
                    <span className="w-4 shrink-0 tabular-nums text-[#9aa3af] dark:text-[#6b7280] group-hover:text-inherit">
                      {i + 1}.
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={doc}>
            <p>
              <strong>Who I am:</strong> Mohan Sagar Killamsetty (“I”, “me”). I
              operate{" "}
              <a href="https://www.devmohan.in/">devmohan.in</a>,{" "}
              <a href="https://blog.devmohan.in/">blog.devmohan.in</a>, and the
              Leo greeter, whose API is at{" "}
              <a href="https://voicebot.devmohan.in/">voicebot.devmohan.in</a>.
            </p>
            <p>
              This Privacy Notice explains how I process personal data when you
              visit these sites, use the contact form, or interact with Leo.
            </p>
            <p>
              I am the <strong>Data Fiduciary</strong> for personal data that I
              decide to collect and process through these sites.
            </p>
            <p>
              I do not sell personal data. I do not run advertising on these
              sites. I do not build or sell marketing lists from information
              submitted through this site.
            </p>
            <p>
              This notice is intended for visitors in India and anyone else who
              uses these sites. Indian law governs this notice.
            </p>

            <h2 id="collect" className={h2}>
              1. What I collect and why
            </h2>
            <p>
              I try to collect only information that is reasonably necessary for
              the purpose described.
            </p>
            <p>
              If you do not provide information required for a particular
              feature, that feature may not work.
            </p>

            <h3 className={h3}>Contact form</h3>
            <p>
              The contact form on{" "}
              <Link href="/#contact">devmohan.in/#contact</Link> may collect:
            </p>
            <ul>
              <li>
                <strong>Name</strong> — required
              </li>
              <li>
                <strong>Email address</strong> — required
              </li>
              <li>
                <strong>Message</strong> — required
              </li>
              <li>
                <strong>Company</strong> — optional
              </li>
              <li>
                <strong>Phone number</strong> — optional
              </li>
              <li>
                <strong>Enquiry reason</strong> — selected from a list
              </li>
              <li>
                <strong>IP address and security information</strong> associated
                with the request
              </li>
              <li>
                <strong>Cloudflare Turnstile information/token</strong> used to
                detect automated or abusive submissions
              </li>
            </ul>
            <p>I use this information to:</p>
            <ul>
              <li>read and understand your enquiry;</li>
              <li>respond to you;</li>
              <li>communicate with you about the enquiry; and</li>
              <li>prevent spam, abuse, and automated submissions.</li>
            </ul>
            <p>
              I do <strong>not</strong> use contact-form submissions to:
            </p>
            <ul>
              <li>build a marketing or newsletter list;</li>
              <li>sell or rent personal data;</li>
              <li>create advertising profiles;</li>
              <li>
                provide contact lists to recruiters or other third parties; or
              </li>
              <li>train a general-purpose public AI model.</li>
            </ul>

            <h3 className={h3}>Leo — voice/chat greeter</h3>
            <p>
              Leo allows visitors to interact with an AI-powered voice/chat
              greeter on the site. The greeter’s API is the host I operate at{" "}
              <a href="https://voicebot.devmohan.in/">voicebot.devmohan.in</a>.
            </p>
            <p>Depending on how you use Leo, it may process:</p>
            <ul>
              <li>messages you type;</li>
              <li>
                speech that you choose to provide when voice mode is enabled;
              </li>
              <li>speech converted to text for processing;</li>
              <li>
                optional lead information that you voluntarily provide, such as
                your name, email, message, or preferred contact time;
              </li>
              <li>
                consent information associated with a follow-up request; and
              </li>
              <li>
                a short-lived session identifier or session information needed
                to continue the conversation.
              </li>
            </ul>
            <p>
              Conversation memory for the current session is held in a
              Cloudflare Durable Object I operate. When you ask Leo to pass a
              follow-up to me, I store that lead in a Cloudflare D1 database I
              operate. If lead-notify email is configured, Resend may also send
              me a copy of that lead.
            </p>
            <p>
              If a primary provider is temporarily unavailable, your message or
              speech may instead be handled by a backup provider, or by your
              browser’s own speech recognition and speech synthesis, so the
              conversation can keep working.
            </p>
            <p>
              If you enable voice interaction, your microphone is used to
              capture speech for transcription and response generation. The
              providers that may be used, including backups, are listed in
              Section 4.
            </p>
            <p>
              I do <strong>not</strong> maintain a library of your voice
              recordings for the purpose of building a voice profile.
            </p>
            <p>
              A returning-visitor “remember me” setting, where provided, is
              stored as a local browser preference only. It does not create a
              cross-site tracking profile.
            </p>

            <h3 className={h3}>Email correspondence</h3>
            <p>
              If you voluntarily email{" "}
              <a href="mailto:contact@devmohan.in">contact@devmohan.in</a>, or
              reply to an existing email conversation, I process the
              information contained in that email for the purpose of
              corresponding with you.
            </p>

            <h3 className={h3}>Technical and security information</h3>
            <p>
              The site and its infrastructure may process technical information
              such as:
            </p>
            <ul>
              <li>IP address;</li>
              <li>browser and User-Agent information;</li>
              <li>timestamps;</li>
              <li>request metadata;</li>
              <li>rate-limit information;</li>
              <li>security events;</li>
              <li>error logs; and</li>
              <li>
                information required to detect or investigate abuse or failures.
              </li>
            </ul>
            <p>
              I use this information to operate the site, maintain security,
              prevent abuse, enforce rate limits, and diagnose technical
              problems.
            </p>
            <p>I do not use this information to serve targeted advertising.</p>

            <h3 className={h3}>Cookies and browser storage</h3>
            <p>
              The site may use browser-local storage, such as a{" "}
              <code>theme</code> preference for light/dark mode. This
              information remains in your browser and is not intended to
              identify you or track you across websites.
            </p>
            <p>
              Cloudflare Turnstile may process technical information or use
              browser-side mechanisms on your device as part of verifying that a
              submission is not automated. This is a security mechanism, not an
              advertising or cross-site tracking mechanism.
            </p>

            <h3 className={h3}>Vercel Analytics</h3>
            <p>
              I use Vercel Analytics on relevant pages to understand aggregated
              website usage and performance.
            </p>
            <p>
              Analytics may involve technical request information being
              processed by Vercel as part of providing its hosting and analytics
              services.
            </p>
            <p>
              I do not use Vercel Analytics to build advertising profiles or
              sell advertising based on your activity.
            </p>

            <h3 className={h3}>Information I do not intentionally collect</h3>
            <p>I do not intentionally collect through the portfolio:</p>
            <ul>
              <li>payment card information;</li>
              <li>government identification numbers;</li>
              <li>health information;</li>
              <li>biometric information for identification;</li>
              <li>
                information about children as a category of the site’s audience;
                or
              </li>
              <li>
                other highly sensitive information unless you voluntarily submit
                it.
              </li>
            </ul>
            <p>
              Please do not submit passwords, authentication secrets, financial
              credentials, government IDs, medical records, or other highly
              sensitive documents through the contact form or Leo.
            </p>
            <p>
              This site is not directed at children under 18. I do not knowingly
              solicit or intentionally collect personal data from children.
            </p>
            <p>
              Public pages such as work, about, and testimonials may contain
              professional information that I have intentionally published.
              Testimonials include names, photos, and quotes of professional
              references I chose to publish. That is my published content; it is
              not information I collect from visitors through the site.
            </p>

            <h2 id="purposes" className={h2}>
              2. Why I process this information
            </h2>
            <p>
              I process personal data only for the purposes described in this
              notice.
            </p>
            <p>
              I have written this notice to align with the Digital Personal Data
              Protection Act, 2023 and the Digital Personal Data Protection
              Rules, 2025. I will follow the requirements applicable to my
              processing as those provisions come into force. Until then, this
              notice describes my actual data practices.
            </p>

            <h3 className={h3}>Consent</h3>
            <p>
              For the contact form and optional Leo follow-up, I ask you to
              agree before I use that information to respond to you.
            </p>
            <p>You can refuse. If you do, that feature may not be available.</p>
            <p>
              You can later email me at{" "}
              <a href="mailto:contact@devmohan.in">contact@devmohan.in</a> to
              withdraw that agreement. I will stop using your information for
              follow-up. I may still keep limited information where I need it
              for security or to deal with abuse.
            </p>

            <h3 className={h3}>Site operation and security</h3>
            <p>
              I may process technical information such as IP addresses,
              rate-limit information, Turnstile results, and security logs when
              reasonably necessary to operate the site, prevent spam and abuse,
              protect the service, or investigate technical failures.
            </p>

            <h3 className={h3}>Voluntary correspondence</h3>
            <p>
              If you contact me directly by email, I process your message so I
              can read it and respond.
            </p>
            <p>
              I will not add you to a newsletter or marketing program without
              asking you first.
            </p>

            <h2 id="ai" className={h2}>
              3. AI processing
            </h2>
            <p>
              Leo uses third-party technology to process conversations and
              generate responses.
            </p>
            <p>
              When you interact with Leo, your messages may be transmitted to
              third-party service providers where necessary to:
            </p>
            <ul>
              <li>process your message;</li>
              <li>generate an AI response;</li>
              <li>provide voice functionality when enabled; or</li>
              <li>
                maintain the short-lived session required for the interaction.
              </li>
            </ul>
            <p>
              I do not use messages submitted to Leo to train or develop a
              general-purpose public AI model as a product.
            </p>
            <p>
              This does not mean that third-party service providers necessarily
              have zero retention or processing of the information. Their own
              privacy, security, retention, and service policies may apply to
              data processed through their infrastructure.
            </p>
            <p>I disclose the relevant processors below.</p>

            <h2 id="processors" className={h2}>
              4. Who processes the data
            </h2>
            <p>
              I am the person who ordinarily reviews enquiries and Leo leads for
              the purpose of responding to you.
            </p>
            <p>
              Third-party service providers may process information through
              their systems as necessary to provide services to me.
            </p>
            <p>I do not sell your personal data to these providers.</p>

            <div className="mb-6">
              <div className="space-y-4 md:hidden">
                {PROCESSORS.map((row) => (
                  <div
                    key={row.name}
                    className="rounded-lg border border-[#e5e7eb] dark:border-[#262b33] p-4"
                  >
                    <p className="mb-3 font-semibold text-[#0b0d10] dark:text-[#f3f4f6]">
                      {row.name}
                    </p>
                    <dl className="m-0 grid gap-3">
                      <div>
                        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#6b7280] dark:text-[#9aa3af]">
                          Role
                        </dt>
                        <dd className="m-0 mt-1">{row.role}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#6b7280] dark:text-[#9aa3af]">
                          Data that may be processed
                        </dt>
                        <dd className="m-0 mt-1">{row.data}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#6b7280] dark:text-[#9aa3af]">
                          Processing location
                        </dt>
                        <dd className="m-0 mt-1">{row.location}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-left text-[0.8125rem] leading-snug">
                  <thead>
                    <tr className="border-b border-[#e5e7eb] dark:border-[#262b33]">
                      <th className="py-2.5 pr-4 font-semibold text-[#0b0d10] dark:text-[#f3f4f6] align-bottom">
                        Processor
                      </th>
                      <th className="py-2.5 pr-4 font-semibold text-[#0b0d10] dark:text-[#f3f4f6] align-bottom">
                        Role
                      </th>
                      <th className="py-2.5 pr-4 font-semibold text-[#0b0d10] dark:text-[#f3f4f6] align-bottom">
                        Data that may be processed
                      </th>
                      <th className="py-2.5 font-semibold text-[#0b0d10] dark:text-[#f3f4f6] align-bottom">
                        Processing location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROCESSORS.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-[#e5e7eb] dark:border-[#262b33] align-top"
                      >
                        <td className="py-3 pr-4 font-semibold text-[#0b0d10] dark:text-[#f3f4f6]">
                          {row.name}
                        </td>
                        <td className="py-3 pr-4">{row.role}</td>
                        <td className="py-3 pr-4">{row.data}</td>
                        <td className="py-3">{row.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              If the provider fallbacks above are unavailable, Leo may also use
              speech-recognition or speech-synthesis capabilities provided by
              your browser or device. Those capabilities may run on-device, or
              they may send audio or text to the browser or its underlying
              provider. On Chrome, speech recognition commonly uses Google’s
              speech service.
            </p>
            <p>
              These providers process information as part of providing their
              services to me.
            </p>
            <p>
              Their own privacy and security policies may govern how they
              operate their infrastructure, including backups, logs,
              subprocessors, and other technical processing.
            </p>
            <p>
              Cross-border processing may occur because these providers operate
              infrastructure outside India.
            </p>
            <p>
              I will not provide your enquiry to another person or company for
              their own marketing purposes.
            </p>
            <p>
              If I later engage someone solely to help me respond to enquiries,
              that person would only be given access necessary for that purpose
              and would be expected to respect the same purpose limitations. I
              do not currently use such a person.
            </p>

            <h2 id="retention" className={h2}>
              5. How long I keep information
            </h2>
            <p>
              I try to keep personal data only for as long as it is reasonably
              necessary for the purpose for which it was collected.
            </p>
            <p>These are my operational retention rules:</p>

            <h3 className={h3}>Contact form and email threads</h3>
            <p>
              I keep contact-form enquiries and related email correspondence
              while the conversation is active.
            </p>
            <p>
              When the conversation is finished, I intend to delete my retained
              copy when it is no longer reasonably necessary.
            </p>
            <p>
              I also review stale contact threads at least once each calendar
              month and delete those that are no longer needed.
            </p>

            <h3 className={h3}>Leo sessions and captured leads</h3>
            <p>
              Leo session information and captured leads are intended to be
              short-lived.
            </p>
            <p>I do not maintain a long-term archive of Leo conversations.</p>
            <p>
              Cloudflare Durable Object session data and Cloudflare D1 lead rows
              are reviewed and deleted at least once each calendar month,
              subject to information that must temporarily remain available for
              security, legal, or technical reasons.
            </p>

            <h3 className={h3}>Security logs</h3>
            <p>
              Security logs, rate-limit records, and related technical
              information are kept only for as long as reasonably necessary to
              operate the service, investigate failures, or prevent abuse.
            </p>
            <p>
              These records are typically retained for days rather than months,
              unless a longer period is reasonably necessary for a specific
              security or legal reason.
            </p>

            <h3 className={h3}>Third-party providers</h3>
            <p>
              Vercel, Cloudflare, Resend, Groq, OpenRouter, Deepgram, and other
              service providers may retain copies, backups, logs, or other
              technical records according to their own policies.
            </p>
            <p>
              I cannot guarantee deletion from third-party backup systems on
              demand.
            </p>
            <p>
              Where you make a specific legal or privacy request that concerns
              information held by a processor, I may pass the request to the
              relevant provider where appropriate.
            </p>
            <p>
              Deleting my own copy does not necessarily immediately delete
              information already present in a provider’s backup, transit log,
              or other infrastructure.
            </p>

            <h2 id="requests" className={h2}>
              6. What you can ask me
            </h2>
            <p>
              You can contact me at{" "}
              <a href="mailto:contact@devmohan.in">contact@devmohan.in</a>.
            </p>
            <p>
              Please email me from the address associated with your enquiry
              where possible, or provide enough information for me to identify
              the relevant conversation or interaction.
            </p>
            <p>You may ask me to:</p>
            <ul>
              <li>show you the personal data I hold about you;</li>
              <li>correct inaccurate information;</li>
              <li>delete information I no longer need;</li>
              <li>stop using your information for follow-up; or</li>
              <li>look into a privacy concern.</li>
            </ul>
            <p>I will aim to respond within a reasonable period.</p>
            <p>I may need to verify your identity before acting on a request.</p>
            <p>
              I may refuse or limit a request if I cannot verify it, if it is
              abusive, or if acting on it would compromise security or another
              person’s rights.
            </p>
            <p>
              For example, I may retain limited security information when I need
              it to investigate or prevent an attack or abuse.
            </p>
            <p>
              If you are not satisfied with my response, you can contact the
              Data Protection Board of India.
            </p>

            <h2 id="security" className={h2}>
              7. Security
            </h2>
            <p>I take reasonable steps to protect this information.</p>
            <p>These include:</p>
            <ul>
              <li>HTTPS/TLS for data transmitted to my services;</li>
              <li>Cloudflare Turnstile and other spam controls;</li>
              <li>rate limiting;</li>
              <li>origin checks for Leo;</li>
              <li>access controls;</li>
              <li>limited retention;</li>
              <li>removal of stale data; and</li>
              <li>monitoring and debugging of technical failures.</li>
            </ul>
            <p>
              I do not intentionally store contact-form payloads in a database
              operated by me. The contact form is designed to become an email
              enquiry rather than a permanent record in a portfolio database.
            </p>
            <p>
              Leo is different: captured leads are stored in Cloudflare D1, and
              session memory is stored in Durable Objects, as described in
              Sections 1, 4, and 5.
            </p>
            <p>No method of transmission or storage is completely secure.</p>
            <p>
              I therefore do not promise that personal data can never be
              breached, intercepted, lost, or accessed without authorization.
            </p>
            <p>
              If I become aware of a personal-data breach that is likely to
              affect you, I will tell you and the relevant authority when I am
              required to do so.
            </p>
            <p>
              Please do not send passwords, API keys, authentication secrets,
              financial credentials, government IDs, medical information, or
              other highly sensitive documents through the contact form or Leo.
            </p>

            <h2 id="not-covered" className={h2}>
              8. What this notice does not cover
            </h2>
            <p>This notice does not cover:</p>
            <ul>
              <li>
                third-party websites, applications, or services linked from or
                embedded in this site (for example, GitHub or PyPI);
              </li>
              <li>
                employers and other organizations named in my published work
                history — this is professional information I have chosen to
                publish about myself, not information I collect about them;
              </li>
              <li>
                named people in testimonials — those are professional references
                I chose to publish, not visitor-submitted data;
              </li>
              <li>
                <code>admin.devmohan.in</code>, which is my content
                administration system rather than a visitor intake service;
              </li>
              <li>
                information that you independently publish about me elsewhere;
                or
              </li>
              <li>
                third-party collection or scraping of information that I have
                intentionally made public.
              </li>
            </ul>
            <p>
              Those services and websites have their own privacy practices and
              policies.
            </p>
            <p>
              I cannot control how third parties independently collect, copy,
              index, or reuse information that I have made publicly available.
            </p>

            <h2 id="changes" className={h2}>
              9. Changes to this Privacy Notice
            </h2>
            <p>
              I may update this Privacy Notice when the site’s data practices,
              technology, or processors change.
            </p>
            <p>
              If I start using your information for a new purpose, I will update
              this notice and ask again where that is needed.
            </p>
            <p>
              The “Last updated” date at the top of this page will indicate when
              the notice was most recently changed.
            </p>

            <h2 id="statements" className={h2}>
              10. Important statements
            </h2>
            <p>For clarity:</p>
            <ul>
              <li>Submitting the contact form is optional.</li>
              <li>Providing information to Leo is optional.</li>
              <li>
                Leo follow-up is subject to the consent mechanism presented in
                the interaction.
              </li>
              <li>I do not sell personal data.</li>
              <li>
                I do not run targeted advertising based on information submitted
                through this site.
              </li>
              <li>
                I do not build marketing lists from contact-form or Leo
                submissions.
              </li>
              <li>
                I do not provide enquiries to recruiters or other companies for
                their own marketing purposes.
              </li>
              <li>
                I do not use contact-form or Leo messages to train a
                general-purpose public AI model.
              </li>
              <li>
                Third-party service providers may process information as
                necessary to provide their services.
              </li>
              <li>
                Third-party providers may retain backups or logs according to
                their own policies.
              </li>
              <li>
                I am a sole individual operating a personal professional
                portfolio.
              </li>
              <li>Indian law governs this notice.</li>
            </ul>

            <h2 id="contact" className={h2}>
              Contact
            </h2>
            <p>
              For privacy questions, access, correction, deletion, or to stop
              follow-up:
            </p>
            <p>
              <strong>Mohan Sagar Killamsetty</strong>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:contact@devmohan.in">contact@devmohan.in</a>
            </p>
            <p>
              Website:{" "}
              <a href="https://www.devmohan.in/">devmohan.in</a>
            </p>
          </article>
        </div>
        </div>
      </section>
    </main>
  );
}
