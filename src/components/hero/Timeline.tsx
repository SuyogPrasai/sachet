import React from "react";

const timelineData = [
  {
    number: "01",
    title: "Mission",
    subtitle: "",
    description:
      "At Sachet, our mission is to empower Nepali high school students by connecting them to every opportunity, competition, and event happening across the nation. We are not just a website, we are a family where all of us students can learn, grow and thrive. With the motto: For the students, by the students, we move forward not alone but with the collaboration of thousands of motivated capable students. Sachet - Your Gateway to Every Opportunity.",
  },
  {
    number: "02",
    title: "Vision",
    subtitle: "",
    description:
      "To become Nepal’s most trusted and comprehensive student information hub, inspiring a new generation of learners and leaders. To further expand to develop forums for community discussions among students on all things related to high school.",
  },
  {
    number: "03",
    title: "Values",
    subtitle: "",
    description:
      "We believe in inclusivity, transparency, and community. Every student deserves access to opportunities, reliable information, and a supportive network to grow and thrive.",
  },
  {
    number: "04",
    title: "SDG Goals",
    subtitle: "",
    description:
      `Our platform supports SDG 4 and SDG 10 by making educational opportunities such as competitions, olympiads, and events accessible to all students in Nepal. By centralizing information, we bridge the gap between urban and rural areas, ensuring equal access regardless of background. This promotes inclusive and equitable learning while reducing opportunity inequality. Through these efforts, we empower Nepal’s youth and build meaningful partnerships that contribute to a more educated, just, and future-ready society.`,
  },
  {
    number: "05",
    title: "Community",
    subtitle: "",
    description:
      "A vibrant space where students, educators, and organizers connect, share, and inspire each other—building a stronger, more informed student community across Nepal.",
  },
];

const green = "#16a34a"; // Solid green

const circleSize = 60;
const circleBorder = 8;
const lineWidth = 4;

const Timeline: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", position: "relative" }}>
      {/* Vertical Line */}
      <div
        style={{
          position: "absolute",
          left: circleSize / 2 - lineWidth / 2, // perfectly centered
          top: 0,
          width: lineWidth,
          height: "100%",
          background: green,
          zIndex: 0,
          borderRadius: 2,
        }}
      />
      <div>
        {timelineData.map((item, idx) => (
          <div
            key={item.number}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: idx !== timelineData.length - 1 ? 40 : 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Timeline Circle */}
            <div
              style={{
                width: circleSize,
                height: circleSize,
                borderRadius: "50%",
                background: "#fff",
                border: `${circleBorder}px solid ${green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 22,
                color: green,
                marginRight: 32,
                flexShrink: 0,
                zIndex: 2,
              }}
            >
              {item.number}
            </div>
            {/* Timeline Content */}
            <div
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "18px 28px",
                flex: 1,
              }}
            >
              <div
                style={{
                  color: green,
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 4,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  color: green,
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 8,
                }}
              >
                {item.subtitle}
              </div>
              <div style={{ color: "#444", fontSize: 15 }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
