import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import { AppContext } from '../database/AppContextProvider';

type Section = {
  title: string;
  content: string[];
};

type PrivacyPolicyScreenProps = {
  appName?: string;
  companyName?: string;
  contactEmail?: string;
  lastUpdated?: string; // e.g., '2026-03-09'
  sectionsOverride?: Section[]; // Optionally override default sections
};

const defaultSections = (appName = 'Our App', companyName = 'Our Company', contactEmail = 'privacy@example.com'): Section[] => [
  {
    title: 'Overview',
    content: [
      `${appName} provides tools for managing buildings and their associated properties (such as address, floors, units, amenities, and operational metadata). This Privacy Policy explains what data we collect, why we collect it, how we use it, and your choices.`,
    ],
  },
  {
    title: 'Data We Collect',
    content: [
      '• Building identifiers (e.g., building ID, name, external references).',
      '• Property attributes (e.g., address, geo-coordinates, floors, units, amenities, occupancy status).',
      '• Operational data (e.g., maintenance tickets, work orders, schedules, equipment logs).',
      '• Usage and telemetry (e.g., feature interactions, app performance metrics, crash logs).',
      '• Optional media (e.g., photos or documents you upload for inspections or maintenance).',
      '• Account data (e.g., name, role, email) for authentication and authorization.',
    ],
  },
  {
    title: 'How We Use Data',
    content: [
      '• To create, view, and update building and property records.',
      '• To enable role-based access and secure collaboration across teams.',
      '• To improve data quality (validation, deduplication, version history).',
      '• To deliver core features such as search, mapping, inspections, and reporting.',
      '• To analyze product usage, improve performance, and troubleshoot issues.',
      '• To comply with legal obligations and enforce acceptable use.',
    ],
  },
  {
    title: 'Data Sources',
    content: [
      '• Data you enter manually or import from files/feeds.',
      '• Integrations you enable (e.g., property management, IoT sensors, BMS/CMMS).',
      '• Public or licensed datasets if you opt in (e.g., parcel or zoning references).',
    ],
  },
  {
    title: 'Sharing and Disclosure',
    content: [
      '• With your organization and users you authorize.',
      '• With service providers under contract (hosting, analytics, customer support).',
      '• If required by law, regulation, or legal process.',
      '• During a business transfer (e.g., merger or acquisition) with appropriate safeguards.',
      'We do not sell personal information.',
    ],
  },
  {
    title: 'Security',
    content: [
      '• We apply technical and organizational measures to protect data in transit and at rest.',
      '• Access controls, encryption, and auditing help prevent unauthorized use.',
      '• No system is 100% secure; we continuously improve our safeguards.',
    ],
  },
  {
    title: 'Retention',
    content: [
      '• We retain building and property data for as long as your account is active or as needed to provide services.',
      '• We may retain certain records to comply with legal, tax, or audit requirements.',
      '• You may request deletion, subject to organizational policy and legal obligations.',
    ],
  },
  {
    title: 'Your Choices and Rights',
    content: [
      '• Access, correct, or delete data (where applicable) via in-app tools or admin request.',
      '• Configure roles and permissions to control who can view or modify building data.',
      '• Manage integrations and data sharing settings in your workspace.',
      '• Depending on your region, you may have additional rights (e.g., access, portability, objection).',
    ],
  },
  {
    title: 'Children’s Privacy',
    content: [
      '• Our services are not directed to children. We do not knowingly collect data from children.',
    ],
  },
  {
    title: 'International Transfers',
    content: [
      '• If data is transferred across borders, we use appropriate safeguards (e.g., contractual clauses) as required by law.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      '• We may update this Privacy Policy from time to time. Material changes will be communicated through the app or email.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      `• For questions or requests, contact ${companyName} at ${contactEmail}.`,
    ],
  },
];

export default function PrivacyPolicy({
  appName = 'Facility Manager',
  companyName = 'Acme Facilities Pvt. Ltd.',
  contactEmail = 'privacy@acme-facilities.com',
  lastUpdated = '2026-03-09',
  sectionsOverride,
}: PrivacyPolicyScreenProps) {
  const deviceData = useContext(AppContext);
  const isDark = deviceData.isDarkMode;
  const styles = isDark ? darkStyles : lightStyles;

  const sections = sectionsOverride ?? defaultSections(appName, companyName, contactEmail);

  const handleMailPress = async () => {
    const url = `mailto:${contactEmail}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.title} accessibilityRole="header">
        Privacy Policy
      </Text>

      <Text style={styles.meta}>Last updated: {lastUpdated}</Text>
      <Text style={styles.meta}>Applies to: {appName}</Text>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            {section.title}
          </Text>
          {section.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Contact
        </Text>
        <Text style={styles.paragraph}>
          Email:{' '}
          <Text style={styles.link} onPress={handleMailPress}>
            {contactEmail}
          </Text>
        </Text>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const base = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 2,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  link: {
    textDecorationLine: 'underline' as const,
    fontWeight: '600' as const,
  },
};

const lightStyles = StyleSheet.create({
  container: { ...base.container, backgroundColor: '#FFFFFF' },
  title: { ...base.title, color: '#111827' },
  meta: { ...base.meta, color: '#4B5563' },
  section: { ...base.section },
  sectionTitle: { ...base.sectionTitle, color: '#111827' },
  paragraph: { ...base.paragraph, color: '#1F2937' },
  link: { ...base.link, color: '#2563EB' },
});

const darkStyles = StyleSheet.create({
  container: { ...base.container, backgroundColor: '#0B1220' },
  title: { ...base.title, color: '#F3F4F6' },
  meta: { ...base.meta, color: '#9CA3AF' },
  section: { ...base.section },
  sectionTitle: { ...base.sectionTitle, color: '#E5E7EB' },
  paragraph: { ...base.paragraph, color: '#D1D5DB' },
  link: { ...base.link, color: '#60A5FA' },
});
``