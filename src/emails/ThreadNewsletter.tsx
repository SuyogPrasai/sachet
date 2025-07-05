import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Img,
  Column,
  Hr,
  Container,
  Tailwind,
} from '@react-email/components';
  
interface ThreadEmailProps {
  title: string;
  content: string;
  publishedIn: string; // ISO or human‑readable date
  publisherName: string;
  details?: Record<string, string>;
  threadURL: string;
}

export default function ThreadEmail({
  title,
  content,
  publishedIn,
  publisherName,
  details = {},
  threadURL,
}: ThreadEmailProps) {
  const formattedDate = new Date(publishedIn).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /**
   * Render a Definition‑list‑like table from the `details` map.
   * Key cell gets a green‑600 background to match the UI guidelines.
   */
  const DetailsTable = Object.keys(details).length ? (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '24px',
      }}
    >
      <tbody>
        {Object.entries(details).map(([key, value]) => (
          <tr key={key}>
            <td
              style={{
                backgroundColor: '#16a34a', // Tailwind green‑600
                color: '#ffffff',
                fontWeight: 600,
                padding: '8px 12px',
                verticalAlign: 'top',
                textTransform: 'capitalize',
                width: '35%',
              }}
            >
              {key.replace(/_/g, ' ')}
            </td>
            <td
              style={{
                padding: '8px 12px',
                backgroundColor: '#f3f4f6', // gray‑100 for contrast
              }}
            >
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{title}</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>{`${title} – Published on ${formattedDate}`}</Preview>

      <Section
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '24px 20px',
          fontFamily: 'Roboto, Verdana, sans-serif',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        {/* ————— Header ————— */}
        <Row>
          <Heading as="h2" style={{ margin: 0, lineHeight: 1.3 }}>
            {title}
          </Heading>
        </Row>

        <Hr style={{ borderColor: '#e5e7eb', margin: '16px 0' }} />

        {/* ————— Content ————— */}
        <Row>
          <Text
            style={{ fontSize: '16px', lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Row>

        {/* ————— Details map ————— */}
        {DetailsTable}

        {/* ————— Call‑to‑Action ————— */}
        <Row style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button
            href={threadURL}
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            View Thread Online
          </Button>
        </Row>
      </Section>

      {/* Footer */}
      <Section style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '24px' }}>
        <Text>
          You are receiving this email because you subscribed to Parewa thread updates. If you’d like to stop receiving
          these emails, you can unsubscribe at any time.
        </Text>
        <Text>© {new Date().getFullYear()} Parewa Inc. All rights reserved.</Text>
      </Section>
    </Html>
  );
}
