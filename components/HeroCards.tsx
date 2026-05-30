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
        {/* Card 1 — Wat jullie overhouden */}
        <div className="absolute top-0 left-8 w-64 animate-float-1 card-base border border-[#E8E0D0]">
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Wat jullie overhouden</p>
          <p className="font-display text-4xl font-light text-primary mb-1">€80</p>
          <p className="text-text-muted font-body text-xs mb-4">per maand bij jullie thuis</p>
          <div className="space-y-2 mb-4">
            <div>
              <div className="flex justify-between text-xs font-body text-text-muted mb-1">
                <span>Jullie</span>
                <span className="text-accent font-medium">3%</span>
              </div>
              <div className="h-2 bg-[#E8E0D0] rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "3%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-body text-text-muted mb-1">
                <span>Gemiddeld</span>
                <span className="font-medium">12%</span>
              </div>
              <div className="h-2 bg-[#E8E0D0] rounded-full overflow-hidden">
                <div className="h-full bg-primary/30 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
          <span className="inline-block bg-[#FDE8E0] text-accent text-xs font-body font-medium px-3 py-1 rounded-full">
            €380 minder dan gemiddeld
          </span>
        </div>

        {/* Card 2 — Na onze aanpak */}
        <div className="absolute top-36 right-0 w-60 animate-float-2 card-base border border-[#E8E0D0]">
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Na onze aanpak</p>
          <p className="font-display text-4xl font-light text-primary mb-1">€460</p>
          <p className="text-text-muted font-body text-xs mb-4">per maand meer</p>
          <span className="inline-block bg-green-light text-primary text-xs font-body font-medium px-3 py-1 rounded-full">
            Zonder meer te verdienen
          </span>
        </div>

        {/* Card 3 — Waar het naartoe gaat */}
        <div
          className="absolute bottom-0 left-4 animate-float-3 card-base border border-[#E8E0D0]"
          style={{ width: "272px" }}
        >
          {voorbeeldLabel}
          <p className="section-eyebrow mb-3">Waar het naartoe gaat</p>
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-xs font-body mb-1">
                <span className="text-text-soft">Abonnementen</span>
                <span className="text-accent font-medium">€340 / 68%</span>
              </div>
              <div className="h-2 bg-[#E8E0D0] rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-body mb-1">
                <span className="text-text-soft">Boodschappen</span>
                <span className="text-accent font-medium">€180 te veel / 82%</span>
              </div>
              <div className="h-2 bg-[#E8E0D0] rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
          <span className="inline-block bg-[#FDE8E0] text-accent text-xs font-body font-medium px-3 py-1 rounded-full">
            2 afwijkingen gevonden
          </span>
        </div>
      </div>

      {/* Disclaimer onder de kaartjes */}
      <p
        className="font-body"
        style={{
          fontSize: "0.72rem",
          color: "#8A9E8E",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        Voorbeeld ter illustratie — geen belofte. Wat je overhoudt hangt af van
        jouw eigen situatie.
      </p>
    </div>
  );
}
