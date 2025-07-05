import React from "react";

const timelineData = [
  {
    number: "01",
    title: "Infographics",
    subtitle: "EPS 10 : VECTOR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    number: "02",
    title: "Infographics",
    subtitle: "EPS 10 : VECTOR",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    number: "03",
    title: "Infographics",
    subtitle: "EPS 10 : VECTOR",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    number: "04",
    title: "Infographics",
    subtitle: "EPS 10 : VECTOR",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    number: "05",
    title: "Infographics",
    subtitle: "EPS 10 : VECTOR",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

const green = "#16a34a";

const circleSize = 60;
const circleBorder = 8;
const lineWidth = 4;

const Timeline: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", position: "relative" }}>
      {/* Heading aligned with the vertical line */}
      <div
        style={{
          color: green,
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 40,
          paddingLeft: circleSize / 2, // aligns with vertical line (center of circle)
        }}
      >
        सचेत
      </div>

      {/* Timeline Items with vertical line */}
      <div style={{ position: "relative" }}>
        {/* Vertical green line */}
        <div
          style={{
            position: "absolute",
            left: circleSize / 2 - lineWidth / 2,
            top: 0,
            width: lineWidth,
            height: "100%",
            background: green,
            zIndex: 0,
            borderRadius: 2,
          }}
        />

        {/* Timeline Cards */}
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
              {/* Circle with number */}
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

              {/* Card content */}
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
    </div>
  );
};

export default Timeline;
