function Lens() {
  return <span className="lens" />;
}

function Screen({ finish }) {
  const [top, mid, bottom] = finish.wallpaper;
  const color = finish.darkText ? "#1d1d1f" : "#fff";
  return (
    <div
      className="phone-face"
      style={{ background: `linear-gradient(165deg, ${top}, ${mid} 58%, ${bottom})`, color }}
    >
      <span className="island" />
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <p className="screen-time">9:41</p>
      <span className="home-bar" />
    </div>
  );
}

function Back({ finish, variant }) {
  const pro = variant === "pro" || variant === "promax";
  return (
    <div className="phone-face" style={{ background: finish.back }}>
      {variant === "duo" ? <span className="hinge" /> : null}
      {pro ? (
        <div className="plateau">
          <div className="lens-row">
            <Lens />
            <Lens />
            <Lens />
          </div>
          <span className="flash" />
        </div>
      ) : null}
      {variant === "air" ? (
        <div className="plateau compact">
          <div className="lens-row solo">
            <Lens />
          </div>
          <span className="flash" />
        </div>
      ) : null}
      {variant === "duo" ? (
        <div className="plateau duo-cam">
          <div className="lens-row pair">
            <Lens />
            <Lens />
          </div>
          <span className="flash" />
        </div>
      ) : null}
      {variant === "dual" ? (
        <div className="bump">
          <span className="lens a" />
          <span className="lens b" />
          <span className="flash" />
        </div>
      ) : null}
      {variant === "single" ? (
        <div className="bump single">
          <span className="lens a" />
          <span className="flash" />
        </div>
      ) : null}
      <span className="mag-ring" />
    </div>
  );
}

export default function PhoneVisual({
  finish,
  variant = "pro",
  view = "front",
  className = "",
  label,
}) {
  if (!finish) return null;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <div className={`phone-scene ${className || "w-[220px]"}`} data-variant={variant} data-view={view} {...a11y}>
      <div
        className="device"
        style={{
          background: `linear-gradient(150deg, ${finish.highlight} 0%, ${finish.frame} 42%, ${finish.shadow} 100%)`,
        }}
      >
        {view === "back" ? <Back finish={finish} variant={variant} /> : <Screen finish={finish} />}
        <span className="sheen" />
        <span className="side-btn silent" style={{ background: finish.shadow }} />
        <span className="side-btn volume" style={{ background: finish.shadow }} />
        <span className="side-btn power" style={{ background: finish.shadow }} />
      </div>
    </div>
  );
}
