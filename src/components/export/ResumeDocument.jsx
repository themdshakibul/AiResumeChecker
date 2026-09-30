import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

const C = {
  ink: "#111418",
  inkMuted: "#5C6470",
  accent: "#111418",
  hairline: "#E5E5DF",
  bg: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 52,
    fontSize: 10.25,
    color: C.ink,
    fontFamily: "Helvetica",
    backgroundColor: C.bg,
    lineHeight: 1.5,
  },

  // header
  headerWrap: {
    marginBottom: 22,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
    lineHeight: 1.15,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.inkMuted,
    lineHeight: 1.3,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9.5,
    color: C.inkMuted,
    marginTop: 2,
  },
  contactItem: {
    marginRight: 14,
    marginBottom: 3,
  },
  contactSep: {
    color: C.hairline,
    marginRight: 14,
  },
  link: {
    color: C.accent,
    textDecoration: "none",
  },
  rule: {
    marginTop: 14,
    height: 1,
    backgroundColor: C.hairline,
  },

  // sections
  section: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.accent,
    textTransform: "uppercase",
  },
  sectionHeaderLine: {
    flex: 1,
    height: 0.6,
    backgroundColor: C.hairline,
    marginLeft: 10,
  },

  // summary
  summary: {
    fontSize: 10.25,
    lineHeight: 1.55,
    color: C.ink,
  },
  rawTextLine: {
    fontSize: 10.25,
    lineHeight: 1.5,
    color: C.ink,
    marginBottom: 3,
  },

  // experience
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  expRole: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
  },
  expPeriod: {
    fontSize: 9.5,
    color: C.inkMuted,
    fontFamily: "Helvetica",
  },
  expCompanyLine: {
    fontSize: 10,
    color: C.inkMuted,
    marginBottom: 5,
  },
  expCompany: {
    fontFamily: "Helvetica-Bold",
    color: C.accent,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: C.accent,
    marginRight: 9,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 10.25,
    lineHeight: 1.5,
    color: C.ink,
  },

  // education
  eduItem: {
    marginBottom: 8,
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  eduDegree: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
  },
  eduMeta: {
    fontSize: 9.5,
    color: C.inkMuted,
  },
  eduSchool: {
    fontSize: 10,
    color: C.accent,
    marginTop: 1,
  },

  // projects
  projItem: {
    marginBottom: 10,
  },
  projHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  projName: {
    fontSize: 10.75,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
    marginRight: 8,
  },
  projTech: {
    fontSize: 9.5,
    color: C.accent,
  },
  projDesc: {
    fontSize: 10.25,
    color: C.ink,
    lineHeight: 1.5,
  },
  projLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  projLink: {
    fontSize: 9,
    color: C.accent,
    marginRight: 10,
    textDecoration: "none",
  },

  // skills
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillsText: {
    fontSize: 10.25,
    lineHeight: 1.5,
    color: C.ink,
  },

  // certifications
  certItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 5,
  },
  certName: {
    fontSize: 10.25,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
  },
  certMeta: {
    fontSize: 9.5,
    color: C.inkMuted,
  },

  listText: {
    fontSize: 10.25,
    lineHeight: 1.5,
    color: C.ink,
  },

  // footer
  footer: {
    position: "absolute",
    bottom: 22,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8.25,
    color: C.inkMuted,
    paddingTop: 8,
    borderTopWidth: 0.6,
    borderTopColor: C.hairline,
  },
});

function SectionHeader({ children }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{children}</Text>
      <View style={styles.sectionHeaderLine} />
    </View>
  );
}

function Bullet({ children }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function ContactItem({ children, href }) {
  if (href) {
    return (
      <Link src={href} style={[styles.contactItem, styles.link]}>
        {children}
      </Link>
    );
  }
  return <Text style={styles.contactItem}>{children}</Text>;
}

function shortenUrl(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function hasParsedContent(parsedSections) {
  return Boolean(
    parsedSections.summary ||
    parsedSections.experience?.length ||
    parsedSections.education?.length ||
    parsedSections.skills?.length ||
    parsedSections.projects?.length ||
    parsedSections.certifications?.length,
  );
}

export function ResumeDocument({ user, version, title }) {
  const p = version?.parsedSections || {};
  const basics = p.basics || {};
  const hasContent = hasParsedContent(p);

  const displayName = basics.name?.trim() || user?.name || "Your Name";
  const displayEmail = basics.email?.trim() || user?.email || "";

  return (
    <Document title={title || displayName || "Resume"} author={displayName}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerWrap}>
          <Text style={styles.name}>{displayName}</Text>
          {basics.title ? (
            <Text style={styles.title}>{basics.title}</Text>
          ) : null}

          <View style={styles.contactRow}>
            {basics.location ? (
              <ContactItem>{basics.location}</ContactItem>
            ) : null}
            {displayEmail ? (
              <ContactItem href={`mailto:${displayEmail}`}>
                {displayEmail}
              </ContactItem>
            ) : null}
            {basics.phone ? <ContactItem>{basics.phone}</ContactItem> : null}
            {(basics.links || []).map((l, i) => (
              <ContactItem key={i} href={l.url}>
                {l.label || shortenUrl(l.url || "")}
              </ContactItem>
            ))}
          </View>

          <View style={styles.rule} />
        </View>

        {!hasContent && version?.rawText?.trim() ? (
          <View style={styles.section}>
            <SectionHeader>Resume</SectionHeader>
            {version.rawText
              .trim()
              .split(/\r?\n/)
              .map((line, index) => (
                <Text key={index} style={styles.rawTextLine}>
                  {line || " "}
                </Text>
              ))}
          </View>
        ) : null}

        {/* Summary */}
        {p.summary ? (
          <View style={styles.section}>
            <SectionHeader>Summary</SectionHeader>
            <Text style={styles.summary}>{p.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {p.experience?.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader>Experience</SectionHeader>
            {p.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{exp.role || "Role"}</Text>
                  {exp.period ? (
                    <Text style={styles.expPeriod}>{exp.period}</Text>
                  ) : null}
                </View>
                {(exp.company || exp.location) && (
                  <Text style={styles.expCompanyLine}>
                    {exp.company ? (
                      <Text style={styles.expCompany}>{exp.company}</Text>
                    ) : null}
                    {exp.company && exp.location ? "  ·  " : ""}
                    {exp.location || ""}
                  </Text>
                )}
                {(exp.bullets || []).map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {p.projects?.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader>Projects</SectionHeader>
            {p.projects.map((proj, i) => (
              <View key={i} style={styles.projItem}>
                <View style={styles.projHeader}>
                  <Text style={styles.projName}>{proj.name}</Text>
                  {proj.tech?.length ? (
                    <Text style={styles.projTech}>{proj.tech.join(" · ")}</Text>
                  ) : null}
                </View>
                {proj.description ? (
                  <Text style={styles.projDesc}>{proj.description}</Text>
                ) : null}
                {proj.links?.length ? (
                  <View style={styles.projLinks}>
                    {proj.links.map((l, j) => (
                      <Link key={j} src={l.url} style={styles.projLink}>
                        {l.label || shortenUrl(l.url || "")}
                      </Link>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {p.education?.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader>Education</SectionHeader>
            {p.education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <View style={styles.eduRow}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  {edu.period ? (
                    <Text style={styles.eduMeta}>{edu.period}</Text>
                  ) : null}
                </View>
                <Text style={styles.eduSchool}>
                  {edu.school}
                  {edu.location ? ` · ${edu.location}` : ""}
                </Text>
                {edu.details ? (
                  <Text style={[styles.eduMeta, { marginTop: 2 }]}>
                    {edu.details}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {p.skills?.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader>Skills</SectionHeader>
            <Text style={styles.skillsText}>{p.skills.join(", ")}</Text>
          </View>
        ) : null}

        {/* Certifications */}
        {p.certifications?.length > 0 ? (
          <View style={styles.section}>
            <SectionHeader>Certifications</SectionHeader>
            {p.certifications.map((c, i) => (
              <View key={i} style={styles.certItem} wrap={false}>
                <Text>
                  <Text style={styles.certName}>{c.name}</Text>
                  {c.issuer ? (
                    <Text style={styles.certMeta}> · {c.issuer}</Text>
                  ) : null}
                </Text>
                {c.year ? <Text style={styles.certMeta}>{c.year}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {p.languages?.length > 0 && (
          <View style={styles.section}>
            <SectionHeader>Languages</SectionHeader>
            <Text style={styles.listText}>{p.languages.join(", ")}</Text>
          </View>
        )}

        {p.interests?.length > 0 && (
          <View style={styles.section}>
            <SectionHeader>Interests</SectionHeader>
            <Text style={styles.listText}>{p.interests.join(", ")}</Text>
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text>{displayName}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
