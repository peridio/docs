import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import DataTable from '../DataTable'
import styles from './styles.module.css'

/* The three ways a CRA requirement gets satisfied. Kept as a map so the pill
   label and the legend can never drift apart. */
const STATUS = {
  os: { className: styles.os, label: 'OS default' },
  cfg: { className: styles.cfg, label: 'Configurable' },
  you: { className: styles.you, label: 'You complete' },
  /* Annex VII only: the item is jointly sourced rather than configured. */
  shared: { className: styles.shared, label: 'Avocado + you' },
}

function Pill({ status }) {
  const { className, label } = STATUS[status]
  return <span className={clsx(styles.pill, className)}>{label}</span>
}

const LEGEND_TEXT = {
  os: 'OS default — handled by Avocado OS',
  cfg: 'Configurable — supported in the OS, you set the policy',
  you: 'You complete — manufacturer obligation',
  shared: 'Avocado + you — our artifact, folded into your document',
}

/* Each table renders the subset of statuses its own rows use, so a reader never
   meets a pill the legend above it does not explain. */
export function Legend({ statuses = ['os', 'cfg', 'you'] }) {
  return (
    <div className={styles.legend} role="note" aria-label="Status legend">
      {statuses.map((key) => (
        <span key={key} className={clsx(styles.pill, STATUS[key].className)}>
          {LEGEND_TEXT[key]}
        </span>
      ))}
    </div>
  )
}

/* Requirement label with the regulation's own wording quoted beneath it, so a
   reader can check the mapping against the text without leaving the page. */
function requirement(row) {
  return (
    <>
      {row.req}
      {row.quote && <span className={styles.verbatim}>&ldquo;{row.quote}&rdquo;</span>}
    </>
  )
}

/* A cell is either a single statement or an Avocado/you split. */
function where(row) {
  if (!row.provides && !row.youAdd) return row.where
  return (
    <>
      {row.provides && (
        <span className={styles.split}>
          <strong>Avocado provides:</strong> {row.provides}
        </span>
      )}
      {row.youAdd && (
        <span className={styles.split}>
          <strong>You add:</strong> {row.youAdd}
        </span>
      )}
    </>
  )
}

const columns = [
  { key: 'cite', header: 'Cite', width: '13%', align: 'left' },
  { key: 'req', header: 'Requirement', width: '30%', align: 'left', render: requirement },
  {
    key: 'status',
    header: 'Status',
    width: '13%',
    align: 'left',
    render: (row) => <Pill status={row.status} />,
  },
  { key: 'where', header: 'Where it lives', align: 'left', render: where },
]

const partI = [
  {
    rows: [
      {
        cite: 'Annex I (1)',
        req: 'Appropriate level of cybersecurity based on the risks',
        quote:
          'designed, developed and produced in such a way that they ensure an appropriate level of cybersecurity based on the risks',
        status: 'you',
        provides:
          'Architectural risk reduction — immutable rootfs, verified boot, signed updates — plus this mapping covering the OS portion.',
        youAdd:
          'Your product-specific risk assessment under Article 13(2), incorporating the OS evidence above.',
      },
      {
        cite: 'Annex I (2)',
        req: 'No known exploitable vulnerabilities',
        quote: 'made available on the market without known exploitable vulnerabilities',
        status: 'you',
        provides:
          'The build emits an SPDX inventory of every component in your image, which is what any CVE process has to run against. Continuous CVE monitoring and advisory reporting across those components is a commercial feature; the open-source build does not gate a release on a CVE scan.',
        youAdd:
          'A CVE process covering your application code and your own dependencies, and a decision on whether to scan the SBOM yourself or subscribe to monitoring.',
      },
    ],
  },
  {
    category: 'Point (3) — risk-dependent sub-items applied per the Article 13(2) risk assessment',
    rows: [
      {
        cite: 'Annex I (3)(a)',
        req: 'Secure by default configuration',
        quote:
          'made available on the market with a secure by default configuration… including the possibility to reset the product to its original state',
        status: 'os',
        where: (
          <>
            The base image ships no listening network services — SSH, fleet management, and remote
            access are all opt-in extensions. Root login is locked, the rootfs is read-only EROFS,
            and factory reset is an A/B re-provision. See{' '}
            <Link to="/avocado-os/security/filesystem-integrity">Filesystem Integrity</Link>.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(b)',
        req: 'Security updates, including automatic where applicable',
        quote:
          'ensure that vulnerabilities can be addressed through security updates, including, where applicable, through automatic security updates… with a clear and easy-to-use opt-out mechanism',
        status: 'cfg',
        where: (
          <>
            TUF-verified updates (Ed25519), A/B partitions with automatic rollback, PKCS#11
            hardware-backed signing, and delta compression. Fleet delivery runs through{' '}
            <Link to="/avocado-connect/overview">Avocado Connect</Link>, which you configure and
            from which you activate each deployment — so whether updates are automatic, and what
            opting out means for your users, is your policy rather than a default. See{' '}
            <Link to="/avocado-os/security/update-architecture">Atomic Update Architecture</Link>.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(c)',
        req: 'Protection from unauthorised access',
        quote:
          'protection from unauthorised access by appropriate control mechanisms, including… authentication, identity or access management systems, and report on possible unauthorised access',
        status: 'cfg',
        where: (
          <>
            Key-only SSH, account lockout, and password policy are all configurable in your build.
            The SSH server itself is an extension you opt into, so a runtime that needs no remote
            login ships without one.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(d)',
        req: 'Confidentiality of stored, transmitted, and processed data',
        quote:
          'protect the confidentiality… such as by encrypting relevant data at rest or in transit by state-of-the-art mechanisms',
        status: 'cfg',
        where: (
          <>
            LUKS2 encryption for the writable <code>/var</code> partition. Where the target carries
            a TPM2 or equivalent security module the key is sealed to it and enrolled on first boot;
            where it does not, software key derivation is the fallback. A per-device recovery
            keyslot derived from the SoC UID is enrolled alongside it. Confirm which path your
            target takes. See{' '}
            <Link to="/avocado-os/security/encryption">Hardware-Backed Encryption</Link>.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(e)',
        req: 'Integrity of data, commands, programs, and configuration',
        quote:
          'protect the integrity… against any manipulation or modification not authorised by the user, and report on corruptions',
        status: 'os',
        where: (
          <>
            A read-only EROFS rootfs nothing at runtime can modify, SHA-256 verification of every
            extension before it is merged, and BTRFS checksums on <code>/var</code>. Corruption
            surfaces in the systemd journal. A signed boot chain, with vendor key fuses burned at
            provisioning, is available per target rather than everywhere — confirm it for yours. See{' '}
            <Link to="/avocado-os/security/filesystem-integrity">Filesystem Integrity</Link> and{' '}
            <Link to="/avocado-os/security/secure-boot">Secure Boot</Link>.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(f)',
        req: 'Data minimisation',
        quote:
          'process only data… that are adequate, relevant and limited to what is necessary in relation to the intended purpose',
        status: 'os',
        where:
          'Minimal base image, no telemetry by default, per-extension isolation. Fleet management is opt-in.',
      },
      {
        cite: 'Annex I (3)(g)',
        req: 'Availability of essential and basic functions',
        quote:
          'protect the availability of essential and basic functions, also after an incident, including through resilience and mitigation measures against denial-of-service attacks',
        status: 'cfg',
        where: (
          <>
            A/B rollback, cgroup v2, and a power-loss-safe filesystem stack are defaults. Per-
            service resource limits, kernel network tuning, and firewall policy are all configurable
            in your build.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(h)',
        req: 'Minimise negative impact on other devices or networks',
        quote:
          'minimise the negative impact by the products themselves or connected devices on the availability of services provided by other devices or networks',
        status: 'cfg',
        where: (
          <>
            The base image runs nothing that can be recruited as an amplification vector, and
            forwards no traffic it was not configured to forward. Kernel network hardening and
            egress firewall policy are configurable in your build.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(i)',
        req: 'Limit attack surfaces, including external interfaces',
        quote:
          'designed, developed and produced to limit attack surfaces, including external interfaces',
        status: 'os',
        where: (
          <>
            You start from an image with nothing in it and add only what you declare. There is no
            distribution default set to audit away: every service, interface, and tool on the device
            is an extension you named in <code>avocado.yaml</code>.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(j)',
        req: 'Exploitation mitigation',
        quote:
          'reduce the impact of an incident using appropriate exploitation mitigation mechanisms and techniques',
        status: 'cfg',
        where: (
          <>
            This is about containing an exploit, not tracking CVEs — Annex I (2) covers that. Every
            package in the distribution is compiled with the toolchain hardening flags on (stack
            protector, FORTIFY_SOURCE, PIE, RELRO), the rootfs an exploit lands in is read-only, and
            the control plane is written in Rust. Per-service systemd sandboxing is configurable in
            your build.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(k)',
        req: 'Security-related logging and monitoring',
        quote:
          'provide security-related information by recording and monitoring relevant internal activity, including the access to or modification of data, services or functions, with an opt-out mechanism for the user',
        status: 'cfg',
        where: (
          <>
            The systemd journal is there out of the box, capturing boot, service, authentication,
            and integrity events; persistence, sealing, and size limits are configurable. The Linux
            audit daemon is available as a package when you need a rule-driven audit trail on top.
          </>
        ),
      },
      {
        cite: 'Annex I (3)(l)',
        req: 'Secure data deletion and secure data transfer',
        quote:
          'provide the possibility for users to securely and easily remove on a permanent basis all data and settings and, where such data can be transferred to other products or systems, ensure that this is done in a secure manner',
        status: 'os',
        where:
          'Factory reset via A/B re-provisioning, ephemeral overlay layers, LUKS cryptographic erase for encrypted partitions.',
      },
    ],
  },
]

const partII = [
  {
    rows: [
      {
        cite: 'Part II (1)',
        req: 'Identify and document vulnerabilities and components, including an SBOM',
        quote:
          'identify and document vulnerabilities and components… including by drawing up a software bill of materials in a commonly used and machine-readable format covering at the very least the top-level dependencies',
        status: 'you',
        provides:
          'SPDX generation is on by default in the distribution build, and `avocado sbom` emits an SPDX 3.0.1 document for exactly what your project installed.',
        youAdd: "Your application's SBOM, merged with ours into the combined product SBOM.",
      },
      {
        cite: 'Part II (2)',
        req: 'Address and remediate without delay; separate security from functionality updates where feasible',
        quote:
          'address and remediate vulnerabilities without delay, including by providing security updates; where technically feasible, new security updates shall be provided separately from functionality updates',
        status: 'you',
        provides:
          'Security updates for the OS components, and extension-level granularity so a security update can ship without carrying a functional change alongside it.',
        youAdd:
          'The remediation process for your product — triage, prioritisation, and shipping the fix without delay. A distribution mechanism is not the same as a process that uses it.',
      },
      {
        cite: 'Part II (3)',
        req: 'Apply effective and regular tests and reviews',
        quote:
          'apply effective and regular tests and reviews of the security of the product with digital elements',
        status: 'you',
        provides: 'Documented test suites that run in CI, plus hardware-backed testing automation.',
        youAdd:
          "Your application's security testing — penetration testing, fuzzing, dependency audit — on the cadence you commit to.",
      },
      {
        cite: 'Part II (4)',
        req: 'Publicly disclose information about fixed vulnerabilities',
        quote:
          'publicly disclose information about fixed vulnerabilities, including a description of the vulnerabilities, information allowing users to identify the product… affected, the impacts… their severity and information helping users to remediate',
        status: 'you',
        provides:
          'Security fixes are called out in the release changelog, naming the upstream advisory each one resolves. Structured advisories — severity, affected versions, remediation guidance — come with the commercial CVE monitoring feature.',
        youAdd:
          "Your product's advisories for application-level vulnerabilities; reference ours for OS components.",
      },
      {
        cite: 'Part II (5)',
        req: 'Coordinated vulnerability disclosure policy',
        quote: 'put in place and enforce a policy on coordinated vulnerability disclosure',
        status: 'you',
        youAdd: 'A coordinated vulnerability disclosure policy for your product.',
      },
      {
        cite: 'Part II (6)',
        req: 'Facilitate reporting, including a contact address for vulnerability reports',
        quote:
          'take measures to facilitate the sharing of information about potential vulnerabilities… including by providing a contact address for the reporting of the vulnerabilities discovered in the product',
        status: 'you',
        youAdd: (
          <>
            A <code>SECURITY.md</code>, a <code>security.txt</code> at <code>/.well-known/</code>,
            and a monitored contact address for vulnerability reports.
          </>
        ),
      },
      {
        cite: 'Part II (7)',
        req: 'Securely distribute updates',
        quote:
          'provide for mechanisms to securely distribute updates… to ensure that exploitable vulnerabilities are fixed or mitigated in a timely manner',
        status: 'os',
        where: (
          <>
            TUF metadata chain (timestamp → snapshot → targets) verified by <code>avocadoctl</code>,
            Ed25519 signatures, PKCS#11 hardware signing, and A/B rollback on verification failure.
          </>
        ),
      },
      {
        cite: 'Part II (8)',
        req: 'Free, timely updates with advisory messages',
        quote:
          'where security patches or updates are available… they are disseminated without delay and free of charge, accompanied by advisory messages providing users with the relevant information',
        status: 'cfg',
        where:
          'The OS gives you a signed distribution channel, and the security content of each release is documented in the changelog. Whether your updates reach your users without delay and free of charge depends on the deployments you activate and the terms you set — that half is yours.',
      },
    ],
  },
]

const annexVIIColumns = [
  { key: 'item', header: 'Annex VII item', width: '32%', align: 'left' },
  {
    key: 'who',
    header: 'Owner',
    width: '17%',
    align: 'left',
    render: (row) => <Pill status={row.status} />,
  },
  { key: 'notes', header: 'How Avocado OS feeds into it', align: 'left' },
]

const annexVII = [
  {
    rows: [
      {
        item: 'General description of the product',
        status: 'you',
        notes: 'Your hardware, application, intended use, and deployment environment.',
      },
      {
        item: 'Design, development, and production information',
        status: 'shared',
        notes: 'Cite the Avocado OS architecture; add your product-specific design.',
      },
      {
        item: 'Cybersecurity risk assessment (Article 13(2))',
        status: 'you',
        notes:
          'Yours to author. It determines which Annex I (3)(a)–(l) items apply to your product.',
      },
      {
        item: 'List of essential cybersecurity requirements applied (Annex I)',
        status: 'shared',
        notes: 'Use this page as supporting evidence for the OS portion.',
      },
      {
        item: 'Harmonised standards or certification schemes applied',
        status: 'you',
        notes:
          'Cite the standards your conformity rests on. As EU harmonised CRA standards publish, they reference these requirements.',
      },
      {
        item: 'Conformity assessment results',
        status: 'you',
        notes: 'Module A internal control report, or higher, produced as part of your assessment.',
      },
      {
        item: 'EU Declaration of Conformity (Annex V)',
        status: 'you',
        notes:
          'Your signed declaration identifying the product, the applicable requirements, and the assessment route.',
      },
      {
        item: 'Vulnerability handling process description (Annex I Part II)',
        status: 'you',
        notes:
          'Your CVD policy, security contact, and response process. Manufacturer-owned end to end.',
      },
      {
        item: 'Software Bill of Materials',
        status: 'shared',
        notes: 'The SPDX SBOM for Avocado OS merged with your application SBOM.',
      },
      {
        item: 'Information on the defined support period (Article 13(8))',
        status: 'you',
        notes:
          'Your support period. Recital 61 indicates an expectation of at least five years unless the expected product lifetime is shorter; align it with the Avocado OS release support commitment.',
      },
    ],
  },
]

/* ---- Regulatory timeline ----
   Dates are compared against the build date, so milestones that have already
   passed render struck through and flagged "in force" rather than telling a
   reader to prepare for something that is already enforceable. The site
   rebuilds on every merge, so this stays current without manual edits. */

const milestones = [
  {
    date: '2024-12-10',
    when: '10 December 2024',
    what: 'Entry into force',
    detail:
      'Twenty days after publication in the Official Journal. The clock starts on the phased application below.',
  },
  {
    date: '2026-06-11',
    when: '11 June 2026',
    what: 'Notified bodies framework (Chapter IV)',
    detail:
      'Notified body designation and operation apply. Relevant only if your conformity route requires a notified body.',
  },
  {
    date: '2026-09-11',
    when: '11 September 2026',
    what: 'Article 14 reporting',
    detail:
      'Actively exploited vulnerabilities and severe incidents must be notified on the cadence below. The capability to do that — triage, on-call, and reporting templates — needs to be in place from this date.',
  },
  {
    date: '2027-12-11',
    when: '11 December 2027',
    what: 'Full application',
    detail:
      'All Annex I requirements enforceable. Conformity assessment complete and CE marking affixed before the product is placed on the EU market.',
  },
]

const timelineColumns = [
  {
    key: 'when',
    header: 'Date',
    width: '22%',
    align: 'left',
    render: (row) => <span className={clsx(styles.when, row.past && styles.past)}>{row.when}</span>,
  },
  {
    key: 'what',
    header: 'Milestone',
    align: 'left',
    render: (row) => (
      <>
        <strong>{row.what}</strong>
        <span className={clsx(styles.phase, row.past ? styles.inForce : styles.upcoming)}>
          {row.past ? 'In force' : 'Upcoming'}
        </span>
        <span className={styles.split}>{row.detail}</span>
      </>
    ),
  },
]

export function CraTimeline() {
  /* Dated against the build, not the wall clock. siteConfig.customFields.buildDate is a
     UTC YYYY-MM-DD string serialized once at build time, so the static HTML, the hydrated
     page, and a no-JavaScript visitor all agree on which milestones are in force. Reading
     `new Date()` here instead would let the same page disagree with itself across a
     midnight boundary. Both sides are UTC calendar days, compared as strings. */
  const { siteConfig } = useDocusaurusContext()
  const buildDate = siteConfig.customFields.buildDate
  const data = [{ rows: milestones.map((m) => ({ ...m, past: m.date <= buildDate })) }]
  return (
    <DataTable
      columns={timelineColumns}
      data={data}
      ariaLabel="Cyber Resilience Act regulatory timeline"
      showCategoryHeaders={false}
    />
  )
}

export function AnnexIPartI() {
  return (
    <DataTable columns={columns} data={partI} ariaLabel="CRA Annex I Part I requirement mapping" />
  )
}

export function AnnexIPartII() {
  return (
    <DataTable
      columns={columns}
      data={partII}
      ariaLabel="CRA Annex I Part II vulnerability handling mapping"
      showCategoryHeaders={false}
    />
  )
}

export function AnnexVII() {
  return (
    <DataTable
      columns={annexVIIColumns}
      data={annexVII}
      ariaLabel="CRA Annex VII technical documentation checklist"
      showCategoryHeaders={false}
    />
  )
}
