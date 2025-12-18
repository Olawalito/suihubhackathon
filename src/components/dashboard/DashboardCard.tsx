import React from "react";
import active from "../../assets/info-icon1.png"
import give from "../../assets/info-icon4.png"
import time from "../../assets/time.png"

interface DashboardCardProps {
  title?: string;
  count?: number | string;
  unit?: string;
  subtitle?: string;
  className?: string;
  iconType?: "active" | "time" |"give"; // for future extensibility
}

/**
 * DashboardCard
 * - standalone, framework-agnostic React + TypeScript component
 * - purely inline styles so it can be dropped into a new file without extra CSS
 *
 * Usage:
 * <DashboardCard />
 * or
 * <DashboardCard title="Active Circles" count={4} unit="Circles" subtitle="Next contribution in 20 hours" />
 */

const DashboardCard: React.FC<DashboardCardProps> = ({
  title = "Active Circles",
  count = 4,
  unit = "Circles",
  subtitle = "Next contribution in 20 hours",
  className,
  iconType = "active",
}) => {
  return (
    <div
      className={className}
      style={{
        background: "#0f0f10",
        color: "white",
        borderRadius: 18,
        padding: 24,
        width: 760,

        boxSizing: "border-box",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top row: icon + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          aria-hidden={true}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,140,0,0.15), transparent 20%), linear-gradient(180deg,#7a2b00,#3b1200)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            position: "relative",
          }}
        >
        
         
          <img
            src={
              iconType === "active" ? active : iconType === "time" ? time : give
            }
            alt={`${iconType} icon`}
            aria-hidden={false}
            style={{
              width: 22,
              height: 22,
              objectFit: "contain",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.95 }}>
          {title}
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {count}
          </div>
          <div style={{ fontSize: 22, opacity: 0.9 }}>{unit}</div>
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            color: "rgba(255,255,255,0.65)",
            fontStyle: "italic",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
