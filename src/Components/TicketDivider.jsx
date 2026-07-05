export default function TicketDivider({ notchColor }) {
  return (
    <div className="perforation" style={{ '--paper-notch': notchColor }}>
      <span className="notch left" style={{ background: notchColor }} />
      <span className="notch right" style={{ background: notchColor }} />
    </div>
  );
}
