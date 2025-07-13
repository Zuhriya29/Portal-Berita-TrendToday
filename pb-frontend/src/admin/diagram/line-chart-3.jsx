import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

export const LineChart3 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Panggil API backend Laravel
    fetch("http://localhost:8000/api/statistik-iklan-bulanan")
      .then((response) => response.json())
      .then((result) => {

        const bulanLabel = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
        // Bentuk data sesuai format Nivo Line
        const chartData = [
          {
            id: "Iklan",
            color: "#145B73",
            data: result.map((item) => ({
              x: bulanLabel[item.bulan],
              y: item.total_iklan,
            })),
          },
        ];

        setData(chartData);
      })
      .catch((error) => {
        console.error("Gagal fetch data:", error);
      });
  }, []);

  return (
    <div style={{ height: "30rem", width: "80vw" }}>
      <p style={{ textAlign: "center", fontSize: "1em", fontWeight: "bold", marginTop: "3vh" }}>
        Statistik Layanan Iklan
      </p>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 110, bottom: 150, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat={value => `${value} Iklan`}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Bulan",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Iklan",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        colors={(d) => d.color}
        lineWidth={3}
        pointSize={10}
        pointColor={{ from: "color" }}
        pointBorderWidth={2}
        pointBorderColor={{ theme: "background" }}
        pointLabelYOffset={-12}
        useMesh={true}
        gridYValues={[0, 100, 200, 300, 400]}
        theme={{
          grid: {
            line: {
              stroke: "#e0e0e0",
              strokeWidth: 1,
            },
          },
          axis: {
            domain: {
              line: {
                stroke: "transparent",
              },
            },
          },
        }}
        defs={[
          {
            id: "dashed",
            type: "patternLines",
            background: "inherit",
            color: "hsl(0, 0%, 70%)",
            rotation: -45,
            lineWidth: 2,
            spacing: 5,
          },
        ]}
        tooltip={({ point }) => (
          <div
            style={{
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              padding: "1rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "0.25rem",
                  borderRadius: "0.25rem",
                  alignSelf: "stretch",
                  backgroundColor: "#843dff",
                }}
              ></div>
              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    display: "block",
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    color: "#9d99a8",
                  }}
                >
                  {point.serieId}
                </strong>
                <span
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.875rem",
                    color: "#1e1c24",
                  }}
                >
                  {point.data.xFormatted}:{" "}
                  <span style={{ fontWeight: 600 }}>{point.data.yFormatted}</span>
                </span>
              </div>
            </div>
          </div>
        )}
        fill={[{ match: { id: "gray line" }, id: "dashed" }]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};