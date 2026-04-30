import type { Task } from './types';

export const TASKS: Task[] = [
  {
    id: 't0', month: 'March', area: 'Directors', owner: 'both', urgent: true,
    text: 'Apply for TPEC conference through IEEE',
    note: 'Use previous conference application PDFs as templates from TPEC Planning Drive. Email sponsors (PES, PELS, IAS) the same day you submit the application. IAS takes longest — email them first.',
  },
  {
    id: 't1', month: 'March', area: 'Directors', owner: 'both', urgent: true,
    text: 'Submit NSF grant application (you fill drafts, Dr. Birchfield submits)',
    note: 'TPEC 2026 shifted submission to early February — aim for same or earlier for 2027 so grant approval comes sooner and attendees can apply earlier. Drafts go in Directors > TPEC 2027 > NSF Proposal folder. Dr. Birchfield asked for updated contacts and smart grid center info/photos.',
  },
  {
    id: 't2', month: 'March', area: 'Logistics', owner: 'you', urgent: true,
    text: 'Book MSC venue — confirm February 2027 dates ASAP',
    note: 'Everything hinges on the venue dates. Confirm before finalizing IEEE application dates. Target mid-February 2027 (~Feb 15).',
  },
  {
    id: 't3', month: 'March', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Reserve Zachry Chevron rooms for Welcome Dinner (Monday night)',
    note: "Must be reserved by staff/faculty or RA via Zachry's online reservation system. If not eligible, ask Dr. Birchfield — do this early. Reservation must be attached to the IEEE joint student chapter. The room is FREE but requires: renting black tablecloths from Ashley & Co, arranging and resetting the room, taking out trash (dumpster near Starbucks). Files after reserving go in Event Logistics > TPEC 2027 > Welcome Dinner > Chevron Rooms.",
  },
  {
    id: 't4', month: 'April', area: 'Directors', owner: 'both', urgent: false,
    text: 'Finalize co-director responsibility split — confirm promotions ownership',
    note: 'Document the split clearly. TPEC 2026 split: Director 1 = Publications/Technical/Logistics/Operations, Director 2 = Financial/Merchandise/Promotions (traded Operations mid-year). Make the split explicit early so chairs know who to go to.',
  },
  {
    id: 't5', month: 'April', area: 'Directors', owner: 'both', urgent: false,
    text: 'Form planning committee — use interviews to filter commitment',
    note: "TPEC 2026 used interviews — weeded out 2 uncommitted applicants though fewer people applied overall. Be clear about time commitment during interviews. Logistics needs 2 people minimum. Finance needs 2 people: one for sponsorship point, one for budget specifically (Dr. Birchfield's request). Consider recruiting outside the EE department for non-technical roles like Promotions.",
  },
  {
    id: 't6', month: 'April', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Begin reaching out to caterers — get quotes for boxed lunches and snacks',
    note: 'TPEC 2026 switched to boxed meals only — reduced costs significantly and was more sanitary than buffet. Include vegan AND real Halal food options per 2026 post-conference feedback. Coffee should NOT be placed in the ballroom.',
  },
  {
    id: 't7', month: 'April', area: 'Finance', owner: 'you', urgent: false,
    text: 'Complete IEEE Foundation Final Grant Report (from TPEC 2026)',
  },
  {
    id: 't8', month: 'May', area: 'Directors', owner: 'both', urgent: false,
    text: 'Update TPEC website — remove all 2026 content, update dates and conference info',
  },
  {
    id: 't9', month: 'May', area: 'Promotions', owner: 'you', urgent: false,
    text: 'Plan summer volunteer recruitment strategy — prep classroom outreach materials for Fall',
    note: 'TPEC 2026 plan to visit classrooms fell apart when the operations chair had to leave the country. Identify a backup person in advance. Going to classrooms in person is effective for recruitment.',
  },
  {
    id: 't10', month: 'June', area: 'Directors', owner: 'both', urgent: false,
    text: 'Complete IEEE Conference Publication Form',
    note: 'Reference form found in Publications > TPEC 2026 > EasyChair folder.',
  },
  {
    id: 't11', month: 'June', area: 'Finance', owner: 'you', urgent: false,
    text: 'Start preparing Good Bull Fund application content — deadline is ~Oct 31',
    note: 'Application URL: https://getinvolved.tamu.edu/admin/organization-forms/2166/submission. Opens beginning of Fall semester. Fund can ONLY be used for venue/catering type expenses. Budget upload = expenses only, omit revenue unless specifically required. Core items: Conference venue, Welcome Dinner venue, Catering/food, Keynote speaker hotel, Promotion and merchandise, Aggie Wranglers performance.',
  },
  {
    id: 't12', month: 'July', area: 'Finance', owner: 'you', urgent: true,
    text: 'Start sponsor outreach — target EARLY July, not mid-July like 2026',
    note: 'Use mail merge tool for automated personalized emails to bulk sponsor list. ECEN department and other special cases get their own tailored email — do not send them the automated template. Log all sponsors in [GoogleSheet] TPEC2027_SponsorContacts under Returning Sponsors or New Sponsors tab. Summer volunteers can help send outreach emails — this worked well in 2026.',
  },
  {
    id: 't13', month: 'July', area: 'Directors', owner: 'co', urgent: false,
    text: 'Set up MS CMT for paper submissions — replacement for EasyChair',
    note: 'EasyChair costs over $1,000 for the license. MS CMT is free. Nicole (TPEC 2026 director) strongly recommends switching. Test the platform thoroughly before opening submissions in August. Publication chairs should own this setup — the director should not do it themselves.',
  },
  {
    id: 't14', month: 'July', area: 'Directors', owner: 'both', urgent: false,
    text: 'Fill out IEEE Electronic Copyright Agreement',
    note: 'Reference found in Publications > TPEC 2026 > EasyChair folder.',
  },
  {
    id: 't15', month: 'July', area: 'Directors', owner: 'co', urgent: false,
    text: 'Send call for papers email to ECEN department — recruit summer virtual volunteers',
    note: 'TPEC 2026 sent this July 1. Include Google Form sign-up link for volunteer interest.',
  },
  {
    id: 't16', month: 'August', area: 'Directors', owner: 'both', urgent: false,
    text: 'Open paper submissions via MS CMT — send first call for papers through PowerGlobe',
    note: 'Dr. Birchfield sends the final PowerGlobe email blast. Directors and Publications chair draft the content first. The call for papers can go out before the submission system is fully ready.',
  },
  {
    id: 't17', month: 'August', area: 'Finance', owner: 'you', urgent: false,
    text: 'Set up Flywire registration — determine Early Bird vs Regular/On-site pricing',
    note: 'IMPORTANT: Investigate what happened with the 2026 registration issue before setup. Many attendees said they registered but did not appear on the list — possibly dropped during incomplete registration or a Flywire bug. Verify with Flywire. Switch from Early Bird to Regular/On-site pricing 2 weeks before conference. Student registration costs should stay low — Dr. Birchfield prioritizes this.',
  },
  {
    id: 't18', month: 'August', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Confirm food vendor and finalize boxed meal plan structure',
  },
  {
    id: 't19', month: 'August', area: 'Promotions', owner: 'you', urgent: false,
    text: 'Begin designing conference merch — specify items students actually want',
    note: 'Per 2026 post-conference feedback: students like merch — get input on recommended items. Hand out merch and parking permits to committee members BEFORE the conference, not at a merch table where people can just take from it.',
  },
  {
    id: 't20', month: 'September', area: 'Finance', owner: 'you', urgent: false,
    text: 'Open Early Bird registration',
  },
  {
    id: 't21', month: 'September', area: 'Finance', owner: 'you', urgent: false,
    text: 'Send follow-up sponsor outreach emails — 1 week after no response',
    note: 'Remain professional and respectful. Log all status updates in SponsorTracker. Handle each declined sponsor with a brief thank-you expressing interest in future collaboration.',
  },
  {
    id: 't22', month: 'September', area: 'Promotions', owner: 'you', urgent: false,
    text: 'Start classroom visits to recruit volunteers — have backup person assigned',
    note: '2026: This plan collapsed when the operations chair left the country. Assign a backup person before starting this process. Visiting classrooms in person to present is effective.',
  },
  {
    id: 't23', month: 'October', area: 'Directors', owner: 'both', urgent: false,
    text: 'Ask Dr. Overbye for keynote speaker suggestions',
    note: 'WARNING: When asked for TPEC 2026, Dr. Overbye immediately emailed the person himself asking if they wanted to speak — so suggestions from him may become mandatory invitations. Be deliberate about when and how you ask. We generally aim for 3 keynote speakers.',
  },
  {
    id: 't24', month: 'October', area: 'Directors', owner: 'co', urgent: false,
    text: 'Open Google Form for reviewer sign-ups',
    note: 'Technical chair owns this. Reviewers need to be gathered before the November deadline so two rounds of reviews can run in December.',
  },
  {
    id: 't25', month: 'October', area: 'Finance', owner: 'you', urgent: true,
    text: 'Submit Good Bull Fund application — deadline ~October 31',
    note: 'See t11 for full application guidance. Application URL: https://getinvolved.tamu.edu/admin/organization-forms/2166/submission. Required fields include: Full org name, SOFC account number, student leader info, activity description, Texas A&M Core Values alignment, community impact.',
  },
  {
    id: 't26', month: 'October', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Get final catering quotes and lock in vendor',
  },
  {
    id: 't27', month: 'November', area: 'Directors', owner: 'co', urgent: true,
    text: 'First paper submission deadline — move 1 week earlier than TPEC 2026 (TPEC 2026 was Nov 24)',
    note: 'TPEC 2026 final deadline was Nov 24, 2025. Move it 1 week earlier for 2027. Send a deadline EXTENSION email 2 days before the first deadline (standard practice). Peak publications workload conflicts with finals — plan well in advance.',
  },
  {
    id: 't28', month: 'November', area: 'Finance', owner: 'you', urgent: false,
    text: 'Submit IEEE pre-conference budget',
  },
  {
    id: 't29', month: 'November', area: 'Promotions', owner: 'you', urgent: false,
    text: 'Email undergraduate professors about TPEC extra credit program',
    note: "IMPORTANT: Email must come from the DIRECTOR, not a chair — TPEC 2026 had a much higher response rate when the director sent it vs a chair. Provide a presentation deck professors can share with their class. Target courses: ECEN 460, Dr. Butler Purry's courses, Dr. Eshani's courses.",
  },
  {
    id: 't30', month: 'December', area: 'Directors', owner: 'co', urgent: false,
    text: 'Send all review requests via MS CMT — run two rounds of reviewing',
    note: 'Round 1: ~Dec 7–15. Round 2: ~Dec 16–23. Second round targets papers with no reviews after round 1. TPEC 2026 had only 2 papers with no reviews after this system.',
  },
  {
    id: 't31', month: 'December', area: 'Finance', owner: 'you', urgent: false,
    text: 'Close Early Bird registration, open Regular/On-site registration',
  },
  {
    id: 't32', month: 'December', area: 'Promotions', owner: 'you', urgent: false,
    text: 'Send PowerGlobe email announcing final paper submission deadline',
  },
  {
    id: 't33', month: 'January', area: 'Directors', owner: 'both', urgent: true,
    text: 'Send accept/reject notifications — target January 2 or earlier',
    note: 'TPEC 2026 sent Jan 2, 2026. Do NOT move this later — you need the full January to build the schedule, assign sessions, and prepare all logistics.',
  },
  {
    id: 't34', month: 'January', area: 'Directors', owner: 'co', urgent: false,
    text: 'Build paper sessions and blocks — include lightning presentation format',
    note: 'TPEC 2026 introduced lightning presentations: 5-min slide presentation with no questions, then required poster during the poster session. Place lightning presentation block immediately before poster session so Q&A happens naturally at the poster.',
  },
  {
    id: 't35', month: 'January', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Set poster submission deadline online — 1.5 to 2 weeks before conference',
    note: 'TPEC 2026 had NO online poster submission deadline — this must be fixed for 2027. MSC requires the poster stand count 1 week before the conference. Set deadline ~1.5–2 weeks out.',
  },
  {
    id: 't36', month: 'January', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Finalize food counts and submit to caterer',
    note: 'Food counts are due to the caterer when registration switches from Early Bird to Regular/On-site (2 weeks before conference).',
  },
  {
    id: 't37', month: 'January', area: 'Finance', owner: 'you', urgent: false,
    text: 'Finalize and place conference merch order',
  },
  {
    id: 't38', month: 'January', area: 'Directors', owner: 'both', urgent: false,
    text: 'Recruit session chairs — minimum graduate student level',
    note: 'TPEC 2026 lowered the bar from PhD to graduate student minimum — worked well. For lightning presentation sessions: session chairs do NOT score since there are no questions.',
  },
  {
    id: 't39', month: 'January', area: 'Directors', owner: 'both', urgent: false,
    text: 'Collect all sponsor info — logos, descriptions, booth needs — follow up if not received',
    note: 'Sponsors care a lot about undergraduate attendance. Make sure the undergrad extra-credit program is running so sponsors see students at their tables.',
  },
  {
    id: 't40', month: 'January', area: 'Directors', owner: 'both', urgent: false,
    text: 'Update website with full schedule, speakers, and session info',
  },
  {
    id: 't41', month: 'January', area: 'Directors', owner: 'both', urgent: false,
    text: 'Plan CIR tour with Eric — do not include anyone else in that planning chain',
    note: 'Keep this coordination strictly between you and Eric. Do not loop in additional people.',
  },
  {
    id: 't42', month: 'February', area: 'Logistics', owner: 'you', urgent: true,
    text: 'Make nametags and get conference booklet printed',
  },
  {
    id: 't43', month: 'February', area: 'Directors', owner: 'both', urgent: true,
    text: 'Assign volunteers to specific times and tasks — do NOT use open sign-up',
    note: 'TPEC 2026 had serious volunteer communication problems. For 2027: assign each volunteer a specific time slot and task. They show up, do their job. Keep communication minimal and targeted. Give parking permits and merch to committee members BEFORE conference day.',
  },
  {
    id: 't44', month: 'February', area: 'Directors', owner: 'both', urgent: false,
    text: 'Confirm all session chairs and poster reviewers have scoring sheets and understand the process',
    note: 'Scoring sheets are the same format for all session chairs and poster reviewers. Lightning poster scores only compete for best paper award — poster-only submissions compete for best poster award.',
  },
  {
    id: 't45', month: 'February', area: 'Logistics', owner: 'you', urgent: false,
    text: 'Confirm bus pickup location and add clear signage at pickup point',
    note: '2026 post-conference feedback: many attendees did not know where the buses were. Specify pickup from right in front near the steps (main entrance). Put up physical signs. Include bus pickup info in app, booklet, and announcements.',
  },
  {
    id: 't46', month: 'February', area: 'Directors', owner: 'both', urgent: false,
    text: 'Pre-write all remarks — opening, keynote intros, sponsor intros, closing — and print them out',
    note: 'Do not try to memorize or improvise these during the conference. Make sure all addressers receive their plaques after their address.',
  },
  {
    id: 't47', month: 'February', area: 'Directors', owner: 'both', urgent: true,
    text: 'CONFERENCE DAYS (~Feb 15, 2027) — greet all speakers and sponsors, attend all addresses, distribute plaques',
    note: 'Directors are the face of the conference. Be calm and in control at all times — your demeanor sets the tone for everyone. Enjoy it — this is the payoff for all the planning.',
  },
  {
    id: 't48', month: 'February', area: 'Finance', owner: 'you', urgent: false,
    text: 'Post-conference: submit post-conference budget to SOFC',
    note: 'Use eCheck Request form at: https://studentactivities.tamu.edu/resources/forms/. Make sure direct deposit is set up early. Organization: IEEE PES-IAS-PELS Joint Student Chapter. Account: 65-945190-00000.',
  },
  {
    id: 't49', month: 'February', area: 'Directors', owner: 'co', urgent: false,
    text: 'Post-conference: publish proceedings in IEEE Xplore',
    note: 'Consider keeping IEEE eXplore open only until the publication due date rather than repeatedly reopening it.',
  },
];
