import React from "react";

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 bg-[#E8E0D0] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: pct + "%", background: color }}
      />
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #FFFFFF 0%, #F9F5EF 100%)",
  boxShadow: "0 4px 24px rgba(28,58,42,0.08), 0 1px 4px rgba(28,58,42,0.04)",
};

const voorbeeldLabel = (
  <p
    style={{
      fontSize: "0.65rem",
      fontWeight: 500,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#8A9E8E",
      marginBottom: "6px",
    }}
  >
    Voorbeeld
  </p>
);

export default function HeroCards() {
  return (
    <div className="hidden lg:block">
      <div className="relative w-full h-[520px]">
        {/* Card 1 — Wat je overhoudt */}
        <div
          className="absolute top-0 left-8 w-64 animate-float-1 rounded-xl border border-[#E8E0D0] p-6"
          style={cardStyle}
        >
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Wat je overhoudt</p>
          <p className="font-display text-4xl font-light text-primary mb-1">€80</p>
          <p className="font-body text-xs mb-4" style={{ color: "#8A9E8E" }}>per maand over</p>
          <div className="space-y-2 mb-4">
            <div>
              <div className="flex justify-between text-xs font-body mb-1" style={{ color: "#8A9E8E" }}>
                <span>Jij</span>
                <span className="text-accent font-medium">3%</span>
              </div>
              <Bar pct={3} color="linear-gradient(90deg, #C4603A, #e07050)" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-body mb-1" style={{ color: "#8A9E8E" }}>
                <span>Gemiddeld</span>
                <span className="font-medium">12%</span>
              </div>
              <Bar pct={12} color="rgba(28,58,42,0.25)" />
            </div>
          </div>
          <span className="inline-block bg-[#FDE8E0] text-accent text-xs font-body font-medium px-3 py-1 rounded-full">
            €380 minder dan gemiddeld
          </span>
        </div>

        {/* Card 2 — Na het bijsturen */}
        <div
          className="absolute top-36 right-0 w-60 animate-float-2 rounded-xl border border-[#E8E0D0] p-6"
          style={cardStyle}
        >
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Na het bijsturen</p>
          <p className="font-display text-4xl font-light text-primary mb-1">€460</p>
          <p className="font-body text-xs mb-4" style={{ color: "#8A9E8E" }}>per maand meer in dit voorbeeld</p>
          <span
            className="inline-block text-xs font-body font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: "#D4EDE0", color: "#1C3A2A" }}
          >
            Zonder meer te verdienen
          </span>
        </div>

        {/* Card 3 — Waar het naartoe gaat */}
        <div
          className="absolute bottom-0 left-4 animate-float-3 rounded-xl border border-[#E8E0D0] p-6"
          style={{ ...cardStyle, width: "272px" }}
        >
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Waar het naartoe gaat</p>
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-xs font-body mb-1">
                <span className="text-text-soft">Abonnementen</span>
                <span className="text-accent font-medium">€340 / 68%</span>
              </div>
              <Bar pct={68} color="linear-gradient(90deg, #C4603A, #e07050)" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-body mb-1">
                <span className="text-text-soft">Boodschappen</span>
                <span className="text-accent font-medium">€180 te veel</span>
              </div>
              <Bar pct={82} color="linear-gradient(90deg, #C4603A, #e07050)" />
            </div>
          </div>
          <span className="inline-block bg-[#FDE8E0] text-accent text-xs font-body font-medium px-3 py-1 rounded-full">
            2 afwijkingen gevonden
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <p
        className="font-body"
        style={{
          fontSize: "0.72rem",
          color: "#8A9E8E",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        Voorbeeld ter illustratie, geen belofte. Wat je overhoudt hangt af van
        jouw eigen situatie.
      </p>
    </div>
  );
}
